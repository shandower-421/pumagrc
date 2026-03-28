import { useState, useEffect } from 'react'
import { ChevronRight, Shield, LayoutDashboard, AlertTriangle, Grid3x3, Clock, GitCompare } from 'lucide-react'
import { useFramework } from '../../store/framework-context'
import { useAssessment } from '../../store/assessment-store'
import { MaturityLevel, getFunctionColors } from '../../types/assessment'

interface SidebarProps {
  currentPath: string
  onNavigate: (path: string) => void
}

const NAV_ITEMS = [
  { path: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: 'gap-analysis', label: 'Gap Analysis', icon: AlertTriangle },
  { path: 'heatmap', label: 'Heatmap', icon: Grid3x3 },
  { path: 'history', label: 'History', icon: Clock },
  { path: 'cross-map', label: 'Cross-Map', icon: GitCompare },
]

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  const { framework, setFramework, enabledFrameworks } = useFramework()
  const { assessment } = useAssessment()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const functionColors = getFunctionColors(framework)

  // Update document title on navigation
  useEffect(() => {
    const viewName = currentPath === 'dashboard' ? 'Dashboard'
      : currentPath === 'gap-analysis' ? 'Gap Analysis'
      : currentPath === 'heatmap' ? 'Heatmap'
      : currentPath === 'history' ? 'History'
      : currentPath === 'cross-map' ? 'Cross-Map'
      : currentPath.startsWith('category/') ? currentPath.replace('category/', '')
      : 'Dashboard'
    document.title = `${viewName} — PumaGRC`
  }, [currentPath])

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
    setExpanded({})
  }

  return (
    <aside className="w-72 flex flex-col h-screen overflow-hidden border-r" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-dim)' }} aria-label="Sidebar">
      {/* Logo — accessible button */}
      <button
        className="px-5 py-4 text-left w-full"
        onClick={() => onNavigate('dashboard')}
        style={{ borderBottom: '1px solid var(--color-border-dim)' }}
        aria-label="PumaGRC — Navigate to dashboard"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent-dim)', border: '1px solid var(--color-accent-glow)' }}>
            <Shield className="w-4 h-4" aria-hidden="true" style={{ color: 'var(--color-accent)' }} />
          </div>
          <div>
            <span className="block type-sm font-semibold" style={{ color: 'var(--color-text-primary)', letterSpacing: 'var(--tracking-label)' }}>PUMAGRC</span>
            <span className="block type-label" style={{ color: 'var(--color-text-muted)' }}>Compliance Platform</span>
          </div>
        </div>
      </button>

      {/* Framework selector */}
      <div className="px-3 py-3" style={{ borderBottom: '1px solid var(--color-border-dim)' }}>
        <label htmlFor="framework-select" className="block type-label mb-1.5 px-1" style={{ color: 'var(--color-text-muted)' }}>Framework</label>
        <select
          id="framework-select"
          value={framework.id}
          onChange={e => handleFrameworkChange(e.target.value)}
          className="w-full type-sm font-medium rounded-lg px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)' }}
        >
          {enabledFrameworks.map(fw => (
            <option key={fw.id} value={fw.id}>{fw.name}</option>
          ))}
        </select>
      </div>

      <nav className="flex-1 overflow-y-auto py-2" aria-label="Main navigation">
        {/* Nav links */}
        <div className="px-2 space-y-0.5">
          {NAV_ITEMS.map(item => {
            const isActive = currentPath === item.path
            const Icon = item.icon
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className="w-full text-left px-3 py-2 type-sm font-medium rounded-lg flex items-center gap-2.5 hover:bg-[var(--color-surface-tint)]"
                aria-current={isActive ? 'page' : undefined}
                style={{
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  background: isActive ? 'var(--color-accent-dim)' : undefined,
                  border: isActive ? '1px solid rgba(34, 211, 238, 0.15)' : '1px solid transparent',
                }}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" style={{ opacity: isActive ? 1 : 0.5 }} />
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Framework tree */}
        <div className="mt-3 pt-3 px-2" style={{ borderTop: '1px solid var(--color-border-dim)' }}>
          {framework.data.map(fn => {
            const colors = functionColors[fn.id]
            const progress = getFunctionProgress(fn.id)
            const pct = progress.total > 0 ? Math.round((progress.assessed / progress.total) * 100) : 0
            return (
              <div key={fn.id} className="mb-0.5">
                <button
                  onClick={() => toggleExpanded(fn.id)}
                  aria-expanded={expanded[fn.id]}
                  aria-label={`${fn.id} ${fn.name}, ${pct}% assessed`}
                  className="w-full text-left px-2 py-2 type-sm font-medium rounded-md flex items-center justify-between group"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 chevron-transition" aria-hidden="true" style={{ color: 'var(--color-text-muted)', transform: expanded[fn.id] ? 'rotate(90deg)' : 'rotate(0deg)' }} />
                    <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${colors.bg}`} aria-hidden="true" />
                    <span className="truncate">{fn.id} — {fn.name}</span>
                  </div>
                  <span className={`type-2xs type-mono shrink-0 ml-1 ${pct === 100 ? 'milestone-complete' : ''}`} aria-hidden="true" style={{ color: pct === 100 ? 'var(--color-success)' : pct > 0 && pct < 50 ? 'var(--color-warning)' : 'var(--color-text-muted)' }}>{pct}%</span>
                </button>
                {expanded[fn.id] && (
                  <div className="ml-3 pl-3 animate-content-in" style={{ borderLeft: '1px solid var(--color-border-dim)' }} role="group" aria-label={`${fn.name} categories`}>
                    {fn.categories.map(cat => {
                      const catProgress = getCategoryProgress(cat.id)
                      const isActive = currentPath === `category/${cat.id}`
                      return (
                        <button
                          key={cat.id}
                          onClick={() => onNavigate(`category/${cat.id}`)}
                          aria-current={isActive ? 'page' : undefined}
                          className="w-full text-left px-2 py-1 type-xs rounded flex items-center justify-between"
                          style={{
                            color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                            background: isActive ? 'var(--color-accent-dim)' : 'transparent',
                          }}
                        >
                          <span className="truncate">{cat.id} {cat.name}</span>
                          <span className="type-2xs type-mono shrink-0 ml-1" aria-hidden="true" style={{ color: 'var(--color-text-muted)' }}>{catProgress.assessed}/{catProgress.total}</span>
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
