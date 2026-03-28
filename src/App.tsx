import { useState, useCallback } from 'react'
import { FrameworkProvider, useFramework } from './store/framework-context'
import { AssessmentProvider } from './store/assessment-store'
import { useHash } from './hooks/useHash'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { DashboardView } from './components/dashboard/DashboardView'
import { CategoryView } from './components/assessment/CategoryView'
import { GapAnalysisView } from './components/gap-analysis/GapAnalysisView'
import { CrossMapView } from './components/cross-map/CrossMapView'
import { HistoryView } from './components/history/HistoryView'
import { HeatmapView } from './components/heatmap/HeatmapView'
import { CustomFrameworkView } from './components/custom-framework/CustomFrameworkView'

function AppContent() {
  const { hash, navigate } = useHash()
  const { framework } = useFramework()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNavigate = useCallback((path: string) => {
    navigate(path)
    setSidebarOpen(false)
  }, [navigate])

  let content: React.ReactNode
  if (hash.startsWith('category/')) {
    const categoryId = hash.replace('category/', '')
    content = <CategoryView categoryId={categoryId} />
  } else if (hash === 'gap-analysis') {
    content = <GapAnalysisView onNavigate={handleNavigate} />
  } else if (hash === 'cross-map') {
    content = <CrossMapView />
  } else if (hash === 'history') {
    content = <HistoryView />
  } else if (hash === 'heatmap') {
    content = <HeatmapView onNavigate={handleNavigate} />
  } else if (hash === 'custom-frameworks') {
    content = <CustomFrameworkView onNavigate={handleNavigate} />
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
          <Sidebar currentPath={hash} onNavigate={handleNavigate} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Header onMenuToggle={() => setSidebarOpen(s => !s)} />
          <main className="flex-1 overflow-y-auto" id="main-content">
            {content}
          </main>
        </div>
      </div>
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
