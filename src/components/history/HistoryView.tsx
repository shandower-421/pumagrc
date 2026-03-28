import { useState, useMemo } from 'react'
import { Camera, Trash2, HelpCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useAssessment, type Snapshot } from '../../store/assessment-store'
import { useFramework } from '../../store/framework-context'
import { MaturityLevel, MATURITY_LABELS, MATURITY_NUMERIC } from '../../types/assessment'

const cardStyle = { background: 'var(--color-surface-card)', border: '1px solid var(--color-border-dim)', borderRadius: '12px' }

export function HistoryView() {
  const { saveSnapshot, deleteSnapshot, getSnapshots, assessment } = useAssessment()
  const { framework } = useFramework()
  const [snapshots, setSnapshots] = useState<Snapshot[]>(() => getSnapshots())
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [label, setLabel] = useState('')
  const [compareA, setCompareA] = useState<string | null>(null)
  const [compareB, setCompareB] = useState<string | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  const handleSave = () => {
    if (!label.trim()) return
    saveSnapshot(label.trim())
    setSnapshots(getSnapshots())
    setLabel('')
    setShowSaveDialog(false)
  }

  const handleDelete = (id: string) => {
    setPendingDeleteId(id)
  }

  const confirmDelete = () => {
    if (!pendingDeleteId) return
    deleteSnapshot(pendingDeleteId)
    setSnapshots(getSnapshots())
    if (compareA === pendingDeleteId) setCompareA(null)
    if (compareB === pendingDeleteId) setCompareB(null)
    setPendingDeleteId(null)
  }

  const trendData = useMemo(() => {
    return snapshots.map(s => {
      const point: Record<string, any> = { date: new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }), overall: s.avgMaturity }
      for (const fn of framework.data) {
        const subs = fn.categories.flatMap(c => c.subcategories)
        const avg = subs.length > 0 ? subs.reduce((sum, sub) => sum + MATURITY_NUMERIC[s.subcategories[sub.id]?.maturity || MaturityLevel.NotAssessed], 0) / subs.length : 0
        point[fn.id] = Math.round(avg * 100) / 100
      }
      return point
    })
  }, [snapshots, framework])

  const LINE_COLORS = ['#0891b2', '#7c3aed', '#16a34a', '#d97706', '#ea580c', '#dc2626', '#0d9488', '#4f46e5', '#db2777', '#0284c7', '#65a30d', '#e11d48', '#6d28d9', '#059669']

  const comparisonData = useMemo(() => {
    if (!compareA || !compareB) return null
    const snapA = snapshots.find(s => s.id === compareA)
    const snapB = snapshots.find(s => s.id === compareB)
    if (!snapA || !snapB) return null
    const changes: { id: string; description: string; before: string; after: string; improved: boolean }[] = []
    for (const fn of framework.data) {
      for (const cat of fn.categories) {
        for (const sub of cat.subcategories) {
          const matA = snapA.subcategories[sub.id]?.maturity || MaturityLevel.NotAssessed
          const matB = snapB.subcategories[sub.id]?.maturity || MaturityLevel.NotAssessed
          if (matA !== matB) changes.push({ id: sub.id, description: sub.description, before: MATURITY_LABELS[matA], after: MATURITY_LABELS[matB], improved: MATURITY_NUMERIC[matB] > MATURITY_NUMERIC[matA] })
        }
      }
    }
    return { snapA, snapB, changes }
  }, [compareA, compareB, snapshots, framework])

  const currentAssessed = Object.values(assessment.subcategories).filter(v => v.maturity !== MaturityLevel.NotAssessed).length
  const currentTotal = Object.values(assessment.subcategories).length
  const currentAvg = currentTotal > 0 ? Object.values(assessment.subcategories).reduce((sum, v) => sum + MATURITY_NUMERIC[v.maturity], 0) / currentTotal : 0

  return (
    <div className="p-4 sm:p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="type-page-title" style={{ color: 'var(--color-text-primary)' }}>Assessment <span style={{ color: 'var(--color-accent)' }}>History</span></h2>
          <p className="type-mono-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Save snapshots to track maturity improvement over time</p>
        </div>
        <button onClick={() => setShowSaveDialog(true)} className="inline-flex items-center gap-1.5 type-sm font-medium px-3 py-2 rounded-lg" style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', border: '1px solid rgba(34,211,238,0.2)' }}>
          <Camera className="w-4 h-4" aria-hidden="true" /> Save Snapshot
        </button>
      </div>

      <div className="p-4 mb-6" style={cardStyle}>
        <p className="type-label type-mono mb-2" style={{ color: 'var(--color-text-muted)' }}>Current State</p>
        <div className="flex gap-8">
          <div><span className="type-lg font-medium" style={{ color: 'var(--color-accent)' }}>{currentAvg.toFixed(1)}</span> <span className="type-xs" style={{ color: 'var(--color-text-muted)' }}>avg maturity</span></div>
          <div><span className="type-lg font-medium" style={{ color: 'var(--color-text-primary)' }}>{Math.round((currentAssessed / currentTotal) * 100)}%</span> <span className="type-xs" style={{ color: 'var(--color-text-muted)' }}>assessed</span></div>
          <div><span className="type-lg font-medium" style={{ color: 'var(--color-text-primary)' }}>{snapshots.length}</span> <span className="type-xs" style={{ color: 'var(--color-text-muted)' }}>snapshots</span></div>
        </div>
      </div>

      {snapshots.length > 0 && (
        <div className="p-4 mb-6" style={cardStyle}>
          <p className="type-label type-mono mb-4" style={{ color: 'var(--color-text-muted)' }}>Maturity Trend</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-dim)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
              <Tooltip contentStyle={{ background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-default)', borderRadius: 8, color: 'var(--color-text-primary)' }} />
              <Legend />
              <Line type="monotone" dataKey="overall" name="Overall" stroke="#e8eaf0" strokeWidth={2} dot={{ r: 4 }} />
              {framework.data.map((fn, i) => (
                <Line key={fn.id} type="monotone" dataKey={fn.id} name={fn.name} stroke={LINE_COLORS[i % LINE_COLORS.length]} strokeWidth={1} dot={{ r: 2 }} strokeDasharray="4 2" />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {snapshots.length > 0 ? (
        <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid var(--color-border-dim)' }}>
          <table className="w-full type-sm">
            <thead>
              <tr style={{ background: 'var(--color-surface-raised)', borderBottom: '1px solid var(--color-border-dim)' }}>
                <th className="text-left px-3 py-2.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="inline-flex items-center gap-1">Compare <span title="Select A and B to compare two snapshots side by side"><HelpCircle className="w-3 h-3" style={{ opacity: 0.4 }} /></span></span>
                </th>
                <th className="text-left px-3 py-2.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>Date</th>
                <th className="text-left px-3 py-2.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>Label</th>
                <th className="text-center px-3 py-2.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>Avg Maturity</th>
                <th className="text-center px-3 py-2.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>Completion</th>
                <th className="px-3 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {snapshots.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--color-border-dim)' }}>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <label className="type-2xs flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}><input type="radio" name="compareA" checked={compareA === s.id} onChange={() => setCompareA(s.id)} className="accent-cyan-400" /> A</label>
                      <label className="type-2xs flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}><input type="radio" name="compareB" checked={compareB === s.id} onChange={() => setCompareB(s.id)} className="accent-cyan-400" /> B</label>
                    </div>
                  </td>
                  <td className="px-3 py-2 type-mono" style={{ color: 'var(--color-text-muted)' }}>{new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="px-3 py-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>{s.label}</td>
                  <td className="px-3 py-2 text-center type-mono" style={{ color: 'var(--color-accent)' }}>{s.avgMaturity.toFixed(1)}</td>
                  <td className="px-3 py-2 text-center type-mono" style={{ color: 'var(--color-text-secondary)' }}>{Math.round((s.assessed / s.total) * 100)}%</td>
                  <td className="px-3 py-2 text-center"><button onClick={() => handleDelete(s.id)} aria-label={`Delete snapshot ${s.label}`} className="hover:opacity-80" style={{ color: 'var(--color-text-muted)' }}><Trash2 className="w-3.5 h-3.5" aria-hidden="true" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {((compareA && !compareB) || (!compareA && compareB)) && (
            <div className="px-4 py-2 type-2xs" style={{ color: 'var(--color-text-muted)', background: 'var(--color-surface-tint)', borderTop: '1px solid var(--color-border-dim)' }}>
              Select a second snapshot ({compareA ? 'B' : 'A'}) to compare changes.
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl p-8 text-center mb-6" style={{ background: 'var(--color-surface-card)', border: '1px dashed var(--color-border-default)' }}>
          <Camera className="w-8 h-8 mx-auto mb-3" aria-hidden="true" style={{ color: 'var(--color-accent)' }} />
          <p className="type-body font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>Track your compliance journey</p>
          <p className="type-sm mb-4" style={{ color: 'var(--color-text-muted)', maxWidth: '360px', margin: '0 auto' }}>Save snapshots at key milestones to visualize maturity improvement over time. Compare any two snapshots to see exactly what changed.</p>
          <button onClick={() => setShowSaveDialog(true)} className="inline-flex items-center gap-1.5 type-sm font-medium px-4 py-2 rounded-lg" style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-glow)' }}>
            <Camera className="w-3.5 h-3.5" aria-hidden="true" /> Save First Snapshot
          </button>
        </div>
      )}

      {comparisonData && (
        <div className="p-4" style={cardStyle}>
          <p className="type-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>{comparisonData.snapA.label} → {comparisonData.snapB.label}</p>
          <p className="type-2xs type-mono mb-3" style={{ color: 'var(--color-text-muted)' }}>Maturity: {comparisonData.snapA.avgMaturity.toFixed(1)} → {comparisonData.snapB.avgMaturity.toFixed(1)} | {comparisonData.changes.length} changes</p>
          {comparisonData.changes.length > 0 ? (
            <table className="w-full type-sm">
              <thead><tr style={{ borderBottom: '1px solid var(--color-border-dim)' }}>
                <th className="text-left px-3 py-1.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>Control</th>
                <th className="text-left px-3 py-1.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>Description</th>
                <th className="text-center px-3 py-1.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>Before</th>
                <th className="text-center px-3 py-1.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>After</th>
              </tr></thead>
              <tbody>{comparisonData.changes.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border-dim)', background: c.improved ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)' }}>
                  <td className="px-3 py-1.5 type-mono font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{c.id}</td>
                  <td className="px-3 py-1.5 truncate max-w-md" style={{ color: 'var(--color-text-muted)' }}>{c.description}</td>
                  <td className="px-3 py-1.5 text-center" style={{ color: 'var(--color-text-muted)' }}>{c.before}</td>
                  <td className="px-3 py-1.5 text-center font-medium" style={{ color: c.improved ? 'var(--color-success)' : 'var(--color-danger)' }}>{c.after} {c.improved ? '↑' : '↓'}</td>
                </tr>
              ))}</tbody>
            </table>
          ) : <p className="type-sm text-center py-4" style={{ color: 'var(--color-text-muted)' }}>No changes between these snapshots.</p>}
        </div>
      )}

      {/* Delete confirmation */}
      {pendingDeleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in" onClick={() => setPendingDeleteId(null)}>
          <div className="rounded-xl p-6 max-w-xs w-full animate-scale-in" style={{ background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-default)', boxShadow: '0 16px 48px rgba(0,0,0,0.12)' }} onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Delete Snapshot?</h3>
            <p className="type-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
              This will permanently remove "{snapshots.find(s => s.id === pendingDeleteId)?.label}". This cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setPendingDeleteId(null)} className="type-sm px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }}>Cancel</button>
              <button onClick={confirmDelete} className="type-sm px-3 py-1.5 rounded-lg" style={{ background: 'rgba(248, 113, 113, 0.15)', color: 'var(--color-danger)', border: '1px solid rgba(248, 113, 113, 0.3)' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowSaveDialog(false)}>
          <div className="rounded-xl p-6 max-w-sm w-full" style={{ background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-default)', boxShadow: '0 16px 48px rgba(0,0,0,0.12)' }} onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Save Snapshot</h3>
            <p className="type-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>Capture current assessment state for trend tracking.</p>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g., Q1 2026 Assessment" aria-label="Snapshot label" autoFocus onKeyDown={e => e.key === 'Enter' && handleSave()} className="w-full type-sm rounded-lg px-3 py-2 mb-3 focus:outline-none" style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)' }} />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowSaveDialog(false)} className="type-sm px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }}>Cancel</button>
              <button onClick={handleSave} disabled={!label.trim()} className="type-sm px-3 py-1.5 rounded-lg disabled:opacity-50" style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', border: '1px solid rgba(34,211,238,0.2)' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
