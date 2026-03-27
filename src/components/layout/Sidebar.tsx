import { useState } from 'react'
import { ChevronDown, ChevronRight, Shield } from 'lucide-react'
import { useFramework } from '../../store/framework-context'
import { useAssessment } from '../../store/assessment-store'
import { MaturityLevel, getFunctionColors } from '../../types/assessment'

interface SidebarProps {
  currentPath: string
  onNavigate: (path: string) => void
}

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  const { framework, setFramework, allFrameworks } = useFramework()
  const { assessment } = useAssessment()
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    framework.data.forEach(fn => { initial[fn.id] = true })
    return initial
  })

  const functionColors = getFunctionColors(framework)

  const toggleExpanded = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const getCategoryProgress = (categoryId: string) => {
    const fn = framework.data.find(f => f.categories.some(c => c.id === categoryId))
    const cat = fn?.categories.find(c => c.id === categoryId)
    if (!cat) return { assessed: 0, total: 0 }
    const total = cat.subcategories.length
    const assessed = cat.subcategories.filter(
      sub => assessment.subcategories[sub.id]?.maturity !== MaturityLevel.NotAssessed
    ).length
    return { assessed, total }
  }

  const getFunctionProgress = (fnId: string) => {
    const fn = framework.data.find(f => f.id === fnId)
    if (!fn) return { assessed: 0, total: 0 }
    let assessed = 0, total = 0
    fn.categories.forEach(cat => {
      total += cat.subcategories.length
      assessed += cat.subcategories.filter(
        sub => assessment.subcategories[sub.id]?.maturity !== MaturityLevel.NotAssessed
      ).length
    })
    return { assessed, total }
  }

  const handleFrameworkChange = (id: string) => {
    setFramework(id)
    onNavigate('dashboard')
    // Reset expanded state for new framework
    const newExpanded: Record<string, boolean> = {}
    const newFw = allFrameworks.find(f => f.id === id)
    newFw?.data.forEach(fn => { newExpanded[fn.id] = true })
    setExpanded(newExpanded)
  }

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col h-screen overflow-hidden">
      <div
        className="p-4 border-b border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors"
        onClick={() => onNavigate('dashboard')}
      >
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-400" />
          <div>
            <h1 className="text-base font-semibold tracking-tight">PumaGRC</h1>
            <p className="text-xs text-slate-400">Compliance Self-Assessment</p>
          </div>
        </div>
      </div>

      {/* Framework selector */}
      <div className="px-3 py-2 border-b border-slate-700">
        <select
          value={framework.id}
          onChange={e => handleFrameworkChange(e.target.value)}
          className="w-full text-sm bg-slate-800 text-white border border-slate-600 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {allFrameworks.map(fw => (
            <option key={fw.id} value={fw.id}>{fw.name}</option>
          ))}
        </select>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
            currentPath === 'dashboard' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onNavigate('gap-analysis')}
          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
            currentPath === 'gap-analysis' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Gap Analysis
        </button>
        <button
          onClick={() => onNavigate('cross-map')}
          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
            currentPath === 'cross-map' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Cross-Map
        </button>

        <div className="border-t border-slate-700 mt-2 pt-2">
          {framework.data.map(fn => {
            const colors = functionColors[fn.id]
            const progress = getFunctionProgress(fn.id)
            return (
              <div key={fn.id}>
                <button
                  onClick={() => toggleExpanded(fn.id)}
                  className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {expanded[fn.id] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    <span className={`inline-block w-2 h-2 rounded-full ${colors.bg}`} />
                    <span>{fn.id} - {fn.name}</span>
                  </div>
                  <span className="text-xs text-slate-500">{progress.assessed}/{progress.total}</span>
                </button>
                {expanded[fn.id] && (
                  <div className="ml-4">
                    {fn.categories.map(cat => {
                      const catProgress = getCategoryProgress(cat.id)
                      const isActive = currentPath === `category/${cat.id}`
                      return (
                        <button
                          key={cat.id}
                          onClick={() => onNavigate(`category/${cat.id}`)}
                          className={`w-full text-left px-4 py-1.5 text-xs transition-colors flex items-center justify-between ${
                            isActive ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-300'
                          }`}
                        >
                          <span className="truncate">{cat.id} {cat.name}</span>
                          <span className="text-slate-500 ml-1 shrink-0">{catProgress.assessed}/{catProgress.total}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}
