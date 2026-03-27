import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  type Assessment, type FrameworkMeta,
  MaturityLevel, Priority,
  MATURITY_LABELS, PRIORITY_LABELS, MATURITY_NUMERIC,
} from '../types/assessment'

const PRIORITY_WEIGHT: Record<Priority, number> = {
  [Priority.High]: 5,
  [Priority.Next]: 4,
  [Priority.Working]: 3,
  [Priority.Med]: 2,
  [Priority.Low]: 1,
  [Priority.NotSet]: 0,
}

function computeStats(assessment: Assessment) {
  const entries = Object.values(assessment.subcategories)
  const total = entries.length
  const assessed = entries.filter(e => e.maturity !== MaturityLevel.NotAssessed).length
  const withPlan = entries.filter(e => e.plan.trim().length > 0).length
  const highPriority = entries.filter(e => e.priority === Priority.High).length

  const maturityCounts: Record<string, number> = {}
  for (const level of Object.values(MaturityLevel)) {
    maturityCounts[MATURITY_LABELS[level]] = entries.filter(e => e.maturity === level).length
  }

  const priorityCounts: Record<string, number> = {}
  for (const p of Object.values(Priority)) {
    priorityCounts[PRIORITY_LABELS[p]] = entries.filter(e => e.priority === p).length
  }

  const avgMaturity = total > 0
    ? entries.reduce((sum, e) => sum + MATURITY_NUMERIC[e.maturity], 0) / total
    : 0

  return { total, assessed, withPlan, highPriority, maturityCounts, priorityCounts, avgMaturity }
}

function getTopGaps(assessment: Assessment, framework: FrameworkMeta, limit = 10) {
  const gaps: { id: string; description: string; maturity: string; priority: string; gapScore: number }[] = []
  for (const fn of framework.data) {
    for (const cat of fn.categories) {
      for (const sub of cat.subcategories) {
        const data = assessment.subcategories[sub.id]
        if (!data) continue
        const maturityScore = MATURITY_NUMERIC[data.maturity]
        const priorityScore = PRIORITY_WEIGHT[data.priority]
        const gapScore = (5 - maturityScore) * (priorityScore + 1)
        gaps.push({
          id: sub.id, description: sub.description,
          maturity: MATURITY_LABELS[data.maturity],
          priority: PRIORITY_LABELS[data.priority], gapScore,
        })
      }
    }
  }
  gaps.sort((a, b) => b.gapScore - a.gapScore)
  return gaps.slice(0, limit)
}

