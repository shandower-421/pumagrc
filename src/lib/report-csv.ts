import { saveAs } from 'file-saver'
import {
  type Assessment, type FrameworkMeta, type SubcategoryAssessment,
  MaturityLevel, Priority, RiskTreatment,
  MATURITY_LABELS, PRIORITY_LABELS, MATURITY_NUMERIC,
  RISK_TREATMENT_LABELS,
} from '../types/assessment'

function csvEscape(value: string): string {
  return '"' + value.replace(/"/g, '""') + '"'
}

function getRiskLevel(score: number): string {
  if (score === 0) return 'Not Assessed'
  if (score >= 20) return 'Critical'
  if (score >= 15) return 'High'
  if (score >= 8) return 'Medium'
  return 'Low'
}

const CSV_HEADERS = [
  'Control ID', 'Description', 'Function ID', 'Function Name', 'Category ID', 'Category Name',
  'Maturity Level', 'Maturity Score', 'Priority',
  'Has Plan', 'Plan Text', 'Proof', 'Compensating Control', 'Activity Log Count',
  'Likelihood', 'Impact', 'Risk Score', 'Risk Level', 'Risk Owner', 'Treatment',
]

export function generateCsvReport(assessment: Assessment, framework: FrameworkMeta) {
  const rows: string[][] = [CSV_HEADERS]

  for (const fn of framework.data) {
    for (const cat of fn.categories) {
      for (const sub of cat.subcategories) {
        const data = assessment.subcategories[sub.id]
        const maturity = data?.maturity || MaturityLevel.NotAssessed
        const priority = data?.priority || Priority.NotSet
        const maturityScore = MATURITY_NUMERIC[maturity]
        const likelihood = data?.riskLikelihood || 0
        const impact = data?.riskImpact || 0
        const riskScore = likelihood * impact

        rows.push([
          sub.id,
          sub.description,
          fn.id,
          fn.name,
          cat.id,
          cat.name,
          MATURITY_LABELS[maturity],
          maturityScore.toString(),
          PRIORITY_LABELS[priority],
          (data?.plan || '').trim() ? 'Yes' : 'No',
          data?.plan || '',
          data?.proof || '',
          data?.compensating ? 'Yes' : 'No',
          (data?.activityLog?.length || 0).toString(),
          likelihood > 0 ? likelihood.toString() : '',
          impact > 0 ? impact.toString() : '',
          riskScore > 0 ? riskScore.toString() : '',
          riskScore > 0 ? getRiskLevel(riskScore) : '',
          data?.riskOwner || '',
          data?.riskTreatment && data.riskTreatment !== RiskTreatment.NotSet
            ? RISK_TREATMENT_LABELS[data.riskTreatment] : '',
        ])
      }
    }
  }

  const csvContent = '\uFEFF' + rows.map(row => row.map(csvEscape).join(',')).join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, `${framework.id}-assessment-${new Date().toISOString().slice(0, 10)}.csv`)
}

// Reverse lookup maps for import
const MATURITY_BY_LABEL = Object.fromEntries(
  Object.entries(MATURITY_LABELS).map(([k, v]) => [v.toLowerCase(), k as MaturityLevel])
)
const PRIORITY_BY_LABEL = Object.fromEntries(
  Object.entries(PRIORITY_LABELS).map(([k, v]) => [v.toLowerCase(), k as Priority])
)
const TREATMENT_BY_LABEL = Object.fromEntries(
  Object.entries(RISK_TREATMENT_LABELS).map(([k, v]) => [v.toLowerCase(), k as RiskTreatment])
)

function parseCSV(text: string): string[][] {
  const rows: string[][] = []
  let current = ''
  let inQuotes = false
  let row: string[] = []

  // Strip BOM
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1)

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        current += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ',') {
        row.push(current)
        current = ''
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && i + 1 < text.length && text[i + 1] === '\n') i++
        row.push(current)
        current = ''
        if (row.length > 1 || row[0] !== '') rows.push(row)
        row = []
      } else {
        current += ch
      }
    }
  }
  // Final row
  row.push(current)
  if (row.length > 1 || row[0] !== '') rows.push(row)

  return rows
}

export async function importCsvAssessment(
  file: File,
  framework: FrameworkMeta,
  currentAssessment: Assessment,
): Promise<Assessment> {
  const text = await file.text()
  const rows = parseCSV(text)

  if (rows.length < 2) throw new Error('CSV file is empty or has no data rows.')

  const headers = rows[0].map(h => h.trim().toLowerCase())
  const colIndex = (name: string) => headers.indexOf(name.toLowerCase())

  const iControlId = colIndex('control id')
  if (iControlId === -1) throw new Error('CSV must have a "Control ID" column.')

  const iMaturity = colIndex('maturity level')
  const iPriority = colIndex('priority')
  const iPlan = colIndex('plan text')
  const iProof = colIndex('proof')
  const iCompensating = colIndex('compensating control')
  const iLikelihood = colIndex('likelihood')
  const iImpact = colIndex('impact')
  const iOwner = colIndex('risk owner')
  const iTreatment = colIndex('treatment')

  // Build set of valid control IDs for this framework
  const validIds = new Set<string>()
  for (const fn of framework.data) {
    for (const cat of fn.categories) {
      for (const sub of cat.subcategories) {
        validIds.add(sub.id)
      }
    }
  }

  const updated = {
    ...currentAssessment,
    lastSaved: new Date().toISOString(),
    subcategories: { ...currentAssessment.subcategories },
  }

  let matched = 0
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    const controlId = row[iControlId]?.trim()
    if (!controlId || !validIds.has(controlId)) continue

    matched++
    const existing = updated.subcategories[controlId] || {
      maturity: MaturityLevel.NotAssessed,
      priority: Priority.NotSet,
      compensating: false,
      proof: '',
      plan: '',
      notes: '',
      activityLog: [],
    }

    const sub: SubcategoryAssessment = { ...existing }

    if (iMaturity !== -1 && row[iMaturity]?.trim()) {
      const val = MATURITY_BY_LABEL[row[iMaturity].trim().toLowerCase()]
      if (val) sub.maturity = val
    }
    if (iPriority !== -1 && row[iPriority]?.trim()) {
      const val = PRIORITY_BY_LABEL[row[iPriority].trim().toLowerCase()]
      if (val) sub.priority = val
    }
    if (iPlan !== -1 && row[iPlan] !== undefined) sub.plan = row[iPlan]
    if (iProof !== -1 && row[iProof] !== undefined) sub.proof = row[iProof]
    if (iCompensating !== -1 && row[iCompensating]?.trim()) {
      sub.compensating = row[iCompensating].trim().toLowerCase() === 'yes'
    }
    if (iLikelihood !== -1 && row[iLikelihood]?.trim()) {
      const n = parseInt(row[iLikelihood].trim(), 10)
      if (n >= 1 && n <= 5) sub.riskLikelihood = n
    }
    if (iImpact !== -1 && row[iImpact]?.trim()) {
      const n = parseInt(row[iImpact].trim(), 10)
      if (n >= 1 && n <= 5) sub.riskImpact = n
    }
    if (iOwner !== -1 && row[iOwner] !== undefined) sub.riskOwner = row[iOwner]
    if (iTreatment !== -1 && row[iTreatment]?.trim()) {
      const val = TREATMENT_BY_LABEL[row[iTreatment].trim().toLowerCase()]
      if (val) sub.riskTreatment = val
    }

    updated.subcategories[controlId] = sub
  }

  if (matched === 0) {
    throw new Error(`No matching control IDs found for ${framework.name}. Make sure the CSV was exported from this framework.`)
  }

  return updated
}
