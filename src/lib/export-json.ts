import { FRAMEWORKS } from '../data/frameworks'
import type { Assessment } from '../types/assessment'

interface FrameworkExportData {
  assessment: Assessment
  snapshots: any[]
}

interface ExportDataV2 {
  version: '2.0'
  exportDate: string
  activeFramework: string
  enabledFrameworks: string[]
  frameworks: Record<string, FrameworkExportData>
}

function hasAssessmentData(assessment: Assessment): boolean {
  return Object.keys(assessment.subcategories).length > 0
}

export function exportAllData() {
  const activeFramework = localStorage.getItem('active-framework') || FRAMEWORKS[0].id
  const enabledRaw = localStorage.getItem('enabled-frameworks')
  const enabledFrameworks: string[] = enabledRaw ? JSON.parse(enabledRaw) : ['nist-csf-2', 'iso-27001', 'cmmc']

  const frameworks: Record<string, FrameworkExportData> = {}

  for (const fw of FRAMEWORKS) {
    const assessmentRaw = localStorage.getItem(`assessment-${fw.id}`)
    const snapshotsRaw = localStorage.getItem(`snapshots-${fw.id}`)

    if (assessmentRaw) {
      try {
        const assessment: Assessment = JSON.parse(assessmentRaw)
        if (hasAssessmentData(assessment)) {
          const snapshots = snapshotsRaw ? JSON.parse(snapshotsRaw) : []
          frameworks[fw.id] = { assessment, snapshots }
        }
      } catch { /* skip corrupt data */ }
    }
  }

  const exportData: ExportDataV2 = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    activeFramework,
    enabledFrameworks,
    frameworks,
  }

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pumagrc-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)

  localStorage.setItem('last-backup-date', new Date().toISOString())
}

export type ImportResult =
  | { type: 'v2'; activeFramework: string }
  | { type: 'v1-legacy'; assessment: Assessment; snapshots?: any[] }

export function parseImportData(raw: any): ImportResult {
  // V2 format: { version: "2.0", frameworks: { ... } }
  if (raw.version === '2.0' && raw.frameworks && typeof raw.frameworks === 'object') {
    for (const [fwId, data] of Object.entries(raw.frameworks)) {
      const fwData = data as FrameworkExportData
      if (fwData.assessment && fwData.assessment.subcategories) {
        localStorage.setItem(`assessment-${fwId}`, JSON.stringify(fwData.assessment))
      }
      if (Array.isArray(fwData.snapshots)) {
        localStorage.setItem(`snapshots-${fwId}`, JSON.stringify(fwData.snapshots))
      }
    }

    if (Array.isArray(raw.enabledFrameworks) && raw.enabledFrameworks.length > 0) {
      localStorage.setItem('enabled-frameworks', JSON.stringify(raw.enabledFrameworks))
    }

    const activeFramework = raw.activeFramework || FRAMEWORKS[0].id
    localStorage.setItem('active-framework', activeFramework)
    localStorage.setItem('last-backup-date', new Date().toISOString())

    return { type: 'v2', activeFramework }
  }

  // V1 format: { assessment, snapshots } (single framework)
  if (raw.assessment && raw.assessment.subcategories) {
    return {
      type: 'v1-legacy',
      assessment: raw.assessment as Assessment,
      snapshots: Array.isArray(raw.snapshots) ? raw.snapshots : undefined,
    }
  }

  // Legacy direct assessment object
  if (raw.subcategories && typeof raw.subcategories === 'object') {
    return { type: 'v1-legacy', assessment: raw as Assessment }
  }

  throw new Error('Invalid file format')
}
