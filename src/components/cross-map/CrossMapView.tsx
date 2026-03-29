import { useMemo, useState } from 'react'
import { Search, ArrowRightLeft, Eye, EyeOff } from 'lucide-react'
import { CROSS_MAP } from '../../data/cross-map'
import { FRAMEWORKS } from '../../data/frameworks'
import { useFramework } from '../../store/framework-context'
import { useAssessment } from '../../store/assessment-store'
import { MATURITY_HEX, type MaturityLevel } from '../../types/assessment'
import { AssessmentModal } from './AssessmentModal'

type MapKey = 'iso27001' | 'soc2' | 'cmmc' | 'pci_dss' | 'hipaa'

const FRAMEWORK_MAP: Record<string, { label: string; key: MapKey }> = {
  'nist-csf-2': { label: 'NIST CSF 2.0', key: 'iso27001' },
  'iso-27001': { label: 'ISO 27001:2022', key: 'iso27001' },
  'soc2': { label: 'SOC 2 (TSC)', key: 'soc2' },
  'cmmc': { label: 'CMMC 2.0', key: 'cmmc' },
  'pci-dss': { label: 'PCI DSS 4.0.1', key: 'pci_dss' },
  'hipaa': { label: 'HIPAA Security Rule', key: 'hipaa' },
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

function getCategoryId(frameworkId: string, controlId: string): string {
  const fw = FRAMEWORKS.find(f => f.id === frameworkId)
  if (!fw) return ''
  for (const fn of fw.data) for (const cat of fn.categories) for (const sub of cat.subcategories) if (sub.id === controlId) return cat.id
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
    const mappedOther: Record<MapKey, string[]> = { iso27001: [], soc2: [], cmmc: [], pci_dss: [], hipaa: [] }
    const otherKeys = (['iso27001', 'soc2', 'cmmc', 'pci_dss', 'hipaa'] as MapKey[]).filter(k => k !== anchorKey)
    for (const nistId of mappedNist) {
      const mapping = CROSS_MAP.find(m => m.nist === nistId)
      if (mapping) for (const key of otherKeys) for (const id of mapping[key]) if (!mappedOther[key].includes(id)) mappedOther[key].push(id)
    }
    return { id: control.id, description: control.description, functionId: control.functionId, mappedNist, mappedOther }
  })
}

const badgeColors: Record<string, string> = {
  iso27001: 'bg-blue-50 text-blue-700 border border-blue-200',
  soc2: 'bg-purple-50 text-purple-700 border border-purple-200',
  cmmc: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pci_dss: 'bg-amber-50 text-amber-700 border border-amber-200',
  hipaa: 'bg-rose-50 text-rose-700 border border-rose-200',
  nist: 'bg-slate-100 text-slate-600 border border-slate-200',
}

const statBorders: Record<string, string> = { iso27001: 'rgba(37,99,235,0.2)', soc2: 'rgba(124,58,237,0.2)', cmmc: 'rgba(22,163,74,0.2)', pci_dss: 'rgba(217,119,6,0.2)', hipaa: 'rgba(225,29,72,0.2)' }
const statColors: Record<string, string> = { iso27001: 'var(--color-fw-iso)', soc2: 'var(--color-fw-soc2)', cmmc: 'var(--color-fw-cmmc)', pci_dss: 'var(--color-fw-pci)', hipaa: 'var(--color-fw-hipaa)' }

const MAP_KEY_TO_FRAMEWORK_ID: Record<MapKey, string> = { iso27001: 'iso-27001', soc2: 'soc2', cmmc: 'cmmc', pci_dss: 'pci-dss', hipaa: 'hipaa' }

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

const MATURITY_ROW_ALPHA: Record<string, number> = {
  'not-assessed': 0.05,
  'ad-hoc': 0.16,
  'repeatable': 0.16,
  'defined': 0.16,
  'managed': 0.16,
  'optimized': 0.16,
}

