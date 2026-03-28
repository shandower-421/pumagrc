import { useState } from 'react'
import { useAssessment } from '../../store/assessment-store'
import { useFramework } from '../../store/framework-context'
import { MaturityLevel, MATURITY_LABELS, getFunctionColors } from '../../types/assessment'

const MATURITY_HEX: Record<MaturityLevel, string> = {
  [MaturityLevel.NotAssessed]: '#1e2230',
  [MaturityLevel.AdHoc]: '#ef4444',
  [MaturityLevel.Repeatable]: '#f97316',
  [MaturityLevel.Defined]: '#eab308',
  [MaturityLevel.Managed]: '#22d3ee',
  [MaturityLevel.Optimized]: '#22c55e',
}

const MATURITY_LEGEND: { level: MaturityLevel; label: string; color: string }[] = [
  { level: MaturityLevel.NotAssessed, label: 'Not Assessed', color: '#1e2230' },
  { level: MaturityLevel.AdHoc, label: 'Ad-Hoc', color: '#ef4444' },
  { level: MaturityLevel.Repeatable, label: 'Repeatable', color: '#f97316' },
  { level: MaturityLevel.Defined, label: 'Defined', color: '#eab308' },
  { level: MaturityLevel.Managed, label: 'Managed', color: '#22d3ee' },
  { level: MaturityLevel.Optimized, label: 'Optimized', color: '#22c55e' },
]

interface TooltipData { id: string; description: string; maturity: string; priority: string; x: number; y: number }

export function HeatmapView({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { assessment } = useAssessment()
  const { framework } = useFramework()
  const functionColors = getFunctionColors(framework)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [groupBy, setGroupBy] = useState<'function' | 'category'>('function')

  return (
    <div className="p-4 sm:p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-light" style={{ color: 'var(--color-text-primary)', fontFamily: "'Instrument Serif', serif" }}>
            Heat<span style={{ color: 'var(--color-accent)' }}>map</span>
          </h2>
          <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Visual maturity overview — all controls at a glance</p>
        </div>
        <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border-dim)' }}>
          {(['function', 'category'] as const).map(mode => (
            <button key={mode} onClick={() => setGroupBy(mode)} className="text-[10px] px-2.5 py-1 rounded-md font-medium uppercase tracking-wider" style={{
              background: groupBy === mode ? 'var(--color-accent-dim)' : 'transparent',
              color: groupBy === mode ? 'var(--color-accent)' : 'var(--color-text-muted)',
              border: groupBy === mode ? '1px solid rgba(34,211,238,0.15)' : '1px solid transparent',
            }}>
              By {mode === 'function' ? 'Domain' : 'Category'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-5">
        {MATURITY_LEGEND.map(item => (
          <div key={item.level} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color, border: '1px solid var(--color-border-default)' }} />
            <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 relative">
        {groupBy === 'function' ? (
          framework.data.map(fn => {
            const allSubs = fn.categories.flatMap(cat => cat.subcategories.map(sub => ({ ...sub, categoryId: cat.id })))
            const colors = functionColors[fn.id]
            return (
              <div key={fn.id} className="rounded-xl p-3" style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-dim)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${colors.bg} text-white`}>{fn.id}</span>
                  <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{fn.name}</span>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>({allSubs.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {allSubs.map(sub => {
                    const data = assessment.subcategories[sub.id]
                    const maturity = data?.maturity || MaturityLevel.NotAssessed
                    return (
                      <button key={sub.id} type="button" aria-label={`${sub.id}: ${MATURITY_LABELS[maturity]}`} className="w-6 h-6 rounded cursor-pointer hover:ring-1 hover:ring-white/30 hover:z-10 focus-visible:ring-2 focus-visible:ring-cyan-400" style={{ backgroundColor: MATURITY_HEX[maturity] }}
                        onClick={() => onNavigate(`category/${sub.categoryId}`)}
                        onMouseEnter={e => { const rect = e.currentTarget.getBoundingClientRect(); setTooltip({ id: sub.id, description: sub.description, maturity: MATURITY_LABELS[maturity], priority: data?.priority ? data.priority.charAt(0).toUpperCase() + data.priority.slice(1) : 'Not Set', x: rect.left + rect.width / 2, y: rect.top - 8 }) }}
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={e => { const rect = e.currentTarget.getBoundingClientRect(); setTooltip({ id: sub.id, description: sub.description, maturity: MATURITY_LABELS[maturity], priority: data?.priority ? data.priority.charAt(0).toUpperCase() + data.priority.slice(1) : 'Not Set', x: rect.left + rect.width / 2, y: rect.top - 8 }) }}
                        onBlur={() => setTooltip(null)}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })
        ) : (
          framework.data.map(fn => {
            const colors = functionColors[fn.id]
            return (
              <div key={fn.id}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${colors.bg} text-white`}>{fn.id}</span>
                  <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{fn.name}</span>
                </div>
                <div className="space-y-1.5 ml-2">
                  {fn.categories.map(cat => (
                    <div key={cat.id} className="rounded-lg p-2.5 flex items-center gap-3" style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-dim)' }}>
                      <span className="text-[10px] font-mono font-medium w-16 shrink-0" style={{ color: 'var(--color-text-muted)' }}>{cat.id}</span>
                      <span className="text-[11px] w-44 shrink-0 truncate" style={{ color: 'var(--color-text-muted)' }}>{cat.name}</span>
                      <div className="flex flex-wrap gap-1">
                        {cat.subcategories.map(sub => {
                          const data = assessment.subcategories[sub.id]
                          const maturity = data?.maturity || MaturityLevel.NotAssessed
                          return (
                            <button key={sub.id} type="button" aria-label={`${sub.id}: ${MATURITY_LABELS[maturity]}`} className="w-6 h-6 rounded cursor-pointer hover:ring-1 hover:ring-white/30 hover:z-10 focus-visible:ring-2 focus-visible:ring-cyan-400" style={{ backgroundColor: MATURITY_HEX[maturity] }}
                              onClick={() => onNavigate(`category/${cat.id}`)}
                              onMouseEnter={e => { const rect = e.currentTarget.getBoundingClientRect(); setTooltip({ id: sub.id, description: sub.description, maturity: MATURITY_LABELS[maturity], priority: data?.priority ? data.priority.charAt(0).toUpperCase() + data.priority.slice(1) : 'Not Set', x: rect.left + rect.width / 2, y: rect.top - 8 }) }}
                              onMouseLeave={() => setTooltip(null)}
                            />
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })
        )}

        {tooltip && (
          <div className="fixed z-50 rounded-lg px-3 py-2 text-xs pointer-events-none max-w-xs" style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -100%)', background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-bright)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
            <p className="font-mono font-bold" style={{ color: 'var(--color-accent)' }}>{tooltip.id}</p>
            <p className="mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{tooltip.description}</p>
            <div className="flex gap-3 mt-1" style={{ color: 'var(--color-text-muted)' }}>
              <span>Maturity: <span style={{ color: 'var(--color-text-primary)' }}>{tooltip.maturity}</span></span>
              <span>Priority: <span style={{ color: 'var(--color-text-primary)' }}>{tooltip.priority}</span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
