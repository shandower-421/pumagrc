import { useMemo, useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { useAssessment } from '../../store/assessment-store'
import { useFramework } from '../../store/framework-context'
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
  maturity: MaturityLevel; priority: Priority; gapScore: number; hasPlan: boolean
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
            gapScore: (5 - maturityScore) * (priorityScore + 1), hasPlan: (data?.plan || '').trim().length > 0,
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
      return { background: 'rgba(239, 68, 68, 0.08)' }
    if (row.priority === Priority.High || MATURITY_NUMERIC[row.maturity] <= 1)
      return { background: 'rgba(234, 179, 8, 0.05)' }
    return {}
  }

  const selectStyle = { background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }

  return (
    <div className="p-4 sm:p-6 max-w-6xl">
      <h2 className="text-xl font-light mb-1" style={{ color: 'var(--color-text-primary)', fontFamily: "'Instrument Serif', serif" }}>
        Gap <span style={{ color: 'var(--color-accent)' }}>Analysis</span>
      </h2>
      <p className="text-xs font-mono mb-4" style={{ color: 'var(--color-text-muted)' }}>
        {filtered.length} of {allRows.length} controls — sorted by gap severity
      </p>

      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        {[
          { value: filterFunction, set: setFilterFunction, label: 'Filter by domain', options: [['all', 'All Domains'], ...framework.data.map(fn => [fn.id, `${fn.id} — ${fn.name}`])] },
          { value: filterMaturity, set: setFilterMaturity, label: 'Filter by maturity', options: [['all', 'All Maturity'], ...Object.entries(MATURITY_LABELS)] },
          { value: filterPriority, set: setFilterPriority, label: 'Filter by priority', options: [['all', 'All Priorities'], ...Object.entries(PRIORITY_LABELS)] },
        ].map((filter, i) => (
          <select key={i} value={filter.value} onChange={e => filter.set(e.target.value)} aria-label={filter.label} className="text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" style={selectStyle}>
            {filter.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ))}
      </div>

      <div className="rounded-xl overflow-x-auto" style={{ border: '1px solid var(--color-border-dim)' }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'var(--color-surface-raised)', borderBottom: '1px solid var(--color-border-dim)' }}>
              {[
                { label: 'Control', field: 'id' as const, align: 'left' },
                { label: 'Description', field: null, align: 'left' },
                { label: 'Domain', field: null, align: 'left' },
                { label: 'Maturity', field: 'maturity' as const, align: 'center' },
                { label: 'Priority', field: 'priority' as const, align: 'center' },
                { label: 'Gap', field: 'gapScore' as const, align: 'center' },
                { label: 'Plan', field: null, align: 'center' },
              ].map((col, i) => (
                <th key={i} scope="col" className={`px-3 py-2.5 font-medium ${col.field ? 'cursor-pointer hover:opacity-80' : ''}`} style={{ color: 'var(--color-text-muted)', textAlign: col.align as any }} onClick={col.field ? () => toggleSort(col.field!) : undefined} onKeyDown={col.field ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSort(col.field!) } } : undefined} tabIndex={col.field ? 0 : undefined} aria-sort={col.field && sortField === col.field ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}>
                  <span className="inline-flex items-center gap-1">{col.label} {col.field && <ArrowUpDown className="w-2.5 h-2.5" aria-hidden="true" />}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="cursor-pointer hover:opacity-80" style={{ ...getRowStyle(row), borderBottom: '1px solid var(--color-border-dim)' }} onClick={() => onNavigate(`category/${row.categoryId}`)} onKeyDown={e => { if (e.key === 'Enter') onNavigate(`category/${row.categoryId}`) }} tabIndex={0} role="link" aria-label={`${row.id}: ${row.description}, maturity ${MATURITY_LABELS[row.maturity]}, priority ${PRIORITY_LABELS[row.priority]}`}>
                <td className="px-3 py-2 font-mono font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{row.id}</td>
                <td className="px-3 py-2 max-w-md truncate" style={{ color: 'var(--color-text-muted)' }}>{row.description}</td>
                <td className="px-3 py-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${functionColors[row.functionId]?.bg || 'bg-slate-600'} text-white`}>{row.functionId}</span>
                </td>
                <td className="px-3 py-2 text-center"><span className={`text-[10px] px-2 py-0.5 rounded-full ${MATURITY_COLORS[row.maturity]}`}>{MATURITY_LABELS[row.maturity]}</span></td>
                <td className="px-3 py-2 text-center"><span className={`text-[10px] px-2 py-0.5 rounded-full ${PRIORITY_COLORS[row.priority]}`}>{PRIORITY_LABELS[row.priority]}</span></td>
                <td className="px-3 py-2 text-center font-mono font-bold" style={{ color: row.gapScore >= 20 ? 'var(--color-danger)' : 'var(--color-text-secondary)' }}>{row.gapScore}</td>
                <td className="px-3 py-2 text-center">{row.hasPlan ? <span style={{ color: 'var(--color-success)' }}>Yes</span> : <span style={{ color: 'var(--color-text-muted)' }}>—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
