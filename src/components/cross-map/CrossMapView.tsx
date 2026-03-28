import { useMemo, useState } from 'react'
import { Search, ArrowRightLeft } from 'lucide-react'
import { CROSS_MAP } from '../../data/cross-map'
import { FRAMEWORKS } from '../../data/frameworks'

type MapKey = 'iso27001' | 'soc2' | 'cmmc'

const FRAMEWORK_MAP: Record<string, { label: string; key: MapKey }> = {
  'nist-csf-2': { label: 'NIST CSF 2.0', key: 'iso27001' },
  'iso-27001': { label: 'ISO 27001:2022', key: 'iso27001' },
  'soc2': { label: 'SOC 2 (TSC)', key: 'soc2' },
  'cmmc': { label: 'CMMC 2.0', key: 'cmmc' },
}

const MAPPABLE_FRAMEWORKS = FRAMEWORKS.filter(f => FRAMEWORK_MAP[f.id])

function getDescription(frameworkId: string, controlId: string): string {
  const fw = FRAMEWORKS.find(f => f.id === frameworkId)
  if (!fw) return ''
  for (const fn of fw.data) for (const cat of fn.categories) for (const sub of cat.subcategories) if (sub.id === controlId) return sub.description
  return ''
}

function getFunctionId(frameworkId: string, controlId: string): string {
  const fw = FRAMEWORKS.find(f => f.id === frameworkId)
  if (!fw) return ''
  for (const fn of fw.data) for (const cat of fn.categories) for (const sub of cat.subcategories) if (sub.id === controlId) return fn.id
  return ''
}

interface ReverseRow { id: string; description: string; functionId: string; mappedNist: string[]; mappedOther: Record<MapKey, string[]> }

function buildReverseMap(anchorId: string): ReverseRow[] {
  const anchorKey = FRAMEWORK_MAP[anchorId]?.key
  if (!anchorKey || anchorId === 'nist-csf-2') return []
  const fw = FRAMEWORKS.find(f => f.id === anchorId)
  if (!fw) return []
  const allControls = fw.data.flatMap(fn => fn.categories.flatMap(cat => cat.subcategories.map(sub => ({ ...sub, functionId: fn.id }))))
  return allControls.map(control => {
    const mappedNist = CROSS_MAP.filter(m => m[anchorKey].includes(control.id)).map(m => m.nist)
    const mappedOther: Record<MapKey, string[]> = { iso27001: [], soc2: [], cmmc: [] }
    const otherKeys = (['iso27001', 'soc2', 'cmmc'] as MapKey[]).filter(k => k !== anchorKey)
    for (const nistId of mappedNist) {
      const mapping = CROSS_MAP.find(m => m.nist === nistId)
      if (mapping) for (const key of otherKeys) for (const id of mapping[key]) if (!mappedOther[key].includes(id)) mappedOther[key].push(id)
    }
    return { id: control.id, description: control.description, functionId: control.functionId, mappedNist, mappedOther }
  })
}

const badgeColors: Record<string, string> = {
  iso27001: 'bg-blue-900/50 text-blue-300 border border-blue-800/50',
  soc2: 'bg-purple-900/50 text-purple-300 border border-purple-800/50',
  cmmc: 'bg-green-900/50 text-green-300 border border-green-800/50',
  nist: 'bg-slate-800/50 text-slate-300 border border-slate-700/50',
}

const statBorders: Record<string, string> = { iso27001: 'rgba(59,130,246,0.3)', soc2: 'rgba(168,85,247,0.3)', cmmc: 'rgba(34,197,94,0.3)' }
const statColors: Record<string, string> = { iso27001: '#60a5fa', soc2: '#a78bfa', cmmc: '#4ade80' }

