import { useRef, useState, useEffect, useCallback } from 'react'
import { Modal } from './Modal'
import { Download, Upload, RotateCcw, FileText, ChevronDown, Menu, MoreVertical, Check, Settings } from 'lucide-react'
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


export function Header({ onMenuToggle, onNavigate }: { onMenuToggle: () => void; onNavigate: (path: string) => void }) {
  const { assessment, importAssessment, resetAssessment } = useAssessment()
  const { framework, allFrameworks, isFrameworkEnabled, toggleFramework } = useFramework()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const [showReportMenu, setShowReportMenu] = useState(false)
  const [showOverflowMenu, setShowOverflowMenu] = useState(false)
  const [showFrameworkConfig, setShowFrameworkConfig] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [savePulse, setSavePulse] = useState(false)
  const lastSavedRef = useRef(assessment.lastSaved)

  // Pulse the save indicator when lastSaved changes
  const triggerSavePulse = useCallback(() => {
    setSavePulse(true)
    const timeout = setTimeout(() => setSavePulse(false), 450)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (assessment.lastSaved !== lastSavedRef.current) {
      lastSavedRef.current = assessment.lastSaved
      triggerSavePulse()
    }
  }, [assessment.lastSaved, triggerSavePulse])

  // Close dropdown on Escape
  useEffect(() => {
    if (!showReportMenu) return
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowReportMenu(false) }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showReportMenu])

  const filePrefix = framework.id

  const handleExport = () => {
    const snapshots = JSON.parse(localStorage.getItem(`snapshots-${framework.id}`) || '[]')
    const exportData = { assessment, snapshots }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
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
        const raw = JSON.parse(ev.target?.result as string)
        let data: Assessment
        // New format: { assessment, snapshots }
        if (raw.assessment && raw.assessment.subcategories) {
          data = raw.assessment
          if (Array.isArray(raw.snapshots)) {
            localStorage.setItem(`snapshots-${framework.id}`, JSON.stringify(raw.snapshots))
          }
        // Legacy format: direct assessment object
        } else if (raw.subcategories && typeof raw.subcategories === 'object') {
          data = raw
        } else {
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

      {/* Autosave indicator */}
      <span className="hidden sm:inline-flex items-center gap-1 type-2xs" style={{ color: 'var(--color-text-muted)' }}>
        <Check className={`w-3 h-3 ${savePulse ? 'animate-save-pulse' : ''}`} style={{ color: 'var(--color-success)' }} />
        Saved
      </span>

      {/* Report dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowReportMenu(!showReportMenu)}
          disabled={generating}
          aria-haspopup="true"
          aria-expanded={showReportMenu}
          aria-live="polite"
          className="inline-flex items-center gap-1.5 type-sm font-medium px-3 py-1.5 rounded-lg disabled:opacity-50"
          style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-glow)' }}
        >
          <FileText className="w-3.5 h-3.5" aria-hidden="true" />
          {generating ? 'Generating...' : 'Report'}
          <ChevronDown className="w-3 h-3" aria-hidden="true" />
        </button>
        {showReportMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowReportMenu(false)} />
            <div className="absolute right-0 top-full mt-1 rounded-lg z-50 py-1 w-44 animate-dropdown-in" role="menu" style={{ background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-default)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
              <button onClick={handlePdfReport} role="menuitem" className="w-full text-left px-3 py-2 type-sm flex items-center gap-2 hover:opacity-80" style={{ color: 'var(--color-text-secondary)' }}>
                <FileText className="w-4 h-4" aria-hidden="true" style={{ color: 'var(--color-danger)' }} /> PDF Report
              </button>
              <button onClick={handleDocxReport} role="menuitem" className="w-full text-left px-3 py-2 type-sm flex items-center gap-2 hover:opacity-80" style={{ color: 'var(--color-text-secondary)' }}>
                <FileText className="w-4 h-4" aria-hidden="true" style={{ color: 'var(--color-info)' }} /> Word Document
              </button>
            </div>
          </>
        )}
      </div>

      {/* Overflow menu (Export, Import, Reset, Custom Frameworks) */}
      <div className="relative">
        <button
          onClick={() => setShowOverflowMenu(!showOverflowMenu)}
          aria-haspopup="true"
          aria-expanded={showOverflowMenu}
          aria-label="More actions"
          className="p-1.5 rounded-lg hover:opacity-80"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
        {showOverflowMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowOverflowMenu(false)} />
            <div className="absolute right-0 top-full mt-1 rounded-lg z-50 py-1 w-48 animate-dropdown-in" role="menu" style={{ background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-default)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
              <button onClick={() => { handleExport(); setShowOverflowMenu(false) }} role="menuitem" className="w-full text-left px-3 py-2 type-sm flex items-center gap-2 hover:opacity-80" style={{ color: 'var(--color-text-secondary)' }}>
                <Download className="w-3.5 h-3.5" aria-hidden="true" /> Export JSON
              </button>
              <button onClick={() => { fileInputRef.current?.click(); setShowOverflowMenu(false) }} role="menuitem" className="w-full text-left px-3 py-2 type-sm flex items-center gap-2 hover:opacity-80" style={{ color: 'var(--color-text-secondary)' }}>
                <Upload className="w-3.5 h-3.5" aria-hidden="true" /> Import JSON
              </button>
              <div className="my-1" style={{ borderTop: '1px solid var(--color-border-dim)' }} />
              <button onClick={() => { setShowFrameworkConfig(true); setShowOverflowMenu(false) }} role="menuitem" className="w-full text-left px-3 py-2 type-sm flex items-center gap-2 hover:opacity-80" style={{ color: 'var(--color-text-secondary)' }}>
                <Settings className="w-3.5 h-3.5" aria-hidden="true" /> Configure Frameworks
              </button>
              <div className="my-1" style={{ borderTop: '1px solid var(--color-border-dim)' }} />
              <button onClick={() => { setShowResetConfirm(true); setShowOverflowMenu(false) }} role="menuitem" className="w-full text-left px-3 py-2 type-sm flex items-center gap-2 hover:opacity-80" style={{ color: 'var(--color-danger)' }}>
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> Reset Assessment
              </button>
            </div>
          </>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" aria-label="Import assessment file" />

      <Modal open={!!importError} onClose={() => setImportError(null)} label="Import error">
        <p className="type-body mb-4" role="alert" style={{ color: 'var(--color-danger)' }}>{importError}</p>
        <button onClick={() => setImportError(null)} className="type-sm px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)' }}>OK</button>
      </Modal>

      <Modal open={showResetConfirm} onClose={() => setShowResetConfirm(false)} label="Reset assessment">
        <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Reset Assessment?</h3>
        <p className="type-body mb-4" style={{ color: 'var(--color-text-secondary)' }}>This will clear all data for {framework.name}. This cannot be undone.</p>
        <div className="flex gap-2 justify-end">
          <button onClick={() => setShowResetConfirm(false)} className="type-sm px-3 py-1.5 rounded-lg" style={btnSecondary}>Cancel</button>
          <button onClick={() => { resetAssessment(); setShowResetConfirm(false) }} className="type-sm px-3 py-1.5 rounded-lg" style={{ background: 'rgba(248, 113, 113, 0.15)', color: 'var(--color-danger)', border: '1px solid rgba(248, 113, 113, 0.3)' }}>Reset</button>
        </div>
      </Modal>

      <Modal open={showFrameworkConfig} onClose={() => setShowFrameworkConfig(false)} label="Configure frameworks">
        <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>Configure Frameworks</h3>
        <p className="type-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Choose which frameworks appear in the selector and cross-map. Assessment data is preserved when a framework is hidden.</p>
        <div className="space-y-1.5 mb-4">
          {allFrameworks.map(fw => (
            <label key={fw.id} className="flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer hover:opacity-90" style={{ background: isFrameworkEnabled(fw.id) ? 'var(--color-accent-dim)' : 'transparent' }}>
              <input
                type="checkbox"
                checked={isFrameworkEnabled(fw.id)}
                onChange={() => toggleFramework(fw.id)}
                className="accent-cyan-500 rounded"
              />
              <div>
                <span className="type-sm font-medium" style={{ color: isFrameworkEnabled(fw.id) ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{fw.name}</span>
                {fw.version && <span className="type-2xs ml-1.5" style={{ color: 'var(--color-text-muted)' }}>v{fw.version}</span>}
              </div>
            </label>
          ))}
        </div>
        <div className="flex justify-end">
          <button onClick={() => setShowFrameworkConfig(false)} className="type-sm px-3 py-1.5 rounded-lg" style={btnSecondary}>Done</button>
        </div>
      </Modal>
    </header>
  )
}
