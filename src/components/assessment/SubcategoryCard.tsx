import { memo, useState, useId } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useAssessment } from '../../store/assessment-store'
import {
  MaturityLevel, Priority,
  MATURITY_LABELS, MATURITY_COLORS,
  PRIORITY_LABELS, PRIORITY_COLORS,
  type SubcategoryAssessment,
} from '../../types/assessment'

interface SubcategoryCardProps {
  id: string
  description: string
  functionColor: string
}

const inputStyle = {
  background: 'var(--color-surface)',
  color: 'var(--color-text-primary)',
  border: '1px solid var(--color-border-default)',
}

export const SubcategoryCard = memo(function SubcategoryCard({ id, description, functionColor }: SubcategoryCardProps) {
  const { assessment, setField } = useAssessment()
  const data = assessment.subcategories[id] || {
    maturity: MaturityLevel.NotAssessed,
    priority: Priority.NotSet,
    proof: '', plan: '', notes: '',
  }
  const [isExpanded, setIsExpanded] = useState(false)
  const panelId = useId()

  const handleChange = (field: keyof SubcategoryAssessment, value: string) => {
    setField(id, field, value)
  }

  return (
    <div className="rounded-lg overflow-hidden" style={{ background: 'var(--color-surface-card)', border: `1px solid ${data.maturity !== MaturityLevel.NotAssessed ? 'var(--color-border-default)' : 'var(--color-border-dim)'}` }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:opacity-90"
      >
        {isExpanded
          ? <ChevronDown className="w-3.5 h-3.5 shrink-0" aria-hidden="true" style={{ color: 'var(--color-text-muted)' }} />
          : <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" style={{ color: 'var(--color-text-muted)' }} />
        }
        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${functionColor}`}>{id}</span>
        <span className="text-sm flex-1 min-w-0" style={{ color: 'var(--color-text-secondary)' }}>{description}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${MATURITY_COLORS[data.maturity]}`}>
          {MATURITY_LABELS[data.maturity]}
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${PRIORITY_COLORS[data.priority]}`}>
          {PRIORITY_LABELS[data.priority]}
        </span>
      </button>

      {isExpanded && (
        <div id={panelId} className="px-4 pb-4 pt-3 space-y-3" style={{ borderTop: '1px solid var(--color-border-dim)', background: 'var(--color-surface-raised)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${id}-maturity`} className="block text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Maturity</label>
              <select
                id={`${id}-maturity`}
                value={data.maturity}
                onChange={e => handleChange('maturity', e.target.value)}
                className="w-full text-xs rounded-lg px-2.5 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                style={inputStyle}
              >
                {Object.entries(MATURITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-priority`} className="block text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Priority</label>
              <select
                id={`${id}-priority`}
                value={data.priority}
                onChange={e => handleChange('priority', e.target.value)}
                className="w-full text-xs rounded-lg px-2.5 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                style={inputStyle}
              >
                {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {(['proof', 'plan', 'notes'] as const).map(field => (
            <div key={field}>
              <label htmlFor={`${id}-${field}`} className="block text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>{field}</label>
              <textarea
                id={`${id}-${field}`}
                value={data[field]}
                onChange={e => handleChange(field, e.target.value)}
                placeholder={field === 'proof' ? 'Evidence of implementation...' : field === 'plan' ? 'Improvement plan...' : 'Additional notes...'}
                rows={2}
                className="w-full text-xs rounded-lg px-2.5 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 resize-y placeholder:opacity-30"
                style={{ ...inputStyle, fontFamily: field === 'proof' ? "'JetBrains Mono', monospace" : undefined }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
