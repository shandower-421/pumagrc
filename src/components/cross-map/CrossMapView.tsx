import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { CROSS_MAP } from '../../data/cross-map'
import { FRAMEWORKS } from '../../data/frameworks'

const FRAMEWORK_INFO: Record<string, { label: string; key: 'iso27001' | 'soc2' | 'cmmc' }> = {
  'iso-27001': { label: 'ISO 27001:2022', key: 'iso27001' },
  'soc2': { label: 'SOC 2 (TSC)', key: 'soc2' },
  'cmmc': { label: 'CMMC 2.0', key: 'cmmc' },
}

const NIST_FRAMEWORK = FRAMEWORKS.find(f => f.id === 'nist-csf-2')!

function getNistDescription(id: string): string {
  for (const fn of NIST_FRAMEWORK.data) {
    for (const cat of fn.categories) {
      for (const sub of cat.subcategories) {
        if (sub.id === id) return sub.description
      }
    }
  }
  return ''
}

function getNistFunction(id: string): string {
  for (const fn of NIST_FRAMEWORK.data) {
    for (const cat of fn.categories) {
      for (const sub of cat.subcategories) {
        if (sub.id === id) return fn.id
      }
    }
  }
  return ''
}

export function CrossMapView() {
  const [search, setSearch] = useState('')
  const [filterFunction, setFilterFunction] = useState<string>('all')
  const [filterFramework, setFilterFramework] = useState<string>('all')

  const rows = useMemo(() => {
    let data = CROSS_MAP.map(m => ({
      ...m,
      description: getNistDescription(m.nist),
      functionId: getNistFunction(m.nist),
    }))

    if (filterFunction !== 'all') {
      data = data.filter(r => r.functionId === filterFunction)
    }

    if (filterFramework !== 'all') {
      const key = FRAMEWORK_INFO[filterFramework]?.key
      if (key) {
        data = data.filter(r => r[key].length > 0)
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter(r =>
        r.nist.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.iso27001.some(id => id.toLowerCase().includes(q)) ||
        r.soc2.some(id => id.toLowerCase().includes(q)) ||
        r.cmmc.some(id => id.toLowerCase().includes(q))
      )
    }

    return data
  }, [search, filterFunction, filterFramework])

  const stats = useMemo(() => {
    const total = CROSS_MAP.length
    const isoMapped = CROSS_MAP.filter(m => m.iso27001.length > 0).length
    const soc2Mapped = CROSS_MAP.filter(m => m.soc2.length > 0).length
    const cmmcMapped = CROSS_MAP.filter(m => m.cmmc.length > 0).length
    return { total, isoMapped, soc2Mapped, cmmcMapped }
  }, [])

  return (
    <div className="p-6 max-w-7xl">
      <h2 className="text-xl font-semibold text-slate-900 mb-1">Cross-Framework Mapping</h2>
      <p className="text-sm text-slate-500 mb-4">
        Control mappings between NIST CSF 2.0 and other frameworks. Shows which controls satisfy requirements across multiple standards.
      </p>

      {/* Coverage Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white border border-slate-200 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-500 uppercase">NIST CSF Controls</p>
          <p className="text-xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-white border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-medium text-blue-600 uppercase">ISO 27001 Coverage</p>
          <p className="text-xl font-bold text-blue-700">{Math.round((stats.isoMapped / stats.total) * 100)}%</p>
          <p className="text-xs text-slate-400">{stats.isoMapped} of {stats.total} mapped</p>
        </div>
        <div className="bg-white border border-purple-200 rounded-lg p-3">
          <p className="text-xs font-medium text-purple-600 uppercase">SOC 2 Coverage</p>
          <p className="text-xl font-bold text-purple-700">{Math.round((stats.soc2Mapped / stats.total) * 100)}%</p>
          <p className="text-xs text-slate-400">{stats.soc2Mapped} of {stats.total} mapped</p>
        </div>
        <div className="bg-white border border-green-200 rounded-lg p-3">
          <p className="text-xs font-medium text-green-600 uppercase">CMMC Coverage</p>
          <p className="text-xl font-bold text-green-700">{Math.round((stats.cmmcMapped / stats.total) * 100)}%</p>
          <p className="text-xs text-slate-400">{stats.cmmcMapped} of {stats.total} mapped</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search controls..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-md pl-8 pr-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterFunction}
          onChange={e => setFilterFunction(e.target.value)}
          className="text-sm border border-slate-200 rounded-md px-2.5 py-1.5 bg-white"
        >
          <option value="all">All NIST Functions</option>
          {NIST_FRAMEWORK.data.map(fn => (
            <option key={fn.id} value={fn.id}>{fn.id} - {fn.name}</option>
          ))}
        </select>
        <select
          value={filterFramework}
          onChange={e => setFilterFramework(e.target.value)}
          className="text-sm border border-slate-200 rounded-md px-2.5 py-1.5 bg-white"
        >
          <option value="all">All Frameworks</option>
          <option value="iso-27001">Has ISO 27001 mapping</option>
          <option value="soc2">Has SOC 2 mapping</option>
          <option value="cmmc">Has CMMC mapping</option>
        </select>
      </div>

      <p className="text-xs text-slate-400 mb-2">{rows.length} of {stats.total} controls shown</p>

      {/* Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-3 py-2 font-medium text-slate-600 w-20">NIST CSF</th>
              <th className="text-left px-3 py-2 font-medium text-slate-600">Description</th>
              <th className="text-left px-3 py-2 font-medium text-blue-600 w-40">ISO 27001</th>
              <th className="text-left px-3 py-2 font-medium text-purple-600 w-36">SOC 2</th>
              <th className="text-left px-3 py-2 font-medium text-green-600 w-44">CMMC</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.nist} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-3 py-2 font-mono text-xs font-semibold text-slate-700 whitespace-nowrap">{row.nist}</td>
                <td className="px-3 py-2 text-slate-600 text-xs">{row.description}</td>
                <td className="px-3 py-2">
                  {row.iso27001.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {row.iso27001.map(id => (
                        <span key={id} className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-mono">{id}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-300 text-xs">—</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {row.soc2.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {row.soc2.map(id => (
                        <span key={id} className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-mono">{id}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-300 text-xs">—</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {row.cmmc.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {row.cmmc.map(id => (
                        <span key={id} className="text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-mono">{id}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-300 text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
