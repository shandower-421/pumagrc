import { FrameworkProvider, useFramework } from './store/framework-context'
import { AssessmentProvider } from './store/assessment-store'
import { useHash } from './hooks/useHash'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { DashboardView } from './components/dashboard/DashboardView'
import { CategoryView } from './components/assessment/CategoryView'
import { GapAnalysisView } from './components/gap-analysis/GapAnalysisView'
import { CrossMapView } from './components/cross-map/CrossMapView'

function AppContent() {
  const { hash, navigate } = useHash()
  const { framework } = useFramework()

  let content: React.ReactNode
  if (hash.startsWith('category/')) {
    const categoryId = hash.replace('category/', '')
    content = <CategoryView categoryId={categoryId} />
  } else if (hash === 'gap-analysis') {
    content = <GapAnalysisView onNavigate={navigate} />
  } else if (hash === 'cross-map') {
    content = <CrossMapView />
  } else {
    content = <DashboardView />
  }

  return (
    <AssessmentProvider framework={framework}>
      <div className="flex h-screen bg-slate-50">
        <Sidebar currentPath={hash} onNavigate={navigate} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
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
