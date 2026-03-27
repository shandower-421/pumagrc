import { useRef, useState } from 'react'
import { Download, Upload, RotateCcw, FileText, ChevronDown } from 'lucide-react'
import { useAssessment } from '../../store/assessment-store'
import { useFramework } from '../../store/framework-context'
import { generatePdfReport } from '../../lib/report-pdf'
import { generateDocxReport } from '../../lib/report-docx'
import type { Assessment } from '../../types/assessment'

export function Header() {
  const { assessment, importAssessment, resetAssessment } = useAssessment()
  const { framework } = useFramework()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const [showReportMenu, setShowReportMenu] = useState(false)
  const [generating, setGenerating] = useState(false)

  const filePrefix = framework.id

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(assessment, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filePrefix}-assessment-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImportError(null)
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as Assessment
        if (!data.subcategories || typeof data.subcategories !== 'object') {
          throw new Error('Invalid assessment format')
        }
        importAssessment(data)
      } catch {
        setImportError('Invalid file format. Please select a valid assessment JSON file.')
      }
    }
    reader.readAsText(file)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleReset = () => {
    resetAssessment()
    setShowResetConfirm(false)
  }

  const handlePdfReport = async () => {
    setShowReportMenu(false)
    setGenerating(true)
    try {
      await new Promise(r => setTimeout(r, 50))
      generatePdfReport(assessment, framework)
    } finally {
      setGenerating(false)
    }
  }

  const handleDocxReport = async () => {
    setShowReportMenu(false)
    setGenerating(true)
    try {
      await generateDocxReport(assessment, framework)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-end gap-2">
      {/* Report dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowReportMenu(!showReportMenu)}
          disabled={generating}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
        >
          <FileText className="w-3.5 h-3.5" />
          {generating ? 'Generating...' : 'Report'}
          <ChevronDown className="w-3 h-3" />
        </button>
        {showReportMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowReportMenu(false)} />
            <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 w-44">
              <button
                onClick={handlePdfReport}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-red-500" />
                PDF Report
              </button>
              <button
                onClick={handleDocxReport}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-blue-500" />
                Word Document
              </button>
            </div>
          </>
        )}
      </div>

      <div className="w-px h-5 bg-slate-200" />

      <button
        onClick={handleExport}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
      >
        <Download className="w-3.5 h-3.5" /> Export JSON
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
      >
        <Upload className="w-3.5 h-3.5" /> Import
      </button>
      <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
      <button
        onClick={() => setShowResetConfirm(true)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-800 px-2.5 py-1.5 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Reset
      </button>

      {importError && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setImportError(null)}>
          <div className="bg-white rounded-lg p-6 max-w-sm shadow-lg" onClick={e => e.stopPropagation()}>
            <p className="text-sm text-red-600 mb-4">{importError}</p>
            <button onClick={() => setImportError(null)} className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-md">OK</button>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowResetConfirm(false)}>
          <div className="bg-white rounded-lg p-6 max-w-sm shadow-lg" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-slate-900 mb-2">Reset Assessment?</h3>
            <p className="text-sm text-slate-600 mb-4">This will clear all maturity levels, priorities, proof, plans, and notes for {framework.name}. This cannot be undone.</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowResetConfirm(false)} className="text-sm px-3 py-1.5 border border-slate-200 rounded-md">Cancel</button>
              <button onClick={handleReset} className="text-sm bg-red-600 text-white px-3 py-1.5 rounded-md">Reset</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