export function generatePdfReport(assessment: Assessment, framework: FrameworkMeta) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 40
  const contentWidth = pageWidth - margin * 2
  let y = margin
  const reportTitle = `${framework.name} Assessment Report`

  const addPageIfNeeded = (needed: number) => {
    if (y + needed > doc.internal.pageSize.getHeight() - 50) {
      doc.addPage()
      y = margin
    }
  }

  const sectionTitle = (text: string, fontSize = 14) => {
    addPageIfNeeded(40)
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 41, 59)
    doc.text(text, margin, y)
    y += fontSize + 8
  }

  const bodyText = (text: string, indent = 0) => {
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(71, 85, 105)
    const lines = doc.splitTextToSize(text, contentWidth - indent)
    addPageIfNeeded(lines.length * 12)
    doc.text(lines, margin + indent, y)
    y += lines.length * 12
  }

  // ---- Cover ----
  y = 200
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  doc.text(framework.name, pageWidth / 2, y, { align: 'center' })
  y += 30
  doc.text('Assessment Report', pageWidth / 2, y, { align: 'center' })
  y += 40
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 116, 139)
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth / 2, y, { align: 'center' })

  // ---- Executive Summary ----
  doc.addPage()
  y = margin
  const stats = computeStats(assessment)

  sectionTitle('Executive Summary', 18)
  y += 4
  sectionTitle('Overall Assessment Status', 12)

  autoTable(doc, {
    startY: y, margin: { left: margin, right: margin },
    head: [['Metric', 'Value']],
    body: [
      ['Completion', `${Math.round((stats.assessed / stats.total) * 100)}% (${stats.assessed} of ${stats.total} controls assessed)`],
      ['Average Maturity', `${stats.avgMaturity.toFixed(1)} out of 5.0`],
      ['High Priority Items', `${stats.highPriority}`],
      ['Controls with Plans', `${stats.withPlan}`],
    ],
    styles: { fontSize: 9, cellPadding: 6 },
    headStyles: { fillColor: [30, 41, 59], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  })
  y = (doc as any).lastAutoTable.finalY + 20

  sectionTitle('Maturity Distribution', 12)
  autoTable(doc, {
    startY: y, margin: { left: margin, right: margin },
    head: [['Maturity Level', 'Count', '% of Total']],
    body: Object.entries(stats.maturityCounts).map(([level, count]) => [
      level, count.toString(), `${Math.round((count / stats.total) * 100)}%`,
    ]),
    styles: { fontSize: 9, cellPadding: 5 },
    headStyles: { fillColor: [30, 41, 59], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  })
  y = (doc as any).lastAutoTable.finalY + 20

  sectionTitle('Priority Distribution', 12)
  autoTable(doc, {
    startY: y, margin: { left: margin, right: margin },
    head: [['Priority', 'Count', '% of Total']],
    body: Object.entries(stats.priorityCounts).map(([p, count]) => [
      p, count.toString(), `${Math.round((count / stats.total) * 100)}%`,
    ]),
    styles: { fontSize: 9, cellPadding: 5 },
    headStyles: { fillColor: [30, 41, 59], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  })
  y = (doc as any).lastAutoTable.finalY + 20

  addPageIfNeeded(100)
  sectionTitle('Top Gaps (Highest Risk)', 12)
  const topGaps = getTopGaps(assessment, framework, 10)
  autoTable(doc, {
    startY: y, margin: { left: margin, right: margin },
    head: [['Control', 'Description', 'Maturity', 'Priority', 'Gap Score']],
    body: topGaps.map(g => [g.id, g.description, g.maturity, g.priority, g.gapScore.toString()]),
    styles: { fontSize: 8, cellPadding: 4 },
    headStyles: { fillColor: [153, 27, 27], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [254, 242, 242] },
    columnStyles: { 0: { cellWidth: 55 }, 2: { cellWidth: 65 }, 3: { cellWidth: 50 }, 4: { cellWidth: 45, halign: 'center' } },
  })
  y = (doc as any).lastAutoTable.finalY + 20

  // ---- Domain Summaries ----
  doc.addPage()
  y = margin
  sectionTitle('Domain Summaries', 18)
  y += 4

  for (const fn of framework.data) {
    addPageIfNeeded(120)
    sectionTitle(`${fn.id} - ${fn.name}`, 13)
    bodyText(fn.description)
    y += 4

    const fnSubs = fn.categories.flatMap(c => c.subcategories)
    const fnAssessed = fnSubs.filter(s => assessment.subcategories[s.id]?.maturity !== MaturityLevel.NotAssessed).length
    const fnAvg = fnSubs.length > 0
      ? fnSubs.reduce((sum, s) => sum + MATURITY_NUMERIC[assessment.subcategories[s.id]?.maturity || MaturityLevel.NotAssessed], 0) / fnSubs.length
      : 0

    bodyText(`Assessed: ${fnAssessed} of ${fnSubs.length} | Average Maturity: ${fnAvg.toFixed(1)}`)
    y += 4

    autoTable(doc, {
      startY: y, margin: { left: margin, right: margin },
      head: [['Category', 'Name', 'Controls', 'Avg Maturity']],
      body: fn.categories.map(cat => {
        const catAvg = cat.subcategories.length > 0
          ? cat.subcategories.reduce((sum, s) => sum + MATURITY_NUMERIC[assessment.subcategories[s.id]?.maturity || MaturityLevel.NotAssessed], 0) / cat.subcategories.length
          : 0
        return [cat.id, cat.name, cat.subcategories.length.toString(), catAvg.toFixed(1)]
      }),
      styles: { fontSize: 9, cellPadding: 5 },
      headStyles: { fillColor: [30, 41, 59], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 250, 252] },
    })
    y = (doc as any).lastAutoTable.finalY + 20
  }

  // ---- Detailed Findings ----
  doc.addPage()
  y = margin
  sectionTitle('Detailed Findings', 18)
  y += 4

  for (const fn of framework.data) {
    addPageIfNeeded(50)
    sectionTitle(`${fn.id} - ${fn.name}`, 14)

    for (const cat of fn.categories) {
      addPageIfNeeded(40)
      sectionTitle(`${cat.id} - ${cat.name}`, 11)

      for (const sub of cat.subcategories) {
        const data = assessment.subcategories[sub.id]
        if (!data) continue

        addPageIfNeeded(80)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(30, 41, 59)
        doc.text(sub.id, margin, y)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(71, 85, 105)
        doc.text(`  Maturity: ${MATURITY_LABELS[data.maturity]}  |  Priority: ${PRIORITY_LABELS[data.priority]}`, margin + 50, y)
        y += 14
        bodyText(sub.description)
        y += 2

        if (data.proof.trim()) {
          doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(30, 41, 59)
          doc.text('Proof:', margin + 10, y); y += 11
          bodyText(data.proof, 10); y += 2
        }
        if (data.plan.trim()) {
          doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(30, 41, 59)
          doc.text('Plan:', margin + 10, y); y += 11
          bodyText(data.plan, 10); y += 2
        }
        if (data.notes.trim()) {
          doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(30, 41, 59)
          doc.text('Notes:', margin + 10, y); y += 11
          bodyText(data.notes, 10); y += 2
        }

        doc.setDrawColor(226, 232, 240)
        doc.line(margin, y, pageWidth - margin, y)
        y += 10
      }
    }
  }

  // Footer with page numbers
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(148, 163, 184)
    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 20, { align: 'center' })
    doc.text(reportTitle, margin, doc.internal.pageSize.getHeight() - 20)
  }

  doc.save(`${framework.id}-report-${new Date().toISOString().slice(0, 10)}.pdf`)
}
