import { useState } from 'react'
import { useAssessment } from '../../store/assessment-store'
import { useFramework } from '../../store/framework-context'
import { MaturityLevel, MATURITY_LABELS, MATURITY_HEX, PRIORITY_LABELS, getFunctionColors } from '../../types/assessment'
import { AssessmentModal } from '../cross-map/AssessmentModal'

const MATURITY_LEGEND: { level: MaturityLevel; label: string; color: string }[] = [
  { level: MaturityLevel.NotAssessed, label: 'Not Assessed', color: '#cbd5e1' },
  { level: MaturityLevel.AdHoc, label: 'Ad-Hoc', color: '#ef4444' },
  { level: MaturityLevel.Repeatable, label: 'Repeatable', color: '#f59e0b' },
  { level: MaturityLevel.Defined, label: 'Defined', color: '#eab308' },
  { level: MaturityLevel.Managed, label: 'Managed', color: '#0284c7' },
  { level: MaturityLevel.Optimized, label: 'Optimized', color: '#059669' },
]

interface TooltipData {
  id: string
  description: string
  maturity: MaturityLevel
  priority: string
  x: number
  y: number
}

function buildTooltipData(sub: { id: string; description: string }, data: any, rect: DOMRect): TooltipData {
  const maturity = data?.maturity || MaturityLevel.NotAssessed
  const priority = data?.priority ? PRIORITY_LABELS[data.priority as keyof typeof PRIORITY_LABELS] || data.priority : 'Not Set'
  return {
    id: sub.id,
    description: sub.description,
    maturity,
    priority,
    x: rect.left + rect.width / 2,
    y: rect.top - 8,
  }
}

