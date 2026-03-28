import { useRef, useState, useEffect, useCallback } from 'react'
import { Download, Upload, RotateCcw, FileText, ChevronDown, Menu } from 'lucide-react'
import { useAssessment } from '../../store/assessment-store'
import { useFramework } from '../../store/framework-context'
import { generatePdfReport } from '../../lib/report-pdf'
import { generateDocxReport } from '../../lib/report-docx'
import type { Assessment } from '../../types/assessment'

const btnSecondary = {
  background: 'var(--color-surface-raised)',
  color: 'var(--color-text-secondary)',
  border: '1px solid var(--color-border-default)',
}

const btnDanger = {
  background: 'transparent',
  color: 'var(--color-danger)',
  border: '1px solid rgba(248, 113, 113, 0.2)',
}

const modalOverlay = "fixed inset-0 bg-black/60 flex items-center justify-center z-50"
const modalCard = {
  background: 'var(--color-surface-overlay)',
  border: '1px solid var(--color-border-default)',
  boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
}

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement
      // Focus first focusable element in dialog
      setTimeout(() => {
        const focusable = dialogRef.current?.querySelector<HTMLElement>('button, input, select, textarea, [tabindex]')
        focusable?.focus()
      }, 50)
    } else if (previousFocus.current) {
      previousFocus.current.focus()
      previousFocus.current = null
    }
  }, [open])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.stopPropagation(); onClose() }
    // Focus trap
    if (e.key === 'Tab' && dialogRef.current) {
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }, [onClose])

  if (!open) return null
  return (
    <div className={modalOverlay} onClick={onClose} onKeyDown={handleKeyDown} role="dialog" aria-modal="true">
      <div ref={dialogRef} className="rounded-xl p-6 max-w-sm w-full mx-4" style={modalCard} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { assessment, importAssessment, resetAssessment } = useAssessment()
  const { framework } = useFramework()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const [showReportMenu, setShowReportMenu] = useState(false)
  const [generating, setGenerating] = useState(false)

  // Close dropdown on Escape
  useEffect(() => {
    if (!showReportMenu) return
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowReportMenu(false) }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showReportMenu])

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
    <header className="px-3 sm:px-5 py-2.5 flex items-center gap-2" style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border-dim)' }} aria-label="Actions">
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg"
        style={{ color: 'var(--color-text-secondary)' }}
        aria-label="Toggle navigation menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1" />

      {/* Report dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowReportMenu(!showReportMenu)}
          disabled={generating}
          aria-haspopup="true"
          aria-expanded={showReportMenu}
          aria-live="polite"
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg disabled:opacity-50"
          style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', border: '1px solid rgba(34, 211, 238, 0.2)' }}
        >
          <FileText className="w-3.5 h-3.5" aria-hidden="true" />
          {generating ? 'Generating...' : 'Report'}
          <ChevronDown className="w-3 h-3" aria-hidden="true" />
        </button>
        {showReportMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowReportMenu(false)} />
            <div className="absolute right-0 top-full mt-1 rounded-lg z-50 py-1 w-44" role="menu" style={{ background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-default)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
              <button onClick={handlePdfReport} role="menuitem" className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:opacity-80" style={{ color: 'var(--color-text-secondary)' }}>
                <FileText className="w-4 h-4" aria-hidden="true" style={{ color: '#f87171' }} /> PDF Report
              </button>
              <button onClick={handleDocxReport} role="menuitem" className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:opacity-80" style={{ color: 'var(--color-text-secondary)' }}>
                <FileText className="w-4 h-4" aria-hidden="true" style={{ color: '#60a5fa' }} /> Word Document
              </button>
            </div>
          </>
        )}
      </div>

      <div className="w-px h-4" style={{ background: 'var(--color-border-default)' }} aria-hidden="true" />

      <button onClick={handleExport} aria-label="Export assessment as JSON" className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg hover:opacity-80" style={btnSecondary}>
        <Download className="w-3.5 h-3.5" aria-hidden="true" /> <span className="hidden sm:inline">Export</span>
      </button>
      <button onClick={() => fileInputRef.current?.click()} aria-label="Import assessment from JSON file" className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg hover:opacity-80" style={btnSecondary}>
        <Upload className="w-3.5 h-3.5" aria-hidden="true" /> <span className="hidden sm:inline">Import</span>
      </button>
      <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" aria-label="Import assessment file" />
      <button onClick={() => setShowResetConfirm(true)} aria-label="Reset assessment" className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg hover:opacity-80" style={btnDanger}>
        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> <span className="hidden sm:inline">Reset</span>
      </button>

      <Modal open={!!importError} onClose={() => setImportError(null)}>
        <p className="text-sm mb-4" role="alert" style={{ color: 'var(--color-danger)' }}>{importError}</p>
        <button onClick={() => setImportError(null)} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)' }}>OK</button>
      </Modal>

      <Modal open={showResetConfirm} onClose={() => setShowResetConfirm(false)}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Reset Assessment?</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>This will clear all data for {framework.name}. This cannot be undone.</p>
        <div className="flex gap-2 justify-end">
          <button onClick={() => setShowResetConfirm(false)} className="text-xs px-3 py-1.5 rounded-lg" style={btnSecondary}>Cancel</button>
          <button onClick={() => { resetAssessment(); setShowResetConfirm(false) }} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'rgba(248, 113, 113, 0.15)', color: 'var(--color-danger)', border: '1px solid rgba(248, 113, 113, 0.3)' }}>Reset</button>
        </div>
      </Modal>
    </header>
  )
}
