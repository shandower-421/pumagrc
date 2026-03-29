import { useState, useCallback } from 'react'
import { FrameworkProvider, useFramework } from './store/framework-context'
import { AssessmentProvider } from './store/assessment-store'
import { Modal } from './components/layout/Modal'
import { useHash } from './hooks/useHash'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { DashboardView } from './components/dashboard/DashboardView'
import { CategoryView } from './components/assessment/CategoryView'
import { GapAnalysisView } from './components/gap-analysis/GapAnalysisView'
import { CrossMapView } from './components/cross-map/CrossMapView'
import { HistoryView } from './components/history/HistoryView'
import { HeatmapView } from './components/heatmap/HeatmapView'
import { BackupReminder } from './components/layout/BackupReminder'

function AppContent() {
  const { hash, navigate } = useHash()
  const { framework, allFrameworks, isFrameworkEnabled, toggleFramework } = useFramework()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showFrameworkConfig, setShowFrameworkConfig] = useState(false)

  const handleNavigate = useCallback((path: string) => {
    navigate(path)
    setSidebarOpen(false)
  }, [navigate])

  let content: React.ReactNode
  if (hash.startsWith('category/')) {
    const categoryId = hash.replace('category/', '')
    content = <CategoryView categoryId={categoryId} />
  } else if (hash === 'gap-analysis' || hash === 'risk-register') {
    content = <GapAnalysisView />
  } else if (hash === 'cross-map') {
    content = <CrossMapView onNavigate={handleNavigate} />
  } else if (hash === 'history') {
    content = <HistoryView />
  } else if (hash === 'heatmap') {
    content = <HeatmapView onNavigate={handleNavigate} />
  } else {
    content = <DashboardView />
  }

  return (
    <AssessmentProvider framework={framework}>
      <div className="flex h-screen" style={{ background: 'var(--color-surface)' }}>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar — always visible on lg+, drawer on mobile */}
        <div className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar currentPath={hash} onNavigate={handleNavigate} onConfigureFrameworks={() => setShowFrameworkConfig(true)} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {__DEMO_MODE__ && (
            <div className="px-4 py-1.5 text-center type-2xs font-medium" style={{ background: 'rgba(134, 59, 255, 0.08)', color: 'var(--color-accent)', borderBottom: '1px solid rgba(134, 59, 255, 0.15)' }}>
              Demo Mode &mdash; Sample data pre-loaded. Import/export/reset disabled.
            </div>
          )}
          {!__DEMO_MODE__ && <BackupReminder />}
          <Header onMenuToggle={() => setSidebarOpen(s => !s)} onNavigate={handleNavigate} onConfigureFrameworks={() => setShowFrameworkConfig(true)} />
          <main className="flex-1 overflow-y-auto" id="main-content">
            {content}
          </main>
        </div>
      </div>

      <Modal open={showFrameworkConfig} onClose={() => setShowFrameworkConfig(false)} label="Configure frameworks">
        <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>Configure Frameworks</h3>
        <p className="type-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Choose which frameworks appear in the selector and cross-map. Assessment data is preserved when a framework is hidden.</p>
        <div className="space-y-4 mb-4">
          {([
            { group: 'Cybersecurity', ids: ['nist-csf-2', 'iso-27001', 'soc2'] },
            { group: 'Federal / Defense', ids: ['nist-800-53', 'nist-800-171', 'cmmc'] },
            { group: 'Industry Compliance', ids: ['hipaa', 'pci-dss'] },
            { group: 'Privacy', ids: ['gdpr', 'nist-pf'] },
            { group: 'AI Governance', ids: ['iso-42001'] },
          ] as { group: string; ids: string[] }[]).map(section => {
            const fws = section.ids.map(id => allFrameworks.find(f => f.id === id)).filter(Boolean) as typeof allFrameworks
            if (fws.length === 0) return null
            return (
              <div key={section.group}>
                <p className="type-2xs font-semibold uppercase tracking-wide mb-1.5 px-2" style={{ color: 'var(--color-text-muted)' }}>{section.group}</p>
                <div className="space-y-1">
                  {fws.map(fw => (
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
              </div>
            )
          })}
        </div>
        <div className="flex justify-end">
          <button onClick={() => setShowFrameworkConfig(false)} className="type-sm px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }}>Done</button>
        </div>
      </Modal>
    </AssessmentProvider>
  )
}

function App() {
  return (
    <FrameworkProvider>
      <AppContent />
    </FrameworkProvider>
  )
}

export default App