export function HeatmapView({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { assessment } = useAssessment()
  const { framework } = useFramework()
  const functionColors = getFunctionColors(framework)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [groupBy, setGroupBy] = useState<'function' | 'category'>('function')
  const [modalControl, setModalControl] = useState<{ id: string; description: string } | null>(null)

  return (
    <div className="p-4 sm:p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="type-page-title" style={{ color: 'var(--color-text-primary)' }}>
            Heat<span style={{ color: 'var(--color-accent)' }}>map</span>
          </h2>
          <p className="type-mono-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Visual maturity overview — all controls at a glance</p>
        </div>
        <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border-dim)' }}>
          {(['function', 'category'] as const).map(mode => (
            <button key={mode} onClick={() => setGroupBy(mode)} className="type-label px-2.5 py-1 rounded-md" style={{
              background: groupBy === mode ? 'var(--color-accent-dim)' : 'transparent',
              color: groupBy === mode ? 'var(--color-accent)' : 'var(--color-text-muted)',
              border: groupBy === mode ? '1px solid rgba(34,211,238,0.15)' : '1px solid transparent',
            }}>
              By {mode === 'function' ? 'Domain' : 'Category'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
        {MATURITY_LEGEND.map(item => (
          <div key={item.level} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color, border: '1px solid var(--color-border-default)' }} />
            <span className="type-2xs type-mono" style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 relative">
        {groupBy === 'function' ? (
          framework.data.map(fn => {
            const colors = functionColors[fn.id]
            return (
              <div key={fn.id} className="rounded-xl p-3" style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-dim)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`type-2xs type-mono font-semibold px-1.5 py-0.5 rounded ${colors.bg} text-white`}>{fn.id}</span>
                  <span className="type-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{fn.name}</span>
                  <span className="type-2xs type-mono" style={{ color: 'var(--color-text-muted)' }}>({fn.categories.reduce((s, c) => s + c.subcategories.length, 0)})</span>
                </div>
                {/* Category-grouped cells with separators */}
                <div className="flex flex-wrap items-center gap-y-1">
                  {fn.categories.map((cat, catIdx) => (
                    <div key={cat.id} className="flex items-center">
                      <div className="flex gap-0.5">
                        {cat.subcategories.map(sub => {
                          const data = assessment.subcategories[sub.id]
                          const maturity = data?.maturity || MaturityLevel.NotAssessed
                          return (
                            <button key={sub.id} type="button" aria-label={`${sub.id}: ${MATURITY_LABELS[maturity]}`} className="w-6 h-6 sm:w-7 sm:h-7 rounded cursor-pointer hover:ring-2 hover:ring-slate-400 hover:z-10 focus-visible:ring-2 focus-visible:ring-cyan-400" style={{ backgroundColor: MATURITY_HEX[maturity] }}
                              onClick={() => { setTooltip(null); setModalControl({ id: sub.id, description: sub.description }) }}
                              onMouseEnter={e => setTooltip(buildTooltipData(sub, data, e.currentTarget.getBoundingClientRect()))}
                              onMouseLeave={() => setTooltip(null)}
                              onFocus={e => setTooltip(buildTooltipData(sub, data, e.currentTarget.getBoundingClientRect()))}
                              onBlur={() => setTooltip(null)}
                            />
                          )
                        })}
                      </div>
                      {/* Category separator */}
                      {catIdx < fn.categories.length - 1 && (
                        <div className="w-px h-5 mx-1.5 shrink-0" style={{ background: 'var(--color-border-default)' }} />
                      )}
                    </div>
                  ))}
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
                  <span className={`type-2xs type-mono font-semibold px-1.5 py-0.5 rounded ${colors.bg} text-white`}>{fn.id}</span>
                  <span className="type-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{fn.name}</span>
                </div>
                <div className="space-y-1.5 ml-2">
                  {fn.categories.map(cat => (
                    <div key={cat.id} className="rounded-lg p-2.5 flex items-center gap-3" style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-dim)' }}>
                      <span className="type-2xs type-mono font-medium w-16 shrink-0" style={{ color: 'var(--color-text-muted)' }}>{cat.id}</span>
                      <span className="type-xs w-44 shrink-0 truncate" style={{ color: 'var(--color-text-muted)' }}>{cat.name}</span>
                      <div className="flex flex-wrap gap-0.5">
                        {cat.subcategories.map(sub => {
                          const data = assessment.subcategories[sub.id]
                          const maturity = data?.maturity || MaturityLevel.NotAssessed
                          return (
                            <button key={sub.id} type="button" aria-label={`${sub.id}: ${MATURITY_LABELS[maturity]}`} className="w-6 h-6 sm:w-7 sm:h-7 rounded cursor-pointer hover:ring-2 hover:ring-slate-400 hover:z-10 focus-visible:ring-2 focus-visible:ring-cyan-400" style={{ backgroundColor: MATURITY_HEX[maturity] }}
                              onClick={() => { setTooltip(null); setModalControl({ id: sub.id, description: sub.description }) }}
                              onMouseEnter={e => setTooltip(buildTooltipData(sub, data, e.currentTarget.getBoundingClientRect()))}
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

        {/* Enhanced tooltip */}
        {tooltip && (
          <div className="fixed z-50 rounded-lg pointer-events-none animate-tooltip-in" style={{ left: tooltip.x, top: tooltip.y, background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-bright)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', minWidth: '200px', maxWidth: '280px' }}>
            <div className="px-3 py-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="type-sm type-mono font-semibold" style={{ color: 'var(--color-accent)' }}>{tooltip.id}</span>
                <span className="type-2xs px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: MATURITY_HEX[tooltip.maturity], color: tooltip.maturity === MaturityLevel.NotAssessed ? 'var(--color-text-secondary)' : '#fff' }}>
                  {MATURITY_LABELS[tooltip.maturity]}
                </span>
              </div>
              <p className="type-2xs" style={{ color: 'var(--color-text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{tooltip.description}</p>
              <div className="flex items-center gap-2 mt-1.5 pt-1.5" style={{ borderTop: '1px solid var(--color-border-dim)' }}>
                <span className="type-2xs" style={{ color: 'var(--color-text-muted)' }}>Priority:</span>
                <span className="type-2xs font-medium" style={{ color: 'var(--color-text-primary)' }}>{tooltip.priority}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {modalControl && (
        <AssessmentModal
          controlId={modalControl.id}
          frameworkId={framework.id}
          description={modalControl.description}
          frameworkName={framework.name}
          onClose={() => setModalControl(null)}
        />
      )}
    </div>
  )
}
