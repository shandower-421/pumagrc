import { useState, useEffect } from 'react'
import { ChevronRight, Shield, LayoutDashboard, AlertTriangle, Grid3x3, Clock, GitCompare, Settings } from 'lucide-react'
import { useFramework } from '../../store/framework-context'
import { useAssessment } from '../../store/assessment-store'
import { MaturityLevel, getFunctionColors } from '../../types/assessment'

interface SidebarProps {
  currentPath: string
  onNavigate: (path: string) => void
  onConfigureFrameworks: () => void
}

const NAV_ITEMS = [
  { path: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: 'gap-analysis', label: 'Gap & Risk', icon: AlertTriangle },
  { path: 'heatmap', label: 'Heatmap', icon: Grid3x3 },
  { path: 'history', label: 'History', icon: Clock },
  { path: 'cross-map', label: 'Cross-Map', icon: GitCompare },
]

export function Sidebar({ currentPath, onNavigate, onConfigureFrameworks }: SidebarProps) {
  const { framework, setFramework, enabledFrameworks } = useFramework()
  const { assessment } = useAssessment()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const functionColors = getFunctionColors(framework)

  // Update document title on navigation
  useEffect(() => {
    const viewName = currentPath === 'dashboard' ? 'Dashboard'
      : currentPath === 'gap-analysis' ? 'Gap & Risk'
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
    <aside className="w-72 flex flex-col h-screen overflow-hidden border-r" style={{ background: 'var(--color-sidebar-bg)', borderColor: 'var(--color-sidebar-border)' }} aria-label="Sidebar">
      {/* Logo — link to greykit.com */}
      <a
        href="https://www.greykit.com"
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-4 text-left w-full block"
        style={{ borderBottom: '1px solid var(--color-sidebar-border)' }}
        aria-label="PumaGRC — Visit greykit.com"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'oklch(0.55 0.12 195 / 0.15)', border: '1px solid oklch(0.55 0.12 195 / 0.25)' }}>
            <Shield className="w-4 h-4" aria-hidden="true" style={{ color: 'var(--color-sidebar-primary)' }} />
          </div>
          <div>
            <span className="block type-sm font-semibold" style={{ color: 'var(--color-sidebar-fg)', letterSpacing: 'var(--tracking-label)' }}>PUMAGRC</span>
            <span className="block type-label" style={{ color: 'var(--color-sidebar-fg-muted)' }}>Self Assessment Tool</span>
          </div>
        </div>
      </a>

      {/* Framework selector */}
      <div className="px-3 py-3" style={{ borderBottom: '1px solid var(--color-sidebar-border)' }}>
        <div className="flex items-center justify-between mb-1.5 px-1">
          <p className="type-label" style={{ color: 'var(--color-sidebar-fg-muted)' }} id="fw-group-label">Framework</p>
          <button
            onClick={onConfigureFrameworks}
            aria-label="Configure frameworks"
            className="p-1 rounded hover:opacity-80"
            style={{ color: 'var(--color-sidebar-fg-muted)' }}
          >
            <Settings className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
        <div role="radiogroup" aria-labelledby="fw-group-label" className="space-y-0.5">
          {enabledFrameworks.map(fw => {
            const isActive = framework.id === fw.id
            return (
              <button
                key={fw.id}
                role="radio"
                aria-checked={isActive}
                onClick={() => handleFrameworkChange(fw.id)}
                className="w-full text-left px-3 py-1.5 type-sm font-medium rounded-md flex items-center gap-2"
                style={{
                  color: isActive ? 'var(--color-sidebar-primary)' : 'var(--color-sidebar-fg)',
                  background: isActive ? 'var(--color-sidebar-accent-bg)' : undefined,
                  borderLeft: isActive ? '2px solid var(--color-sidebar-primary)' : '2px solid transparent',
                }}
              >
                {fw.shortName}
              </button>
            )
          })}
        </div>
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
                className="w-full text-left px-3 py-2 type-sm font-medium rounded-lg flex items-center gap-2.5 hover:bg-[var(--color-sidebar-accent-bg)]/50"
                aria-current={isActive ? 'page' : undefined}
                style={{
                  color: isActive ? 'var(--color-sidebar-primary)' : 'oklch(0.88 0.01 200 / 0.7)',
                  background: isActive ? 'var(--color-sidebar-accent-bg)' : undefined,
                  border: isActive ? '1px solid oklch(0.55 0.12 195 / 0.2)' : '1px solid transparent',
                }}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" style={{ opacity: isActive ? 1 : 0.5 }} />
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Framework tree */}
        <div className="mt-3 pt-3 px-2" style={{ borderTop: '1px solid var(--color-sidebar-border)' }}>
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
                  style={{ color: 'var(--color-sidebar-fg)' }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 chevron-transition" aria-hidden="true" style={{ color: 'var(--color-sidebar-fg-muted)', transform: expanded[fn.id] ? 'rotate(90deg)' : 'rotate(0deg)' }} />
                    <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${colors.bg}`} aria-hidden="true" />
                    <span className="truncate">{fn.id} — {fn.name}</span>
                  </div>
                  <span className={`type-2xs type-mono shrink-0 ml-1 ${pct === 100 ? 'milestone-complete' : ''}`} aria-hidden="true" style={{ color: pct === 100 ? 'var(--color-success)' : pct > 0 && pct < 50 ? 'var(--color-warning)' : 'var(--color-sidebar-fg-muted)' }}>{pct}%</span>
                </button>
                {expanded[fn.id] && (
                  <div className="ml-3 pl-3 animate-content-in" style={{ borderLeft: '1px solid var(--color-sidebar-border)' }} role="group" aria-label={`${fn.name} categories`}>
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
                            color: isActive ? 'var(--color-sidebar-primary)' : 'var(--color-sidebar-fg-muted)',
                            background: isActive ? 'var(--color-sidebar-accent-bg)' : 'transparent',
                          }}
                        >
                          <span className="truncate">{cat.id} {cat.name}</span>
                          <span className="type-2xs type-mono shrink-0 ml-1" aria-hidden="true" style={{ color: 'var(--color-sidebar-fg-dim)' }}>{catProgress.assessed}/{catProgress.total}</span>
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
