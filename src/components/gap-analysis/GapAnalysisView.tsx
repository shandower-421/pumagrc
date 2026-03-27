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
  [Priority.High]: 5,
  [Priority.Next]: 4,
  [Priority.Working]: 3,
  [Priority.Med]: 2,
  [Priority.Low]: 1,
  [Priority.NotSet]: 0,
}

interface GapRow {
  id: string
  description: string
  functionId: string
  functionName: string
  categoryId: string
  maturity: MaturityLevel
  priority: Priority
  gapScore: number
  hasPlan: boolean
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
          const gapScore = (5 - maturityScore) * (priorityScore + 1)
          return {
            id: sub.id,
            description: sub.description,
            functionId: fn.id,
            functionName: fn.name,
            categoryId: cat.id,
            maturity: data?.maturity || MaturityLevel.NotAssessed,
            priority: data?.priority || Priority.NotSet,
            gapScore,
            hasPlan: (data?.plan || '').trim().length > 0,
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
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const getRowBg = (row: GapRow) => {
    if (row.priority === Priority.High && MATURITY_NUMERIC[row.maturity] <= 1) return 'bg-red-50'
    if (row.priority === Priority.High || MATURITY_NUMERIC[row.maturity] <= 1) return 'bg-amber-50'
    return ''
  }

  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-xl font-semibold text-slate-900 mb-2">Gap Analysis</h2>
      <p className="text-sm text-slate-500 mb-4">
        Controls sorted by gap severity (low maturity + high priority = critical gap). {filtered.length} of {allRows.length} shown.
      </p>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select
          value={filterFunction}
          onChange={e => setFilterFunction(e.target.value)}
          className="text-sm border border-slate-200 rounded-md px-2.5 py-1.5 bg-white"
        >
          <option value="all">All Domains</option>
          {framework.data.map(fn => (
            <option key={fn.id} value={fn.id}>{fn.id} - {fn.name}</option>
          ))}
        </select>
        <select
          value={filterMaturity}
          onChange={e => setFilterMaturity(e.target.value)}
          className="text-sm border border-slate-200 rounded-md px-2.5 py-1.5 bg-white"
        >
          <option value="all">All Maturity</option>
          {Object.entries(MATURITY_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
        <select
          value={filterPriority}
          onChange={e => setFilterPriority(e.target.value)}
          className="text-sm border border-slate-200 rounded-md px-2.5 py-1.5 bg-white"
        >
          <option value="all">All Priorities</option>
          {Object.entries(PRIORITY_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-3 py-2 font-medium text-slate-600 cursor-pointer hover:text-slate-900" onClick={() => toggleSort('id')}>
                <span className="inline-flex items-center gap-1">Control <ArrowUpDown className="w-3 h-3" /></span>
              </th>
              <th className="text-left px-3 py-2 font-medium text-slate-600">Description</th>
              <th className="text-left px-3 py-2 font-medium text-slate-600">Domain</th>
              <th className="text-center px-3 py-2 font-medium text-slate-600 cursor-pointer hover:text-slate-900" onClick={() => toggleSort('maturity')}>
                <span className="inline-flex items-center gap-1">Maturity <ArrowUpDown className="w-3 h-3" /></span>
              </th>
              <th className="text-center px-3 py-2 font-medium text-slate-600 cursor-pointer hover:text-slate-900" onClick={() => toggleSort('priority')}>
                <span className="inline-flex items-center gap-1">Priority <ArrowUpDown className="w-3 h-3" /></span>
              </th>
              <th className="text-center px-3 py-2 font-medium text-slate-600 cursor-pointer hover:text-slate-900" onClick={() => toggleSort('gapScore')}>
                <span className="inline-flex items-center gap-1">Gap <ArrowUpDown className="w-3 h-3" /></span>
              </th>
              <th className="text-center px-3 py-2 font-medium text-slate-600">Plan</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr
                key={row.id}
                className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${getRowBg(row)}`}
                onClick={() => onNavigate(`category/${row.categoryId}`)}
              >
                <td className="px-3 py-2 font-mono text-xs font-semibold text-slate-700">{row.id}</td>
                <td className="px-3 py-2 text-slate-600 max-w-md truncate">{row.description}</td>
                <td className="px-3 py-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${functionColors[row.functionId]?.bg || 'bg-slate-600'} text-white`}>
                    {row.functionId}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${MATURITY_COLORS[row.maturity]}`}>
                    {MATURITY_LABELS[row.maturity]}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[row.priority]}`}>
                    {PRIORITY_LABELS[row.priority]}
                  </span>
                </td>
                <td className="px-3 py-2 text-center font-mono text-xs font-bold text-slate-700">{row.gapScore}</td>
                <td className="px-3 py-2 text-center">
                  {row.hasPlan ? <span className="text-green-500">Yes</span> : <span className="text-slate-300">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
