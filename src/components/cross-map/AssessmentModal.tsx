import { useState, useEffect, useCallback } from 'react'
import { ShieldCheck } from 'lucide-react'
import { Modal } from '../layout/Modal'
import { useAssessment } from '../../store/assessment-store'
import { ActivityLog } from '../assessment/ActivityLog'
import {
  MaturityLevel, Priority,
  MATURITY_LABELS, MATURITY_DESCRIPTIONS, MATURITY_HEX, MATURITY_NUMERIC,
  PRIORITY_LABELS, PRIORITY_DESCRIPTIONS, PRIORITY_HEX,
  type SubcategoryAssessment,
} from '../../types/assessment'

const inputStyle = {
  background: 'var(--color-surface)',
  color: 'var(--color-text-primary)',
  border: '1px solid var(--color-border-default)',
}

const MATURITY_LEVELS = [
  MaturityLevel.NotAssessed,
  MaturityLevel.AdHoc,
  MaturityLevel.Repeatable,
  MaturityLevel.Defined,
  MaturityLevel.Managed,
  MaturityLevel.Optimized,
]

const PRIORITY_ORDER: Priority[] = [
  Priority.NotSet,
  Priority.High,
  Priority.Med,
  Priority.Low,
  Priority.Next,
  Priority.Working,
]

interface AssessmentModalProps {
  controlId: string
  frameworkId: string
  frameworkName: string
  description: string
  onClose: () => void
}

