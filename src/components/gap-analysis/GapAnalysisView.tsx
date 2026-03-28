import { useMemo, useState } from 'react'
import { ArrowUpDown, HelpCircle, Search } from 'lucide-react'
import { useAssessment } from '../../store/assessment-store'
import { useFramework } from '../../store/framework-context'
import { AssessmentModal } from '../cross-map/AssessmentModal'
import {
  MaturityLevel, Priority,
  MATURITY_LABELS, MATURITY_COLORS, MATURITY_NUMERIC,
  PRIORITY_LABELS, PRIORITY_COLORS,
  getFunctionColors,
} from '../../types/assessment'

const PRIORITY_WEIGHT: Record<Priority, number> = {
  [Priority.High]: 5, [Priority.Next]: 4, [Priority.Working]: 3, [Priority.Med]: 2, [Priority.Low]: 1, [Priority.NotSet]: 0,
}

interface GapRow {
  id: string; description: string; functionId: string; functionName: string; categoryId: string
  maturity: MaturityLevel; priority: Priority; gapScore: number; hasPlan: boolean; planText: string; compensating: boolean
}

export function GapAnalysisView({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { assessment } = useAssessment()
  const { framework } = useFramework()
  const functionColors = getFunctionColors(framework)
  const [filterFunction, setFilterFunction] = useState<string>('all')
  const [filterMaturity, setFilterMaturity] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [sortField, setSortField] = useState<'gapScore' | 'maturity' | 'priority' | 'id'>('gapScore')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [modalControl, setModalControl] = useState<{ id: string; description: string } | null>(null)

  const allRows = useMemo((): GapRow[] => {
    return framework.data.flatMap(fn =>
      fn.categories.flatMap(cat =>
        cat.subcategories.map(sub => {
          const data = assessment.subcategories[sub.id]
          const maturityScore = MATURITY_NUMERIC[data?.maturity || MaturityLevel.NotAssessed]
          const priorityScore = PRIORITY_WEIGHT[data?.priority || Priority.NotSet]
          return {
            id: sub.id, description: sub.description, functionId: fn.id, functionName: fn.name, categoryId: cat.id,
            maturity: data?.maturity || MaturityLevel.NotAssessed, priority: data?.priority || Priority.NotSet,
            gapScore: (5 - maturityScore) * (priorityScore + 1), hasPlan: (data?.plan || '').trim().length > 0, planText: (data?.plan || '').trim(), compensating: data?.compensating || false,
          }
        })
      )
    )
  }, [assessment, framework])

  const filtered = useMemo(() => {
    let rows = allRows
    if (filterFunction !== 'all') rows = rows.filter(r => r.functionId === filterFunction)
    if (filterMaturity !== 'all') rows = rows.filter(r => r.maturity === filterMaturity)
    if (filterPriority !== 'all') rows = rows.filter(r => r.priority === filterPriority)
    rows.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'gapScore': cmp = a.gapScore - b.gapScore; break
        case 'maturity': cmp = MATURITY_NUMERIC[a.maturity] - MATURITY_NUMERIC[b.maturity]; break
        case 'priority': cmp = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]; break
        case 'id': cmp = a.id.localeCompare(b.id); break
      }
      return sortDir === 'desc' ? -cmp : cmp
    })
    return rows
  }, [allRows, filterFunction, filterMaturity, filterPriority, sortField, sortDir])

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('desc') }
  }

  const getRowStyle = (row: GapRow) => {
    if (row.priority === Priority.High && MATURITY_NUMERIC[row.maturity] <= 1)
      return { background: 'var(--color-danger-dim)' }
    if (row.priority === Priority.High || MATURITY_NUMERIC[row.maturity] <= 1)
      return { background: 'var(--color-warning-dim)' }
    return {}
  }

  const selectStyle = { background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }

  return (
    <div className="p-4 sm:p-6 max-w-6xl">
      <div className="mb-6">
        <h2 className="type-page-title" style={{ color: 'var(--color-text-primary)' }}>
          Gap <span style={{ color: 'var(--color-accent)' }}>Analysis</span>
        </h2>
        <p className="type-mono-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          {filtered.length} of {allRows.length} controls — sorted by gap severity
        </p>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        {[
          { value: filterFunction, set: setFilterFunction, label: 'Filter by domain', options: [['all', 'All Domains'], ...framework.data.map(fn => [fn.id, `${fn.id} — ${fn.name}`])] },
          { value: filterMaturity, set: setFilterMaturity, label: 'Filter by maturity', options: [['all', 'All Maturity'], ...Object.entries(MATURITY_LABELS)] },
          { value: filterPriority, set: setFilterPriority, label: 'Filter by priority', options: [['all', 'All Priorities'], ...Object.entries(PRIORITY_LABELS)] },
        ].map((filter, i) => (
          <select key={i} value={filter.value} onChange={e => filter.set(e.target.value)} aria-label={filter.label} className="type-sm rounded-lg px-2.5 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" style={selectStyle}>
            {filter.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block rounded-xl overflow-x-auto" style={{ border: '1px solid var(--color-border-dim)' }}>
        <table className="w-full type-sm">
          <thead>
            <tr style={{ background: 'var(--color-surface-raised)', borderBottom: '1px solid var(--color-border-dim)' }}>
              {[
                { label: 'Control', field: 'id' as const, align: 'left' },
                { label: 'Description', field: null, align: 'left' },
                { label: 'Domain', field: null, align: 'left' },
                { label: 'Maturity', field: 'maturity' as const, align: 'center' },
                { label: 'Priority', field: 'priority' as const, align: 'center' },
                { label: 'Gap', field: 'gapScore' as const, align: 'center', tooltip: true },
                { label: 'Plan', field: null, align: 'center' },
              ].map((col, i) => (
                <th key={i} scope="col" className={`px-3 py-2.5 font-medium ${col.field ? 'cursor-pointer hover:opacity-80' : ''}`} style={{ color: 'var(--color-text-muted)', textAlign: col.align as any }} onClick={col.field ? () => toggleSort(col.field!) : undefined} onKeyDown={col.field ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSort(col.field!) } } : undefined} tabIndex={col.field ? 0 : undefined} aria-sort={col.field && sortField === col.field ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}>
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.field && <ArrowUpDown className="w-2.5 h-2.5" aria-hidden="true" />}
                    {col.tooltip && <span title="Gap = (5 − maturity) × (priority + 1). Higher = more urgent."><HelpCircle className="w-3 h-3" aria-hidden="true" style={{ opacity: 0.4 }} /></span>}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="cursor-pointer hover:opacity-80" style={{ ...getRowStyle(row), borderBottom: '1px solid var(--color-border-dim)' }} onClick={() => setModalControl({ id: row.id, description: row.description })} onKeyDown={e => { if (e.key === 'Enter') setModalControl({ id: row.id, description: row.description }) }} tabIndex={0} role="button" aria-label={`${row.id}: ${row.description}, maturity ${MATURITY_LABELS[row.maturity]}, priority ${PRIORITY_LABELS[row.priority]}`}>
                <td className="px-3 py-2 type-mono font-semibold whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>{row.id}</td>
                <td className="px-3 py-2 max-w-md truncate" style={{ color: 'var(--color-text-muted)' }}>{row.description}</td>
                <td className="px-3 py-2">
                  <span className={`type-2xs px-1.5 py-0.5 rounded type-mono font-medium ${functionColors[row.functionId]?.bg || 'bg-slate-600'} text-white`}>{row.functionId}</span>
                </td>
                <td className="px-3 py-2 text-center"><span className={`type-2xs px-2 py-0.5 rounded-full ${MATURITY_COLORS[row.maturity]}`}>{MATURITY_LABELS[row.maturity]}</span></td>
                <td className="px-3 py-2 text-center"><span className={`type-2xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[row.priority]}`}>{PRIORITY_LABELS[row.priority]}</span></td>
                <td className="px-3 py-2 text-center type-mono font-semibold" style={{ color: row.gapScore >= 20 ? 'var(--color-danger)' : 'var(--color-text-secondary)' }}>{row.gapScore}</td>
                <td className="px-3 py-2 text-center">
                  <span className="inline-flex items-center gap-1" title={row.planText || undefined}>
                    {row.hasPlan ? <span style={{ color: 'var(--color-success)' }}>Yes</span> : <span style={{ color: 'var(--color-text-muted)' }}>—</span>}
                    {row.compensating && <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4f46e5' }} title="Compensating control" />}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="sm:hidden space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-xl p-6 text-center" style={{ background: 'var(--color-surface-card)', border: '1px dashed var(--color-border-default)' }}>
            <Search className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--color-text-muted)' }} />
            <p className="type-sm" style={{ color: 'var(--color-text-muted)' }}>No controls match your filters.</p>
          </div>
        ) : filtered.map(row => (
          <button
            key={row.id}
            onClick={() => setModalControl({ id: row.id, description: row.description })}
            className="w-full text-left rounded-lg p-3 space-y-1.5"
            style={{ ...getRowStyle(row), background: getRowStyle(row).background || 'var(--color-surface-card)', border: '1px solid var(--color-border-dim)' }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="type-xs type-mono font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{row.id}</span>
                <span className={`type-2xs px-1.5 py-0.5 rounded type-mono font-medium ${functionColors[row.functionId]?.bg || 'bg-slate-600'} text-white`}>{row.functionId}</span>
              </div>
              <span className="type-mono type-xs font-semibold shrink-0" style={{ color: row.gapScore >= 20 ? 'var(--color-danger)' : 'var(--color-text-secondary)' }}>Gap {row.gapScore}</span>
            </div>
            <p className="type-xs" style={{ color: 'var(--color-text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{row.description}</p>
            <div className="flex items-center gap-2">
              <span className={`type-2xs px-2 py-0.5 rounded-full ${MATURITY_COLORS[row.maturity]}`}>{MATURITY_LABELS[row.maturity]}</span>
              <span className={`type-2xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[row.priority]}`}>{PRIORITY_LABELS[row.priority]}</span>
              {row.hasPlan && <span className="type-2xs" style={{ color: 'var(--color-success)' }}>Has plan</span>}
              {row.compensating && <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4f46e5' }} title="Compensating control" />}
            </div>
          </button>
        ))}
      </div>

      {/* Desktop empty state */}
      {filtered.length === 0 && (
        <div className="hidden sm:block rounded-xl p-6 text-center" style={{ background: 'var(--color-surface-card)', border: '1px dashed var(--color-border-default)' }}>
          <Search className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--color-text-muted)' }} />
          <p className="type-sm" style={{ color: 'var(--color-text-muted)' }}>No controls match your filters. Try broadening your criteria.</p>
        </div>
      )}

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
