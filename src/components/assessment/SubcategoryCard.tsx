import { memo, useState, useId } from 'react'
import { ChevronDown, ChevronRight, ShieldCheck } from 'lucide-react'
import { useAssessment } from '../../store/assessment-store'
import { ActivityLog } from './ActivityLog'
import {
  MaturityLevel, Priority,
  MATURITY_LABELS, MATURITY_COLORS, MATURITY_DESCRIPTIONS,
  PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY_DESCRIPTIONS,
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
  const { assessment, setField, addLogEntry, toggleLogResolved } = useAssessment()
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
        <span className={`type-2xs type-mono font-semibold px-1.5 py-0.5 rounded ${functionColor}`}>{id}</span>
        <span className="type-body flex-1 min-w-0" style={{ color: 'var(--color-text-secondary)' }}>{description}</span>
        <span className={`type-2xs px-2 py-0.5 rounded-full font-medium shrink-0 ${MATURITY_COLORS[data.maturity]}`}>
          {MATURITY_LABELS[data.maturity]}
        </span>
        <span className={`type-2xs px-2 py-0.5 rounded-full font-medium shrink-0 ${PRIORITY_COLORS[data.priority]}`}>
          {PRIORITY_LABELS[data.priority]}
        </span>
        {data.compensating && (
          <span className="type-2xs px-1.5 py-0.5 rounded-full font-medium shrink-0 inline-flex items-center gap-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200">
            <ShieldCheck className="w-2.5 h-2.5" />
          </span>
        )}
      </button>

      {isExpanded && (
        <div id={panelId} className="px-4 py-4 space-y-3" style={{ borderTop: '1px solid var(--color-border-dim)', background: 'var(--color-surface-raised)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${id}-maturity`} className="block type-label mb-1" style={{ color: 'var(--color-text-muted)' }}>Maturity</label>
              <select
                id={`${id}-maturity`}
                value={data.maturity}
                onChange={e => handleChange('maturity', e.target.value)}
                className="w-full type-sm rounded-lg px-2.5 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                style={inputStyle}
                title={MATURITY_DESCRIPTIONS[data.maturity]}
              >
                {Object.entries(MATURITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <p className="type-2xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{MATURITY_DESCRIPTIONS[data.maturity]}</p>
            </div>
            <div>
              <label htmlFor={`${id}-priority`} className="block type-label mb-1" style={{ color: 'var(--color-text-muted)' }}>Priority</label>
              <select
                id={`${id}-priority`}
                value={data.priority}
                onChange={e => handleChange('priority', e.target.value)}
                className="w-full type-sm rounded-lg px-2.5 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                style={inputStyle}
                title={PRIORITY_DESCRIPTIONS[data.priority]}
              >
                {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <p className="type-2xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{PRIORITY_DESCRIPTIONS[data.priority]}</p>
            </div>
          </div>

          <label className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer" style={{ background: data.compensating ? 'rgba(79,70,229,0.06)' : 'transparent', border: `1px solid ${data.compensating ? 'rgba(79,70,229,0.2)' : 'var(--color-border-dim)'}` }}>
            <input type="checkbox" checked={data.compensating || false} onChange={e => handleChange('compensating', e.target.checked as any)} className="accent-indigo-500 rounded" />
            <span className="type-2xs font-medium" style={{ color: data.compensating ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>Compensating control in place</span>
          </label>

          {(['proof', 'plan'] as const).map(field => (
            <div key={field}>
              <label htmlFor={`${id}-${field}`} className="block type-label mb-1" style={{ color: 'var(--color-text-muted)' }}>{field}</label>
              <textarea
                id={`${id}-${field}`}
                value={data[field]}
                onChange={e => handleChange(field, e.target.value)}
                placeholder={field === 'proof' ? 'Evidence: policies, screenshots, audit logs, tool configs...' : 'Target state, remediation steps, timeline, owner...'}
                rows={2}
                className="w-full type-sm rounded-lg px-2.5 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 resize-y placeholder:opacity-30"
                style={{ ...inputStyle }}
              />
            </div>
          ))}

          <ActivityLog
            entries={data.activityLog || []}
            onAdd={text => addLogEntry(id, text)}
            onToggleResolved={entryId => toggleLogResolved(id, entryId)}
          />
        </div>
      )}
    </div>
  )
})