export function CrossMapView({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { isFrameworkEnabled, toggleFramework, enabledFrameworks: globalEnabledFrameworks } = useFramework()
  const { getAssessmentForFramework } = useAssessment()
  const [search, setSearch] = useState('')
  const [anchorFramework, setAnchorFramework] = useState('nist-csf-2')
  const [filterFunction, setFilterFunction] = useState<string>('all')
  const [filterFramework, setFilterFramework] = useState<string>('all')
  const [modalControl, setModalControl] = useState<{ id: string; frameworkId: string; description: string; frameworkName: string } | null>(null)
  const [showStatus, setShowStatus] = useState(true)

  const getStatusStyle = (controlId: string, frameworkId: string): React.CSSProperties | undefined => {
    if (!showStatus) return undefined
    const data = getAssessmentForFramework(frameworkId, controlId)
    const color = MATURITY_HEX[data.maturity as MaturityLevel]
    return { backgroundColor: color, color: '#fff', borderColor: color }
  }

  const getRowBg = (controlId: string): string | undefined => {
    if (!showStatus) return undefined
    const data = getAssessmentForFramework(anchorFramework, controlId)
    const hex = MATURITY_HEX[data.maturity as MaturityLevel]
    const alpha = MATURITY_ROW_ALPHA[data.maturity] ?? 0.06
    return hexToRgba(hex, alpha)
  }

  const openAssessment = (controlId: string, frameworkId: string) => {
    const fw = FRAMEWORKS.find(f => f.id === frameworkId)
    if (!fw) return
    let desc = ''
    for (const fn of fw.data) for (const cat of fn.categories) for (const sub of cat.subcategories) if (sub.id === controlId) { desc = sub.description; break }
    setModalControl({ id: controlId, frameworkId, description: desc, frameworkName: fw.name })
  }

  const isNistAnchor = anchorFramework === 'nist-csf-2'
  const anchorFw = FRAMEWORKS.find(f => f.id === anchorFramework)
  const allTargetKeys = (['iso27001', 'soc2', 'cmmc', 'pci_dss', 'hipaa'] as MapKey[]).filter(k => isNistAnchor || k !== FRAMEWORK_MAP[anchorFramework]?.key)
  const targetKeys = allTargetKeys.filter(k => isFrameworkEnabled(MAP_KEY_TO_FRAMEWORK_ID[k]))
  const targetLabels: Record<MapKey, string> = { iso27001: 'ISO 27001', soc2: 'SOC 2', cmmc: 'CMMC', pci_dss: 'PCI DSS', hipaa: 'HIPAA' }

  // Filter anchor selector to only show enabled frameworks
  const mappableEnabled = MAPPABLE_FRAMEWORKS.filter(f => isFrameworkEnabled(f.id))

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
    if (isNistAnchor) {
      const s: Record<string, number> = { total }
      for (const k of (['iso27001', 'soc2', 'cmmc', 'pci_dss', 'hipaa'] as MapKey[])) {
        s[k] = forwardRows.filter(r => ((r as any)[k] as string[])?.length > 0).length
      }
      return s
    }
    return { total, nist: reverseRows.filter(r => r.mappedNist.length > 0).length }
  }, [rows, isNistAnchor, forwardRows, reverseRows])

  const selectStyle = { background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }

  return (
    <div className="p-4 sm:p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-1.5">
        <h2 className="type-page-title" style={{ color: 'var(--color-text-primary)' }}>Cross-Framework <span style={{ color: 'var(--color-accent)' }}>Mapping</span></h2>
      </div>
      <p className="type-mono-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
        {isNistAnchor ? 'NIST CSF controls mapped to other frameworks' : `${anchorFw?.shortName} controls with reverse NIST and transitive mappings`}
      </p>

      {/* Framework visibility toggles — wired to global setting */}
      <div className="flex items-center gap-2 mb-6">
        <span className="type-label" style={{ color: 'var(--color-text-muted)' }}>Show</span>
        {allTargetKeys.map(k => {
          const fwId = MAP_KEY_TO_FRAMEWORK_ID[k]
          const enabled = isFrameworkEnabled(fwId)
          return (
            <button
              key={k}
              onClick={() => toggleFramework(fwId)}
              className="type-2xs font-medium px-2.5 py-1 rounded-lg"
              style={{
                background: enabled ? (statColors[k] + '12') : 'var(--color-surface-raised)',
                color: enabled ? statColors[k] : 'var(--color-text-muted)',
                border: `1px solid ${enabled ? statBorders[k] : 'var(--color-border-default)'}`,
                opacity: enabled ? 1 : 0.6,
              }}
            >
              {targetLabels[k]}
            </button>
          )
        })}
      </div>

      <div className={`grid gap-3 mb-6`} style={{ gridTemplateColumns: `repeat(${1 + targetKeys.length}, 1fr)` }}>
        <div className="p-3 rounded-xl" style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-dim)' }}>
          <p className="type-label type-mono" style={{ color: 'var(--color-text-muted)' }}>{anchorFw?.shortName} Controls</p>
          <p className="type-lg font-medium mt-1" style={{ color: 'var(--color-text-primary)' }}>{stats.total}</p>
        </div>
        {isNistAnchor ? (
          targetKeys.map(k => {
            const val = (stats as any)[k] || 0
            return (
              <div key={k} className="p-3 rounded-xl" style={{ background: 'var(--color-surface-card)', border: `1px solid ${statBorders[k]}` }}>
                <p className="type-label type-mono" style={{ color: statColors[k] }}>{targetLabels[k]}</p>
                <p className="type-lg font-medium mt-1" style={{ color: statColors[k] }}>{Math.round((val / stats.total) * 100)}%</p>
                <p className="type-2xs type-mono" style={{ color: 'var(--color-text-muted)' }}>{val} mapped</p>
              </div>
            )
          })
        ) : (
          <div className="p-3 rounded-xl" style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-dim)' }}>
            <p className="type-label type-mono" style={{ color: 'var(--color-text-muted)' }}>Mapped to NIST</p>
            <p className="type-lg font-medium mt-1" style={{ color: 'var(--color-accent)' }}>{Math.round(((stats as any).nist / stats.total) * 100)}%</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" aria-hidden="true" style={{ color: 'var(--color-text-muted)' }} />
          <input type="text" placeholder="Search controls..." value={search} onChange={e => setSearch(e.target.value)} aria-label="Search controls" className="w-full type-sm rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" style={selectStyle} />
        </div>
        <select value={filterFunction} onChange={e => setFilterFunction(e.target.value)} className="type-sm rounded-lg px-2.5 py-1.5" style={selectStyle}>
          <option value="all">All Domains</option>
          {anchorFw?.data.map(fn => <option key={fn.id} value={fn.id}>{fn.id} — {fn.name}</option>)}
        </select>
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="type-2xs type-mono" style={{ color: 'var(--color-text-muted)' }}>{filteredRows.length} of {stats.total} controls</p>
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-3.5 h-3.5" aria-hidden="true" style={{ color: 'var(--color-text-muted)' }} />
          <select value={anchorFramework} onChange={e => { setAnchorFramework(e.target.value); setFilterFunction('all'); setFilterFramework('all') }} aria-label="Select anchor framework" className="type-sm font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" style={selectStyle}>
            {mappableEnabled.map(fw => <option key={fw.id} value={fw.id}>Anchor: {fw.shortName}</option>)}
          </select>
          <button onClick={() => setShowStatus(s => !s)} className="inline-flex items-center gap-1.5 type-sm font-medium px-3 py-1.5 rounded-lg" style={{ color: showStatus ? '#fff' : 'var(--color-text-secondary)', background: showStatus ? 'var(--color-accent)' : 'var(--color-surface-raised)', border: `1px solid ${showStatus ? 'var(--color-accent)' : 'var(--color-border-default)'}` }}>
            {showStatus ? <Eye className="w-3.5 h-3.5" aria-hidden="true" /> : <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />}
            {showStatus ? 'Maturity View' : 'Show Maturity'}
          </button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden overflow-x-auto" style={{ border: '1px solid var(--color-border-dim)' }}>
        <table className="w-full type-sm">
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
              <tr key={row.id} style={{ borderBottom: '2px solid var(--color-surface)', backgroundColor: getRowBg(row.id) }} className="hover:opacity-80">
                <td className="px-3 py-2 type-mono font-semibold whitespace-nowrap">
                  <button onClick={() => openAssessment(row.id, anchorFramework)} className="hover:underline cursor-pointer" style={{ color: 'var(--color-accent)' }}>{row.id}</button>
                </td>
                <td className="px-3 py-2" style={{ color: 'var(--color-text-muted)' }}>{row.description}</td>
                {isNistAnchor ? targetKeys.map(k => (
                  <td key={k} className="px-3 py-2">
                    {((row as any)[k] as string[])?.length > 0 ? <div className="flex flex-wrap gap-1">{((row as any)[k] as string[]).map((id: string, i: number) => <button key={`${k}-${i}`} onClick={() => openAssessment(id, MAP_KEY_TO_FRAMEWORK_ID[k])} className={`type-2xs px-1.5 py-0.5 rounded type-mono hover:opacity-80 cursor-pointer ${showStatus ? '' : badgeColors[k]}`} style={getStatusStyle(id, MAP_KEY_TO_FRAMEWORK_ID[k])}>{id}</button>)}</div> : <span style={{ color: 'var(--color-text-muted)' }}>—</span>}
                  </td>
                )) : <>
                  <td className="px-3 py-2">{(row as ReverseRow).mappedNist.length > 0 ? <div className="flex flex-wrap gap-1">{(row as ReverseRow).mappedNist.map((id, i) => <button key={`nist-${i}-${id}`} onClick={() => openAssessment(id, 'nist-csf-2')} className={`type-2xs px-1.5 py-0.5 rounded type-mono hover:opacity-80 cursor-pointer ${showStatus ? '' : badgeColors.nist}`} style={getStatusStyle(id, 'nist-csf-2')}>{id}</button>)}</div> : <span style={{ color: 'var(--color-text-muted)' }}>—</span>}</td>
                  {targetKeys.map(k => (
                    <td key={k} className="px-3 py-2">{(row as ReverseRow).mappedOther[k]?.length > 0 ? <div className="flex flex-wrap gap-1">{(row as ReverseRow).mappedOther[k].map((id, i) => <button key={`${k}-${i}`} onClick={() => openAssessment(id, MAP_KEY_TO_FRAMEWORK_ID[k])} className={`type-2xs px-1.5 py-0.5 rounded type-mono hover:opacity-80 cursor-pointer ${showStatus ? '' : badgeColors[k]}`} style={getStatusStyle(id, MAP_KEY_TO_FRAMEWORK_ID[k])}>{id}</button>)}</div> : <span style={{ color: 'var(--color-text-muted)' }}>—</span>}</td>
                  ))}
                </>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalControl && (
        <AssessmentModal
          controlId={modalControl.id}
          frameworkId={modalControl.frameworkId}
          description={modalControl.description}
          frameworkName={modalControl.frameworkName}
          onClose={() => setModalControl(null)}
        />
      )}
    </div>
  )
}