export function AssessmentModal({ controlId, frameworkId, frameworkName, description, onClose }: AssessmentModalProps) {
  const { setFieldForFramework, getAssessmentForFramework, addLogEntryForFramework, toggleLogResolvedForFramework } = useAssessment()
  const [data, setData] = useState<SubcategoryAssessment>(() => getAssessmentForFramework(frameworkId, controlId))

  useEffect(() => {
    setData(getAssessmentForFramework(frameworkId, controlId))
  }, [controlId, frameworkId, getAssessmentForFramework])

  const handleChange = useCallback((field: keyof SubcategoryAssessment, value: string | boolean) => {
    setData(prev => ({ ...prev, [field]: value }))
    setFieldForFramework(frameworkId, controlId, field, value)
  }, [frameworkId, controlId, setFieldForFramework])

  // Keyboard shortcut: 0-5 sets maturity
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return
      const num = parseInt(e.key)
      if (num >= 0 && num <= 5) {
        const level = MATURITY_LEVELS[num]
        handleChange('maturity', level)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [handleChange])

  return (
    <Modal open onClose={onClose} wide>
      {/* Header */}
      <div className="mb-4">
        <p className="type-2xs font-medium mb-1.5 px-1.5 py-0.5 rounded inline-block" style={{ color: 'var(--color-accent)', background: 'var(--color-accent-dim)' }}>{frameworkName}</p>
        <div className="flex items-center gap-2 mb-1">
          <span className="type-sm type-mono font-semibold" style={{ color: 'var(--color-accent)' }}>{controlId}</span>
          {data.compensating && (
            <span className="type-2xs px-1.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200">
              <ShieldCheck className="w-2.5 h-2.5" /> Compensating
            </span>
          )}
        </div>
        <p className="type-sm" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>
      </div>

      {/* Maturity scale bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <label className="type-label" style={{ color: 'var(--color-text-muted)' }}>Maturity</label>
          <span className="type-2xs" style={{ color: 'var(--color-text-muted)' }}>Press 0-5</span>
        </div>
        <div className="flex gap-1">
          {MATURITY_LEVELS.map((level, i) => {
            const isActive = data.maturity === level
            const score = MATURITY_NUMERIC[level]
            return (
              <button
                key={level}
                onClick={() => handleChange('maturity', level)}
                className="flex-1 py-2 rounded-md type-2xs font-medium text-center transition-all"
                style={{
                  backgroundColor: MATURITY_HEX[level],
                  color: score === 0 ? 'var(--color-text-secondary)' : '#fff',
                  border: isActive ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                  opacity: isActive ? 1 : 0.5,
                  boxShadow: isActive ? '0 0 0 2px var(--color-surface-overlay), 0 0 0 4px var(--color-text-primary)' : 'none',
                }}
                title={MATURITY_DESCRIPTIONS[level]}
              >
                {i === 0 ? 'N/A' : i}
              </button>
            )
          })}
        </div>
        <p className="type-2xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
          {MATURITY_LABELS[data.maturity]} — {MATURITY_DESCRIPTIONS[data.maturity]}
        </p>
      </div>

      {/* Priority scale bar */}
      <div className="mb-4">
        <label className="block type-label mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Priority</label>
        <div className="flex gap-1">
          {PRIORITY_ORDER.map(level => {
            const isActive = data.priority === level
            const isNeutral = level === Priority.NotSet || level === Priority.Low
            return (
              <button
                key={level}
                onClick={() => handleChange('priority', level)}
                className="flex-1 py-2 rounded-md type-2xs font-medium text-center transition-all"
                style={{
                  backgroundColor: PRIORITY_HEX[level],
                  color: isNeutral ? 'var(--color-text-secondary)' : '#fff',
                  border: isActive ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                  opacity: isActive ? 1 : 0.5,
                  boxShadow: isActive ? '0 0 0 2px var(--color-surface-overlay), 0 0 0 4px var(--color-text-primary)' : 'none',
                }}
                title={PRIORITY_DESCRIPTIONS[level]}
              >
                {PRIORITY_LABELS[level]}
              </button>
            )
          })}
        </div>
        <p className="type-2xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
          {PRIORITY_LABELS[data.priority]} — {PRIORITY_DESCRIPTIONS[data.priority]}
        </p>
      </div>

      {/* Compensating control */}
      <label className="flex items-center gap-2 mb-4 px-2 py-2 rounded-lg cursor-pointer" style={{ background: data.compensating ? 'rgba(79,70,229,0.06)' : 'transparent', border: `1px solid ${data.compensating ? 'rgba(79,70,229,0.2)' : 'var(--color-border-dim)'}` }}>
        <input
          type="checkbox"
          checked={data.compensating || false}
          onChange={e => handleChange('compensating', e.target.checked)}
          className="accent-indigo-500 rounded"
        />
        <div>
          <span className="type-sm font-medium" style={{ color: data.compensating ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>Compensating control in place</span>
          <p className="type-2xs" style={{ color: 'var(--color-text-muted)' }}>Gap is addressed by an alternative measure</p>
        </div>
      </label>

      {/* Text fields */}
      <div className="space-y-3">
        {(['proof', 'plan'] as const).map(field => (
          <div key={field}>
            <label className="block type-label mb-1" style={{ color: 'var(--color-text-muted)' }}>{field}</label>
            <textarea
              value={data[field]}
              onChange={e => handleChange(field, e.target.value)}
              placeholder={field === 'proof' ? 'Evidence: policies, screenshots, audit logs, tool configs...' : 'Target state, remediation steps, timeline, owner...'}
              rows={2}
              className="w-full type-sm rounded-lg px-2.5 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 resize-y placeholder:opacity-30"
              style={inputStyle}
            />
          </div>
        ))}

        <ActivityLog
          entries={data.activityLog || []}
          onAdd={text => { addLogEntryForFramework(frameworkId, controlId, text); setData(prev => ({ ...prev, activityLog: [{ id: Date.now().toString(), text, timestamp: new Date().toISOString(), resolved: false }, ...(prev.activityLog || [])] })) }}
          onToggleResolved={entryId => { toggleLogResolvedForFramework(frameworkId, controlId, entryId); setData(prev => ({ ...prev, activityLog: (prev.activityLog || []).map(e => e.id === entryId ? { ...e, resolved: !e.resolved } : e) })) }}
        />
      </div>

      <div className="flex justify-end mt-4">
        <button onClick={onClose} className="type-sm font-medium px-4 py-1.5 rounded-lg" style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-glow)' }}>Done</button>
      </div>
    </Modal>
  )
}
