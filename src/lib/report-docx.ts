import {
  Document, Packer, Paragraph, Table, TableRow, TableCell,
  TextRun, HeadingLevel, AlignmentType, WidthType,
  BorderStyle, ShadingType,
} from 'docx'
import { saveAs } from 'file-saver'
import {
  type Assessment, type FrameworkMeta,
  MaturityLevel, Priority,
  MATURITY_LABELS, PRIORITY_LABELS, MATURITY_NUMERIC,
} from '../types/assessment'

const SLATE_900 = '1E293B'
const SLATE_500 = '64748B'
const SLATE_100 = 'F1F5F9'
const RED_700 = 'B91C1C'

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

function headerCell(text: string, color = SLATE_900): TableCell {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: 'FFFFFF', size: 18, font: 'Calibri' })] })],
    shading: { type: ShadingType.SOLID, color, fill: color },
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
  })
}

function cell(text: string, shaded = false): TableCell {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, size: 18, font: 'Calibri', color: '334155' })] })],
    shading: shaded ? { type: ShadingType.SOLID, color: SLATE_100, fill: SLATE_100 } : undefined,
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
  })
}

function noBorderTable(rows: TableRow[], columnWidths: number[]): Table {
  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
    },
  })
}

export async function generateDocxReport(assessment: Assessment, framework: FrameworkMeta) {
  const stats = computeStats(assessment)
  const sections: any[] = []

  // ---- Cover Page ----
  sections.push(
    new Paragraph({ spacing: { before: 3000 } }),
    new Paragraph({
      children: [new TextRun({ text: framework.name, size: 52, bold: true, color: SLATE_900, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Assessment Report', size: 40, bold: true, color: SLATE_900, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      children: [new TextRun({
        text: `Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
        size: 22, color: SLATE_500, font: 'Calibri',
      })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({
        text: `${stats.assessed} of ${stats.total} controls assessed | Average Maturity: ${stats.avgMaturity.toFixed(1)}/5.0`,
        size: 20, color: SLATE_500, font: 'Calibri',
      })],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({ children: [], pageBreakBefore: true }),
  )

  // ---- Executive Summary ----
  sections.push(
    new Paragraph({ text: 'Executive Summary', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    new Paragraph({ text: 'Overall Assessment Status', heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } }),
    noBorderTable([
      new TableRow({ children: [headerCell('Metric'), headerCell('Value')] }),
      new TableRow({ children: [cell('Completion'), cell(`${Math.round((stats.assessed / stats.total) * 100)}% (${stats.assessed} of ${stats.total} controls)`)] }),
      new TableRow({ children: [cell('Average Maturity', true), cell(`${stats.avgMaturity.toFixed(1)} out of 5.0`, true)] }),
      new TableRow({ children: [cell('High Priority Items'), cell(`${stats.highPriority}`)] }),
      new TableRow({ children: [cell('Controls with Plans', true), cell(`${stats.withPlan}`, true)] }),
    ], [3000, 6000]),

    new Paragraph({ text: 'Maturity Distribution', heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 } }),
    noBorderTable([
      new TableRow({ children: [headerCell('Maturity Level'), headerCell('Count'), headerCell('% of Total')] }),
      ...Object.entries(stats.maturityCounts).map(([level, count], i) =>
        new TableRow({ children: [cell(level, i % 2 === 1), cell(count.toString(), i % 2 === 1), cell(`${Math.round((count / stats.total) * 100)}%`, i % 2 === 1)] })
      ),
    ], [3500, 2000, 2000]),

    new Paragraph({ text: 'Priority Distribution', heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 } }),
    noBorderTable([
      new TableRow({ children: [headerCell('Priority'), headerCell('Count'), headerCell('% of Total')] }),
      ...Object.entries(stats.priorityCounts).map(([p, count], i) =>
        new TableRow({ children: [cell(p, i % 2 === 1), cell(count.toString(), i % 2 === 1), cell(`${Math.round((count / stats.total) * 100)}%`, i % 2 === 1)] })
      ),
    ], [3500, 2000, 2000]),
  )

  // Controls Needing Attention
  const items: { id: string; desc: string; mat: string; matScore: number; pri: string }[] = []
  for (const fn of framework.data) {
    for (const cat of fn.categories) {
      for (const sub of cat.subcategories) {
        const data = assessment.subcategories[sub.id]
        if (!data) continue
        items.push({ id: sub.id, desc: sub.description, mat: MATURITY_LABELS[data.maturity], matScore: MATURITY_NUMERIC[data.maturity], pri: PRIORITY_LABELS[data.priority] })
      }
    }
  }
  items.sort((a, b) => a.matScore - b.matScore)
  const needsAttention = items.slice(0, 10)

  sections.push(
    new Paragraph({ text: 'Controls Needing Attention (Lowest Maturity)', heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 } }),
    noBorderTable([
      new TableRow({ children: [headerCell('Control', RED_700), headerCell('Description', RED_700), headerCell('Maturity', RED_700), headerCell('Priority', RED_700)] }),
      ...needsAttention.map((g, i) =>
        new TableRow({ children: [cell(g.id, i % 2 === 1), cell(g.desc, i % 2 === 1), cell(g.mat, i % 2 === 1), cell(g.pri, i % 2 === 1)] })
      ),
    ], [1200, 5300, 1200, 1000]),
    new Paragraph({ children: [], pageBreakBefore: true }),
  )

  // ---- Domain Summaries ----
  sections.push(
    new Paragraph({ text: 'Domain Summaries', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
  )

  for (const fn of framework.data) {
    const fnSubs = fn.categories.flatMap(c => c.subcategories)
    const fnAssessed = fnSubs.filter(s => assessment.subcategories[s.id]?.maturity !== MaturityLevel.NotAssessed).length
    const fnAvg = fnSubs.length > 0
      ? fnSubs.reduce((sum, s) => sum + MATURITY_NUMERIC[assessment.subcategories[s.id]?.maturity || MaturityLevel.NotAssessed], 0) / fnSubs.length
      : 0

    sections.push(
      new Paragraph({ text: `${fn.id} - ${fn.name}`, heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: fn.description, size: 18, color: SLATE_500, font: 'Calibri' })], spacing: { after: 80 } }),
      new Paragraph({ children: [new TextRun({ text: `Assessed: ${fnAssessed} of ${fnSubs.length} | Average Maturity: ${fnAvg.toFixed(1)}`, size: 18, color: SLATE_500, font: 'Calibri', bold: true })], spacing: { after: 100 } }),
      noBorderTable([
        new TableRow({ children: [headerCell('Category'), headerCell('Name'), headerCell('Controls'), headerCell('Avg Maturity')] }),
        ...fn.categories.map((cat, i) => {
          const catAvg = cat.subcategories.length > 0
            ? cat.subcategories.reduce((sum, s) => sum + MATURITY_NUMERIC[assessment.subcategories[s.id]?.maturity || MaturityLevel.NotAssessed], 0) / cat.subcategories.length
            : 0
          return new TableRow({ children: [cell(cat.id, i % 2 === 1), cell(cat.name, i % 2 === 1), cell(cat.subcategories.length.toString(), i % 2 === 1), cell(catAvg.toFixed(1), i % 2 === 1)] })
        }),
      ], [1500, 4500, 1500, 1500]),
    )
  }

  sections.push(new Paragraph({ children: [], pageBreakBefore: true }))

  // ---- Detailed Findings ----
  sections.push(
    new Paragraph({ text: 'Detailed Findings', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
  )

  for (const fn of framework.data) {
    sections.push(
      new Paragraph({ text: `${fn.id} - ${fn.name}`, heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 } }),
    )

    for (const cat of fn.categories) {
      sections.push(
        new Paragraph({ text: `${cat.id} - ${cat.name}`, heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 } }),
      )

      for (const sub of cat.subcategories) {
        const data = assessment.subcategories[sub.id]
        if (!data) continue

        sections.push(
          new Paragraph({
            children: [
              new TextRun({ text: sub.id, bold: true, size: 20, font: 'Calibri', color: SLATE_900 }),
              new TextRun({ text: `   Maturity: ${MATURITY_LABELS[data.maturity]}  |  Priority: ${PRIORITY_LABELS[data.priority]}`, size: 18, font: 'Calibri', color: SLATE_500 }),
            ],
            spacing: { before: 160, after: 40 },
          }),
          new Paragraph({
            children: [new TextRun({ text: sub.description, size: 18, font: 'Calibri', color: '475569', italics: true })],
            spacing: { after: 60 },
          }),
        )

        if (data.proof.trim()) {
          sections.push(new Paragraph({
            children: [
              new TextRun({ text: 'Proof: ', bold: true, size: 18, font: 'Calibri', color: SLATE_900 }),
              new TextRun({ text: data.proof, size: 18, font: 'Calibri', color: '475569' }),
            ],
            spacing: { after: 40 }, indent: { left: 200 },
          }))
        }
        if (data.plan.trim()) {
          sections.push(new Paragraph({
            children: [
              new TextRun({ text: 'Plan: ', bold: true, size: 18, font: 'Calibri', color: SLATE_900 }),
              new TextRun({ text: data.plan, size: 18, font: 'Calibri', color: '475569' }),
            ],
            spacing: { after: 40 }, indent: { left: 200 },
          }))
        }
        if (data.notes.trim()) {
          sections.push(new Paragraph({
            children: [
              new TextRun({ text: 'Notes: ', bold: true, size: 18, font: 'Calibri', color: SLATE_900 }),
              new TextRun({ text: data.notes, size: 18, font: 'Calibri', color: '475569' }),
            ],
            spacing: { after: 40 }, indent: { left: 200 },
          }))
        }

        sections.push(new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' } },
          spacing: { after: 80 },
        }))
      }
    }
  }

  const doc = new Document({ sections: [{ properties: {}, children: sections }] })
  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${framework.id}-report-${new Date().toISOString().slice(0, 10)}.docx`)
}
