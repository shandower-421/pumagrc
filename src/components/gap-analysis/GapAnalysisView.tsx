import { useMemo, useState, useCallback, useRef } from 'react'
import { ArrowUpDown, Search } from 'lucide-react'
import { useAssessment } from '../../store/assessment-store'
import { useFramework } from '../../store/framework-context'
import { AssessmentModal } from '../cross-map/AssessmentModal'
import {
  MaturityLevel, Priority, RiskTreatment,
  MATURITY_LABELS, MATURITY_COLORS, MATURITY_NUMERIC,
  PRIORITY_LABELS, PRIORITY_COLORS,
  RISK_TREATMENT_LABELS,
  getFunctionColors,
} from '../../types/assessment'

interface GapRow {
  id: string
  description: string
  functionId: string
  functionName: string
  categoryId: string
  maturity: MaturityLevel
  priority: Priority
  hasPlan: boolean
  planText: string
  compensating: boolean
  likelihood: number
  impact: number
  riskScore: number
  riskLevel: string
  owner: string
  treatment: RiskTreatment
}

function getRiskLevel(score: number): string {
  if (score === 0) return 'Not Assessed'
  if (score >= 20) return 'Critical'
  if (score >= 15) return 'High'
  if (score >= 8) return 'Medium'
  return 'Low'
}

function getRiskLevelColor(level: string): string {
  switch (level) {
    case 'Critical': return 'var(--color-danger)'
    case 'High': return 'var(--color-warning)'
    case 'Medium': return '#b45309'
    case 'Low': return 'var(--color-success)'
    default: return 'var(--color-text-muted)'
  }
}

function getRiskLevelBg(level: string): string {
  switch (level) {
    case 'Critical': return 'bg-red-50 text-red-700'
    case 'High': return 'bg-amber-50 text-amber-700'
    case 'Medium': return 'bg-yellow-50 text-yellow-700'
    case 'Low': return 'bg-emerald-50 text-emerald-700'
    default: return 'bg-slate-100 text-slate-500'
  }
}

const SEVERITY_COLORS: Record<number, { bg: string; activeBg: string; activeText: string }> = {
  0: { bg: 'var(--color-surface-tint)', activeBg: 'var(--color-surface-tint)', activeText: 'var(--color-text-muted)' },
  1: { bg: 'var(--color-surface-tint)', activeBg: '#dcfce7', activeText: '#166534' },
  2: { bg: 'var(--color-surface-tint)', activeBg: '#fef9c3', activeText: '#854d0e' },
  3: { bg: 'var(--color-surface-tint)', activeBg: '#fed7aa', activeText: '#9a3412' },
  4: { bg: 'var(--color-surface-tint)', activeBg: '#fecaca', activeText: '#991b1b' },
  5: { bg: 'var(--color-surface-tint)', activeBg: '#f87171', activeText: '#ffffff' },
}

function RatingBar({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="inline-flex gap-px" role="radiogroup" aria-label={label} onClick={e => e.stopPropagation()}>
      {[1, 2, 3, 4, 5].map(n => {
        const isActive = value === n
        const colors = SEVERITY_COLORS[n]
        return (
          <button
            key={n}
            role="radio"
            aria-checked={isActive}
            aria-label={`${n}`}
            onClick={() => onChange(value === n ? 0 : n)}
            className="type-2xs font-semibold rounded-sm"
            style={{
              width: '16px',
              height: '16px',
              lineHeight: '16px',
              textAlign: 'center',
              background: isActive ? colors.activeBg : colors.bg,
              color: isActive ? colors.activeText : 'var(--color-text-muted)',
              border: isActive ? 'none' : '1px solid var(--color-border-dim)',
              opacity: isActive ? 1 : 0.6,
            }}
          >
            {n}
          </button>
        )
      })}
    </div>
  )
}

const selectStyle = { background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }

const inlineSelectStyle = {
  background: 'transparent',
  color: 'var(--color-text-secondary)',
  border: '1px solid var(--color-border-dim)',
  fontSize: 'var(--text-2xs)',
  lineHeight: '1',
  padding: '1px 18px 1px 3px',
  borderRadius: '3px',
  backgroundPosition: 'right 2px center',
}

