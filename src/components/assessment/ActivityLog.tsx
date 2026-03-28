import { useState } from 'react'
import { Check, Plus } from 'lucide-react'
import type { LogEntry } from '../../types/assessment'

function timeAgo(timestamp: string): string {
  const now = Date.now()
  const then = new Date(timestamp).getTime()
  const diff = now - then
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })
}

interface ActivityLogProps {
  entries: LogEntry[]
  onAdd: (text: string) => void
  onToggleResolved: (entryId: string) => void
}

export function ActivityLog({ entries, onAdd, onToggleResolved }: ActivityLogProps) {
  const [draft, setDraft] = useState('')

  const handleAdd = () => {
    const text = draft.trim()
    if (!text) return
    onAdd(text)
    setDraft('')
  }

  const resolved = entries.filter(e => e.resolved).length

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="type-label" style={{ color: 'var(--color-text-muted)' }}>Activity Log</label>
        {entries.length > 0 && (
          <span className="type-2xs" style={{ color: 'var(--color-text-muted)' }}>
            {entries.length} {entries.length === 1 ? 'note' : 'notes'}{resolved > 0 && ` (${resolved} resolved)`}
          </span>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-1.5 mb-2">
        <input
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleAdd() }}
          placeholder="Add a note..."
          className="flex-1 type-sm rounded-lg px-2.5 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 placeholder:opacity-30"
          style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)' }}
        />
        <button
          onClick={handleAdd}
          disabled={!draft.trim()}
          className="px-2 py-1.5 rounded-lg disabled:opacity-30"
          style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-glow)' }}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Entries */}
      {entries.length > 0 && (
        <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
          {entries.map(entry => (
            <div
              key={entry.id}
              className="flex items-start gap-2 px-2 py-1.5 rounded-lg group"
              style={{ background: entry.resolved ? 'transparent' : 'var(--color-surface)' }}
            >
              <button
                onClick={() => onToggleResolved(entry.id)}
                className="mt-0.5 shrink-0 w-4 h-4 rounded border flex items-center justify-center"
                style={{
                  borderColor: entry.resolved ? 'var(--color-success)' : 'var(--color-border-bright)',
                  background: entry.resolved ? 'var(--color-success)' : 'transparent',
                  color: entry.resolved ? '#fff' : 'transparent',
                }}
                title={entry.resolved ? 'Mark as unresolved' : 'Mark as resolved'}
              >
                <Check className="w-2.5 h-2.5" />
              </button>
              <div className="flex-1 min-w-0">
                <p
                  className="type-sm"
                  style={{
                    color: entry.resolved ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
                    textDecoration: entry.resolved ? 'line-through' : 'none',
                  }}
                >
                  {entry.text}
                </p>
                <p className="type-2xs" style={{ color: 'var(--color-text-muted)' }}>
                  {timeAgo(entry.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