export function CrossMapView() {
  const [search, setSearch] = useState('')
  const [anchorFramework, setAnchorFramework] = useState('nist-csf-2')
  const [filterFunction, setFilterFunction] = useState<string>('all')
  const [filterFramework, setFilterFramework] = useState<string>('all')

  const isNistAnchor = anchorFramework === 'nist-csf-2'
  const anchorFw = FRAMEWORKS.find(f => f.id === anchorFramework)
  const targetKeys = (['iso27001', 'soc2', 'cmmc'] as MapKey[]).filter(k => isNistAnchor || k !== FRAMEWORK_MAP[anchorFramework]?.key)
  const targetLabels: Record<MapKey, string> = { iso27001: 'ISO 27001', soc2: 'SOC 2', cmmc: 'CMMC' }

  const forwardRows = useMemo(() => isNistAnchor ? CROSS_MAP.map(m => ({ ...m, id: m.nist, description: getDescription('nist-csf-2', m.nist), functionId: getFunctionId('nist-csf-2', m.nist) })) : [], [isNistAnchor])
  const reverseRows = useMemo(() => isNistAnchor ? [] : buildReverseMap(anchorFramework), [isNistAnchor, anchorFramework])
  const rows = isNistAnchor ? forwardRows : reverseRows

  const filteredRows = useMemo(() => {
    let data = rows
    if (filterFunction !== 'all') data = data.filter(r => r.functionId === filterFunction)
    if (filterFramework !== 'all' && isNistAnchor) { const key = FRAMEWORK_MAP[filterFramework]?.key; if (key) data = data.filter(r => (r as any)[key]?.length > 0) }
    if (search.trim()) { const q = search.toLowerCase(); data = data.filter(r => r.id.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)) }
    return data
  }, [rows, filterFunction, filterFramework, search, isNistAnchor])

  const stats = useMemo(() => {
    const total = rows.length
    if (isNistAnchor) return { total, iso: forwardRows.filter(r => r.iso27001.length > 0).length, soc2: forwardRows.filter(r => r.soc2.length > 0).length, cmmc: forwardRows.filter(r => r.cmmc.length > 0).length }
    return { total, nist: reverseRows.filter(r => r.mappedNist.length > 0).length }
  }, [rows, isNistAnchor, forwardRows, reverseRows])

  const selectStyle = { background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }

  return (
    <div className="p-4 sm:p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-light" style={{ color: 'var(--color-text-primary)', fontFamily: "'Instrument Serif', serif" }}>Cross-Framework <span style={{ color: 'var(--color-accent)' }}>Mapping</span></h2>
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
          <select value={anchorFramework} onChange={e => { setAnchorFramework(e.target.value); setFilterFunction('all'); setFilterFramework('all') }} aria-label="Select anchor framework" className="text-xs font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" style={selectStyle}>
            {MAPPABLE_FRAMEWORKS.map(fw => <option key={fw.id} value={fw.id}>Anchor: {fw.shortName}</option>)}
          </select>
        </div>
      </div>
      <p className="text-xs font-mono mb-4" style={{ color: 'var(--color-text-muted)' }}>
        {isNistAnchor ? 'NIST CSF controls mapped to other frameworks' : `${anchorFw?.shortName} controls with reverse NIST and transitive mappings`}
      </p>

      <div className={`grid gap-3 mb-6 ${isNistAnchor ? 'grid-cols-4' : 'grid-cols-2'}`}>
        <div className="p-3 rounded-xl" style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-dim)' }}>
          <p className="text-[10px] font-mono font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{anchorFw?.shortName} Controls</p>
          <p className="text-xl font-light mt-1" style={{ color: 'var(--color-text-primary)', fontFamily: "'Instrument Serif', serif" }}>{stats.total}</p>
        </div>
        {isNistAnchor ? (
          (['iso', 'soc2', 'cmmc'] as const).map(k => {
            const key = k === 'iso' ? 'iso27001' : k
            const val = (stats as any)[k]
            return (
              <div key={k} className="p-3 rounded-xl" style={{ background: 'var(--color-surface-card)', border: `1px solid ${statBorders[key]}` }}>
                <p className="text-[10px] font-mono font-medium uppercase tracking-widest" style={{ color: statColors[key] }}>{targetLabels[key as MapKey]}</p>
                <p className="text-xl font-light mt-1" style={{ color: statColors[key], fontFamily: "'Instrument Serif', serif" }}>{Math.round((val / stats.total) * 100)}%</p>
                <p className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>{val} mapped</p>
              </div>
            )
          })
        ) : (
          <div className="p-3 rounded-xl" style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-dim)' }}>
            <p className="text-[10px] font-mono font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Mapped to NIST</p>
            <p className="text-xl font-light mt-1" style={{ color: 'var(--color-accent)', fontFamily: "'Instrument Serif', serif" }}>{Math.round(((stats as any).nist / stats.total) * 100)}%</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
          <input type="text" placeholder="Search controls..." value={search} onChange={e => setSearch(e.target.value)} aria-label="Search controls" className="w-full text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" style={selectStyle} />
        </div>
        <select value={filterFunction} onChange={e => setFilterFunction(e.target.value)} className="text-xs rounded-lg px-2.5 py-1.5" style={selectStyle}>
          <option value="all">All Domains</option>
          {anchorFw?.data.map(fn => <option key={fn.id} value={fn.id}>{fn.id} — {fn.name}</option>)}
        </select>
      </div>

      <p className="text-[10px] font-mono mb-2" style={{ color: 'var(--color-text-muted)' }}>{filteredRows.length} of {stats.total} controls</p>

      <div className="rounded-xl overflow-hidden overflow-x-auto" style={{ border: '1px solid var(--color-border-dim)' }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'var(--color-surface-raised)', borderBottom: '1px solid var(--color-border-dim)' }}>
              <th className="text-left px-3 py-2.5 font-medium w-24" style={{ color: 'var(--color-text-muted)' }}>{anchorFw?.shortName}</th>
              <th className="text-left px-3 py-2.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>Description</th>
              {isNistAnchor ? targetKeys.map(k => <th key={k} className="text-left px-3 py-2.5 font-medium w-40" style={{ color: statColors[k] }}>{targetLabels[k]}</th>)
                : <><th className="text-left px-3 py-2.5 font-medium w-40" style={{ color: 'var(--color-text-muted)' }}>NIST CSF</th>{targetKeys.map(k => <th key={k} className="text-left px-3 py-2.5 font-medium w-36" style={{ color: statColors[k] }}>{targetLabels[k]}</th>)}</>}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--color-border-dim)' }} className="hover:opacity-80">
                <td className="px-3 py-2 font-mono font-semibold whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>{row.id}</td>
                <td className="px-3 py-2" style={{ color: 'var(--color-text-muted)' }}>{row.description}</td>
                {isNistAnchor ? targetKeys.map(k => (
                  <td key={k} className="px-3 py-2">
                    {((row as any)[k] as string[])?.length > 0 ? <div className="flex flex-wrap gap-1">{((row as any)[k] as string[]).map((id: string, i: number) => <span key={`${k}-${i}`} className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${badgeColors[k]}`}>{id}</span>)}</div> : <span style={{ color: 'var(--color-text-muted)' }}>—</span>}
                  </td>
                )) : <>
                  <td className="px-3 py-2">{(row as ReverseRow).mappedNist.length > 0 ? <div className="flex flex-wrap gap-1">{(row as ReverseRow).mappedNist.map((id, i) => <span key={`nist-${i}-${id}`} className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${badgeColors.nist}`}>{id}</span>)}</div> : <span style={{ color: 'var(--color-text-muted)' }}>—</span>}</td>
                  {targetKeys.map(k => (
                    <td key={k} className="px-3 py-2">{(row as ReverseRow).mappedOther[k]?.length > 0 ? <div className="flex flex-wrap gap-1">{(row as ReverseRow).mappedOther[k].map((id, i) => <span key={`${k}-${i}`} className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${badgeColors[k]}`}>{id}</span>)}</div> : <span style={{ color: 'var(--color-text-muted)' }}>—</span>}</td>
                  ))}
                </>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