const inlineInputStyle = {
  background: 'transparent',
  color: 'var(--color-text-secondary)',
  border: '1px solid var(--color-border-dim)',
  fontSize: 'var(--text-2xs)',
  lineHeight: '1',
  padding: '1px 3px',
  borderRadius: '3px',
  width: '72px',
}

type SortField = 'riskScore' | 'maturity' | 'priority' | 'likelihood' | 'impact' | 'id'
type ViewMode = 'gap' | 'risk' | 'all'

export function GapAnalysisView() {
  const { assessment, setField } = useAssessment()
  const { framework } = useFramework()
  const functionColors = getFunctionColors(framework)
  const [viewMode, setViewMode] = useState<ViewMode>('all')
  const [filterFunction, setFilterFunction] = useState<string>('all')
  const [filterMaturity, setFilterMaturity] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>('all')
  const [filterTreatment, setFilterTreatment] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [modalControl, setModalControl] = useState<{ id: string; description: string } | null>(null)
  const [descWidth, setDescWidth] = useState(280)
  const dragRef = useRef<{ startX: number; startWidth: number } | null>(null)

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startWidth = descWidth
    dragRef.current = { startX, startWidth }

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return
      const delta = ev.clientX - dragRef.current.startX
      setDescWidth(Math.max(80, Math.min(600, dragRef.current.startWidth + delta)))
    }
    const onUp = () => {
      dragRef.current = null
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [descWidth])

  const showGap = viewMode === 'gap' || viewMode === 'all'
  const showRisk = viewMode === 'risk' || viewMode === 'all'

  const allRows = useMemo((): GapRow[] => {
    return framework.data.flatMap(fn =>
      fn.categories.flatMap(cat =>
        cat.subcategories.map(sub => {
          const data = assessment.subcategories[sub.id]
          const maturity = data?.maturity || MaturityLevel.NotAssessed
          const priority = data?.priority || Priority.NotSet
          const likelihood = data?.riskLikelihood || 0
          const impact = data?.riskImpact || 0
          const riskScore = likelihood * impact
          return {
            id: sub.id, description: sub.description, functionId: fn.id, functionName: fn.name, categoryId: cat.id,
            maturity, priority,
            hasPlan: (data?.plan || '').trim().length > 0, planText: (data?.plan || '').trim(), compensating: data?.compensating || false,
            likelihood, impact, riskScore, riskLevel: getRiskLevel(riskScore),
            owner: data?.riskOwner || '',
            treatment: data?.riskTreatment || RiskTreatment.NotSet,
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
    if (filterRiskLevel !== 'all') rows = rows.filter(r => r.riskLevel === filterRiskLevel)
    if (filterTreatment !== 'all') rows = rows.filter(r => r.treatment === filterTreatment)
    rows = [...rows].sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'riskScore': cmp = a.riskScore - b.riskScore; break
        case 'maturity': cmp = MATURITY_NUMERIC[a.maturity] - MATURITY_NUMERIC[b.maturity]; break
        case 'priority': cmp = Object.values(Priority).indexOf(a.priority) - Object.values(Priority).indexOf(b.priority); break
        case 'likelihood': cmp = a.likelihood - b.likelihood; break
        case 'impact': cmp = a.impact - b.impact; break
        case 'id': cmp = a.id.localeCompare(b.id); break
      }
      return sortDir === 'desc' ? -cmp : cmp
    })
    return rows
  }, [allRows, filterFunction, filterMaturity, filterPriority, filterRiskLevel, filterTreatment, sortField, sortDir])

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('desc') }
  }

  const getRowStyle = (row: GapRow) => {
    if (row.riskLevel === 'Critical') return { background: 'var(--color-danger-dim)' }
    if (row.priority === Priority.High && MATURITY_NUMERIC[row.maturity] <= 1)
      return { background: 'var(--color-danger-dim)' }
    if (row.riskLevel === 'High' || row.priority === Priority.High || MATURITY_NUMERIC[row.maturity] <= 1)
      return { background: 'var(--color-warning-dim)' }
    return {}
  }

  const handleInlineChange = (controlId: string, field: string, value: string | number) => {
    setField(controlId, field as any, value)
  }

  const viewModeToggleStyle = (mode: ViewMode) => ({
    background: viewMode === mode ? 'var(--color-accent)' : 'transparent',
    color: viewMode === mode ? '#ffffff' : 'var(--color-text-muted)',
    border: viewMode === mode ? 'none' : '1px solid transparent',
  })

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="type-page-title" style={{ color: 'var(--color-text-primary)' }}>
          Gap <span style={{ color: 'var(--color-accent)' }}>&amp; Risk</span>
        </h2>
        <p className="type-mono-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          {filtered.length} of {allRows.length} controls — click any row to edit assessment details
        </p>
      </div>

      {/* View toggle + Filters */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
        <div className="flex gap-0.5 p-0.5 rounded-lg shrink-0" style={{ background: 'var(--color-accent-dim)', border: '1px solid var(--color-accent-glow)' }} role="radiogroup" aria-label="View mode">
          {([
            { mode: 'gap' as ViewMode, label: 'Gap' },
            { mode: 'risk' as ViewMode, label: 'Risk' },
            { mode: 'all' as ViewMode, label: 'All' },
          ]).map(v => (
            <button
              key={v.mode}
              role="radio"
              aria-checked={viewMode === v.mode}
              onClick={() => setViewMode(v.mode)}
              className="type-sm font-medium px-3 py-1 rounded-md"
              style={viewModeToggleStyle(v.mode)}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="w-px h-5 hidden sm:block" style={{ background: 'var(--color-border-dim)' }} />
        {[
          { value: filterFunction, set: setFilterFunction, label: 'Filter by domain', options: [['all', 'All Domains'], ...framework.data.map(fn => [fn.id, `${fn.id} — ${fn.name}`])], show: true },
          { value: filterMaturity, set: setFilterMaturity, label: 'Filter by maturity', options: [['all', 'All Maturity'], ...Object.entries(MATURITY_LABELS)], show: true },
          { value: filterPriority, set: setFilterPriority, label: 'Filter by priority', options: [['all', 'All Priorities'], ...Object.entries(PRIORITY_LABELS)], show: showGap },
          { value: filterRiskLevel, set: setFilterRiskLevel, label: 'Filter by risk level', options: [['all', 'All Risk Levels'], ['Critical', 'Critical'], ['High', 'High'], ['Medium', 'Medium'], ['Low', 'Low'], ['Not Assessed', 'Not Assessed']], show: showRisk },
          { value: filterTreatment, set: setFilterTreatment, label: 'Filter by treatment', options: [['all', 'All Treatments'], ...Object.entries(RISK_TREATMENT_LABELS)], show: showRisk },
        ].filter(f => f.show).map((filter, i) => (
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
                { label: 'Control', field: 'id' as SortField, align: 'left', tooltip: 'Framework control identifier', show: true },
                { label: 'Description', field: null, align: 'left', tooltip: 'Control description — drag right edge to resize', show: true, resizable: true },
                { label: 'Domain', field: null, align: 'left', tooltip: 'Framework function or domain', show: false },
                { label: 'Maturity', field: 'maturity' as SortField, align: 'center', tooltip: 'Current maturity level (0-5)', show: showGap },
                { label: 'Priority', field: 'priority' as SortField, align: 'center', tooltip: 'Remediation priority', show: showGap },
                { label: 'L', field: 'likelihood' as SortField, align: 'center', tooltip: 'Likelihood of occurrence (1 = rare, 5 = almost certain)', show: showRisk },
                { label: 'I', field: 'impact' as SortField, align: 'center', tooltip: 'Impact if realized (1 = negligible, 5 = catastrophic)', show: showRisk },
                { label: 'Risk', field: 'riskScore' as SortField, align: 'center', tooltip: 'Risk Score = Likelihood × Impact (1-25). Higher = more urgent.', show: showRisk },
                { label: 'Level', field: null, align: 'center', tooltip: 'Critical (20-25), High (15-19), Medium (8-14), Low (1-7)', show: showRisk },
                { label: 'Owner', field: null, align: 'left', tooltip: 'Person or team responsible for managing this risk', show: showRisk },
                { label: 'Treatment', field: null, align: 'left', tooltip: 'Risk treatment: Accept, Mitigate, Transfer, or Avoid', show: showRisk },
                { label: 'Plan', field: null, align: 'center', tooltip: 'Whether a remediation plan has been documented', show: showGap },
              ].filter(col => col.show).map((col, i) => (
                <th key={i} scope="col" className={`px-2 py-2.5 font-medium relative ${col.field ? 'cursor-pointer hover:opacity-80' : ''}`} style={{ color: 'var(--color-text-muted)', textAlign: col.align as any, ...(col.resizable ? { width: descWidth, minWidth: 80, maxWidth: 600 } : {}) }} title={col.tooltip} onClick={col.field ? () => toggleSort(col.field!) : undefined} onKeyDown={col.field ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSort(col.field!) } } : undefined} tabIndex={col.field ? 0 : undefined} aria-sort={col.field && sortField === col.field ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}>
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.field && <ArrowUpDown className="w-2.5 h-2.5" aria-hidden="true" />}
                  </span>
                  {col.resizable && (
                    <span
                      onMouseDown={onResizeStart}
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[var(--color-accent)]"
                      style={{ opacity: 0.3 }}
                      aria-hidden="true"
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="cursor-pointer hover:opacity-80" style={{ ...getRowStyle(row), borderBottom: '1px solid var(--color-border-dim)' }} onClick={() => setModalControl({ id: row.id, description: row.description })} onKeyDown={e => { if (e.key === 'Enter') setModalControl({ id: row.id, description: row.description }) }} tabIndex={0} role="button" aria-label={`${row.id}: ${row.description}`}>
                <td className="px-3 py-2 type-mono font-semibold whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>{row.id}</td>
                <td className="px-3 py-2 truncate" style={{ color: 'var(--color-text-muted)', maxWidth: descWidth }}>{row.description}</td>
                {false && <td className="px-3 py-2">
                  <span className={`type-2xs px-1.5 py-0.5 rounded type-mono font-medium ${functionColors[row.functionId]?.bg || 'bg-slate-600'} text-white`}>{row.functionId}</span>
                </td>}
                {showGap && <td className="px-2 py-2 text-center whitespace-nowrap"><span className={`type-2xs px-2 py-0.5 rounded-full ${MATURITY_COLORS[row.maturity]}`}>{MATURITY_LABELS[row.maturity]}</span></td>}
                {showGap && <td className="px-2 py-2 text-center"><span className={`type-2xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[row.priority]}`}>{PRIORITY_LABELS[row.priority]}</span></td>}
                {showRisk && <td className="px-2 py-2 text-center">
                  <RatingBar value={row.likelihood} onChange={v => handleInlineChange(row.id, 'riskLikelihood', v)} label={`Likelihood for ${row.id}`} />
                </td>}
                {showRisk && <td className="px-2 py-2 text-center">
                  <RatingBar value={row.impact} onChange={v => handleInlineChange(row.id, 'riskImpact', v)} label={`Impact for ${row.id}`} />
                </td>}
                {showRisk && <td className="px-2 py-2 text-center type-mono font-semibold" style={{ color: getRiskLevelColor(row.riskLevel) }}>
                  {row.riskScore > 0 ? row.riskScore : '—'}
                </td>}
                {showRisk && <td className="px-2 py-2 text-center whitespace-nowrap">
                  <span className={`type-2xs px-2 py-0.5 rounded-full ${getRiskLevelBg(row.riskLevel)}`}>{row.riskLevel}</span>
                </td>}
                {showRisk && <td className="px-2 py-2" onClick={e => e.stopPropagation()}>
                  <input
                    type="text"
                    value={row.owner}
                    onChange={e => handleInlineChange(row.id, 'riskOwner', e.target.value)}
                    placeholder="Owner"
                    aria-label={`Risk owner for ${row.id}`}
                    style={inlineInputStyle}
                    className="focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                  />
                </td>}
                {showRisk && <td className="px-2 py-2" onClick={e => e.stopPropagation()}>
                  <select
                    value={row.treatment}
                    onChange={e => handleInlineChange(row.id, 'riskTreatment', e.target.value)}
                    aria-label={`Treatment for ${row.id}`}
                    style={inlineSelectStyle}
                  >
                    {Object.entries(RISK_TREATMENT_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </td>}
                {showGap && <td className="px-2 py-2 text-center">
                  <span className="inline-flex items-center gap-1" title={row.planText || undefined}>
                    {row.hasPlan ? <span style={{ color: 'var(--color-success)' }}>Yes</span> : <span style={{ color: 'var(--color-text-muted)' }}>—</span>}
                    {row.compensating && <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-indigo)' }} title="Compensating control" />}
                  </span>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="sm:hidden space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-xl p-6 text-center" style={{ background: 'var(--color-surface-card)', border: '1px dashed var(--color-border-default)' }}>
            <Search className="w-6 h-6 mx-auto mb-2" aria-hidden="true" style={{ color: 'var(--color-text-muted)' }} />
            <p className="type-sm" style={{ color: 'var(--color-text-muted)' }}>No controls match your filters.</p>
          </div>
        ) : filtered.map(row => (
          <div
            key={row.id}
            onClick={() => setModalControl({ id: row.id, description: row.description })}
            className="w-full text-left rounded-lg p-3 space-y-2 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') setModalControl({ id: row.id, description: row.description }) }}
            style={{ ...getRowStyle(row), background: getRowStyle(row).background || 'var(--color-surface-card)', border: '1px solid var(--color-border-dim)' }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="type-xs type-mono font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{row.id}</span>
                <span className={`type-2xs px-1.5 py-0.5 rounded type-mono font-medium ${functionColors[row.functionId]?.bg || 'bg-slate-600'} text-white`}>{row.functionId}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {showRisk && row.riskScore > 0 && <span className={`type-2xs px-2 py-0.5 rounded-full ${getRiskLevelBg(row.riskLevel)}`}>{row.riskLevel}</span>}
              </div>
            </div>
            <p className="type-xs" style={{ color: 'var(--color-text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{row.description}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`type-2xs px-2 py-0.5 rounded-full ${MATURITY_COLORS[row.maturity]}`}>{MATURITY_LABELS[row.maturity]}</span>
              {showGap && <span className={`type-2xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[row.priority]}`}>{PRIORITY_LABELS[row.priority]}</span>}
              {showGap && row.hasPlan && <span className="type-2xs" style={{ color: 'var(--color-success)' }}>Has plan</span>}
              {row.compensating && <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-indigo)' }} title="Compensating control" />}
            </div>
            {showRisk && <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              <span className="type-2xs" style={{ color: 'var(--color-text-muted)' }}>L:</span>
              <RatingBar value={row.likelihood} onChange={v => handleInlineChange(row.id, 'riskLikelihood', v)} label={`Likelihood for ${row.id}`} />
              <span className="type-2xs ml-1" style={{ color: 'var(--color-text-muted)' }}>I:</span>
              <RatingBar value={row.impact} onChange={v => handleInlineChange(row.id, 'riskImpact', v)} label={`Impact for ${row.id}`} />
            </div>}
            {showRisk && <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              <input
                type="text"
                value={row.owner}
                onChange={e => handleInlineChange(row.id, 'riskOwner', e.target.value)}
                placeholder="Owner"
                style={{ ...inlineInputStyle, width: '100px' }}
                className="focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              />
              <select
                value={row.treatment}
                onChange={e => handleInlineChange(row.id, 'riskTreatment', e.target.value)}
                style={inlineSelectStyle}
              >
                {Object.entries(RISK_TREATMENT_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>}
          </div>
        ))}
      </div>

      {/* Desktop empty state */}
      {filtered.length === 0 && (
        <div className="hidden sm:block rounded-xl p-6 text-center" style={{ background: 'var(--color-surface-card)', border: '1px dashed var(--color-border-default)' }}>
          <Search className="w-6 h-6 mx-auto mb-2" aria-hidden="true" style={{ color: 'var(--color-text-muted)' }} />
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
