import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronRight, Upload } from 'lucide-react'
import { useFramework } from '../../store/framework-context'
import type { FrameworkMeta, FunctionDef, CategoryDef, SubcategoryDef } from '../../types/assessment'

function generateId(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30)
}

const inputStyle = { background: 'var(--color-surface)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)' }
const cardStyle = { background: 'var(--color-surface-card)', border: '1px solid var(--color-border-dim)', borderRadius: '12px' }

export function CustomFrameworkView({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { allFrameworks, addCustomFramework, deleteCustomFramework, isCustom, setFramework } = useFramework()
  const customFrameworks = allFrameworks.filter(f => isCustom(f.id))
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('')
  const [version, setVersion] = useState('')
  const [description, setDescription] = useState('')
  const [functions, setFunctions] = useState<FunctionDef[]>([])
  const [expandedFn, setExpandedFn] = useState<Record<number, boolean>>({})
  const [importError, setImportError] = useState<string | null>(null)

  const resetEditor = () => { setEditing(false); setName(''); setVersion(''); setDescription(''); setFunctions([]); setExpandedFn({}) }

  const addFunction = () => { setFunctions([...functions, { id: '', name: '', description: '', categories: [], color: '' }]); setExpandedFn({ ...expandedFn, [functions.length]: true }) }
  const updateFunction = (idx: number, field: keyof FunctionDef, value: string) => { const u = [...functions]; u[idx] = { ...u[idx], [field]: value }; setFunctions(u) }
  const removeFunction = (idx: number) => setFunctions(functions.filter((_, i) => i !== idx))
  const addCategory = (fnIdx: number) => { const u = [...functions]; u[fnIdx] = { ...u[fnIdx], categories: [...u[fnIdx].categories, { id: '', name: '', subcategories: [] }] }; setFunctions(u) }
  const updateCategory = (fnIdx: number, catIdx: number, field: keyof CategoryDef, value: string) => { const u = [...functions]; const c = [...u[fnIdx].categories]; c[catIdx] = { ...c[catIdx], [field]: value }; u[fnIdx] = { ...u[fnIdx], categories: c }; setFunctions(u) }
  const removeCategory = (fnIdx: number, catIdx: number) => { const u = [...functions]; u[fnIdx] = { ...u[fnIdx], categories: u[fnIdx].categories.filter((_, i) => i !== catIdx) }; setFunctions(u) }
  const addSubcategory = (fnIdx: number, catIdx: number) => { const u = [...functions]; const c = [...u[fnIdx].categories]; c[catIdx] = { ...c[catIdx], subcategories: [...c[catIdx].subcategories, { id: '', description: '' }] }; u[fnIdx] = { ...u[fnIdx], categories: c }; setFunctions(u) }
  const updateSubcategory = (fnIdx: number, catIdx: number, subIdx: number, field: keyof SubcategoryDef, value: string) => { const u = [...functions]; const c = [...u[fnIdx].categories]; const s = [...c[catIdx].subcategories]; s[subIdx] = { ...s[subIdx], [field]: value }; c[catIdx] = { ...c[catIdx], subcategories: s }; u[fnIdx] = { ...u[fnIdx], categories: c }; setFunctions(u) }
  const removeSubcategory = (fnIdx: number, catIdx: number, subIdx: number) => { const u = [...functions]; const c = [...u[fnIdx].categories]; c[catIdx] = { ...c[catIdx], subcategories: c[catIdx].subcategories.filter((_, i) => i !== subIdx) }; u[fnIdx] = { ...u[fnIdx], categories: c }; setFunctions(u) }

  const handleSave = () => {
    if (!name.trim()) return
    const id = `custom-${generateId(name)}`
    const totalControls = functions.reduce((sum, fn) => sum + fn.categories.reduce((s, c) => s + c.subcategories.length, 0), 0)
    const fw: FrameworkMeta = { id, name: name.trim(), shortName: name.trim().slice(0, 15), version: version.trim() || '1.0', description: description.trim() || `Custom framework with ${functions.length} domains and ${totalControls} controls.`, data: functions }
    addCustomFramework(fw); setFramework(id); resetEditor(); onNavigate('dashboard')
  }

  const handleImportFramework = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return; setImportError(null)
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as FrameworkMeta
        if (!data.name || !data.data || !Array.isArray(data.data)) throw new Error('Invalid')
        if (!data.id) data.id = `custom-${generateId(data.name)}`; if (!data.shortName) data.shortName = data.name.slice(0, 15); if (!data.version) data.version = '1.0'; if (!data.description) data.description = 'Imported custom framework'
        addCustomFramework(data); setFramework(data.id); onNavigate('dashboard')
      } catch { setImportError('Invalid framework file.') }
    }
    reader.readAsText(file); e.target.value = ''
  }

  const totalControls = functions.reduce((sum, fn) => sum + fn.categories.reduce((s, c) => s + c.subcategories.length, 0), 0)

  if (!editing) {
    return (
      <div className="p-4 sm:p-6 max-w-4xl">
        <h2 className="type-page-title mb-1" style={{ color: 'var(--color-text-primary)' }}>Custom <span style={{ color: 'var(--color-accent)' }}>Frameworks</span></h2>
        <p className="type-mono-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>Create your own framework or import from JSON</p>

        <div className="flex gap-3 mb-6">
          <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1.5 type-sm font-medium px-3 py-2 rounded-lg" style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', border: '1px solid rgba(34,211,238,0.2)' }}><Plus className="w-4 h-4" /> Create Framework</button>
          <label className="inline-flex items-center gap-1.5 type-sm font-medium px-3 py-2 rounded-lg cursor-pointer hover:opacity-80" style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }}>
            <Upload className="w-4 h-4" /> Import JSON <input type="file" accept=".json" onChange={handleImportFramework} className="hidden" />
          </label>
        </div>

        {importError && <div className="rounded-lg p-3 mb-4 type-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: 'var(--color-danger)' }}>{importError}</div>}

        {customFrameworks.length > 0 ? (
          <div className="space-y-3">{customFrameworks.map(fw => {
            const cc = fw.data.reduce((sum, fn) => sum + fn.categories.reduce((s, c) => s + c.subcategories.length, 0), 0)
            return (
              <div key={fw.id} className="p-4 rounded-xl flex items-center justify-between" style={cardStyle}>
                <div><h3 className="font-medium type-body" style={{ color: 'var(--color-text-primary)' }}>{fw.name} <span className="type-2xs type-mono" style={{ color: 'var(--color-text-muted)' }}>v{fw.version}</span></h3><p className="type-sm" style={{ color: 'var(--color-text-muted)' }}>{fw.data.length} domains, {cc} controls</p></div>
                <div className="flex gap-2">
                  <button onClick={() => { setFramework(fw.id); onNavigate('dashboard') }} className="type-sm px-2 py-1 rounded-lg" style={{ color: 'var(--color-accent)' }}>Open</button>
                  <button onClick={() => deleteCustomFramework(fw.id)} className="hover:opacity-80" style={{ color: 'var(--color-text-muted)' }}><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )
          })}</div>
        ) : (
          <div className="rounded-xl p-8 text-center" style={{ background: 'var(--color-surface-card)', border: '1px dashed var(--color-border-default)' }}>
            <p className="type-sm" style={{ color: 'var(--color-text-muted)' }}>No custom frameworks yet.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="type-page-title" style={{ color: 'var(--color-text-primary)' }}>Create <span style={{ color: 'var(--color-accent)' }}>Framework</span></h2>
          <p className="type-mono-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Domains &gt; Categories &gt; Controls</p>
        </div>
        <div className="flex gap-2">
          <button onClick={resetEditor} className="type-sm px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }}>Cancel</button>
          <button onClick={handleSave} disabled={!name.trim() || totalControls === 0} className="type-sm px-3 py-1.5 rounded-lg disabled:opacity-50" style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', border: '1px solid rgba(34,211,238,0.2)' }}>Save ({totalControls} controls)</button>
        </div>
      </div>

      <div className="p-4 mb-4 space-y-3" style={cardStyle}>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block type-label mb-1" style={{ color: 'var(--color-text-muted)' }}>Name *</label><input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Internal Policy" className="w-full type-sm rounded-lg px-2.5 py-2 focus:outline-none" style={inputStyle} /></div>
          <div><label className="block type-label mb-1" style={{ color: 'var(--color-text-muted)' }}>Version</label><input value={version} onChange={e => setVersion(e.target.value)} placeholder="1.0" className="w-full type-sm rounded-lg px-2.5 py-2 focus:outline-none" style={inputStyle} /></div>
        </div>
        <div><label className="block type-label mb-1" style={{ color: 'var(--color-text-muted)' }}>Description</label><input value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description" className="w-full type-sm rounded-lg px-2.5 py-2 focus:outline-none" style={inputStyle} /></div>
      </div>

      <div className="space-y-3">
        {functions.map((fn, fnIdx) => (
          <div key={fnIdx} className="rounded-xl overflow-hidden" style={cardStyle}>
            <div className="px-4 py-3 flex items-center gap-2" style={{ background: 'var(--color-surface-raised)', borderBottom: '1px solid var(--color-border-dim)' }}>
              <button onClick={() => setExpandedFn({ ...expandedFn, [fnIdx]: !expandedFn[fnIdx] })}>{expandedFn[fnIdx] ? <ChevronDown className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} /> : <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />}</button>
              <input value={fn.id} onChange={e => updateFunction(fnIdx, 'id', e.target.value)} placeholder="ID" className="w-20 type-mono-sm font-bold rounded px-1.5 py-0.5 focus:outline-none" style={inputStyle} />
              <input value={fn.name} onChange={e => updateFunction(fnIdx, 'name', e.target.value)} placeholder="Domain Name" className="flex-1 type-sm font-medium rounded px-1.5 py-0.5 focus:outline-none" style={inputStyle} />
              <span className="type-2xs type-mono" style={{ color: 'var(--color-text-muted)' }}>{fn.categories.reduce((s, c) => s + c.subcategories.length, 0)} controls</span>
              <button onClick={() => removeFunction(fnIdx)} className="hover:opacity-80" style={{ color: 'var(--color-text-muted)' }}><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            {expandedFn[fnIdx] && (
              <div className="p-4 space-y-3">
                <input value={fn.description} onChange={e => updateFunction(fnIdx, 'description', e.target.value)} placeholder="Domain description" className="w-full type-sm rounded px-2 py-1 focus:outline-none" style={inputStyle} />
                {fn.categories.map((cat, catIdx) => (
                  <div key={catIdx} className="ml-4 pl-3 space-y-2" style={{ borderLeft: '1px solid var(--color-border-dim)' }}>
                    <div className="flex items-center gap-2">
                      <input value={cat.id} onChange={e => updateCategory(fnIdx, catIdx, 'id', e.target.value)} placeholder="Cat ID" className="w-24 type-2xs type-mono rounded px-1.5 py-0.5 focus:outline-none" style={inputStyle} />
                      <input value={cat.name} onChange={e => updateCategory(fnIdx, catIdx, 'name', e.target.value)} placeholder="Category Name" className="flex-1 type-sm rounded px-1.5 py-0.5 focus:outline-none" style={inputStyle} />
                      <button onClick={() => removeCategory(fnIdx, catIdx)} className="hover:opacity-80" style={{ color: 'var(--color-text-muted)' }}><Trash2 className="w-3 h-3" /></button>
                    </div>
                    {cat.subcategories.map((sub, subIdx) => (
                      <div key={subIdx} className="ml-4 flex items-center gap-2">
                        <input value={sub.id} onChange={e => updateSubcategory(fnIdx, catIdx, subIdx, 'id', e.target.value)} placeholder="Control ID" className="w-28 type-2xs type-mono rounded px-1.5 py-0.5 focus:outline-none" style={inputStyle} />
                        <input value={sub.description} onChange={e => updateSubcategory(fnIdx, catIdx, subIdx, 'description', e.target.value)} placeholder="Control description" className="flex-1 type-2xs rounded px-1.5 py-0.5 focus:outline-none" style={inputStyle} />
                        <button onClick={() => removeSubcategory(fnIdx, catIdx, subIdx)} className="hover:opacity-80" style={{ color: 'var(--color-text-muted)' }}><Trash2 className="w-3 h-3" /></button>
                      </div>
                    ))}
                    <button onClick={() => addSubcategory(fnIdx, catIdx)} className="ml-4 type-2xs flex items-center gap-1" style={{ color: 'var(--color-accent)' }}><Plus className="w-3 h-3" /> Add Control</button>
                  </div>
                ))}
                <button onClick={() => addCategory(fnIdx)} className="ml-4 type-2xs flex items-center gap-1" style={{ color: 'var(--color-accent)' }}><Plus className="w-3 h-3" /> Add Category</button>
              </div>
            )}
          </div>
        ))}
        <button onClick={addFunction} className="w-full type-sm py-3 rounded-xl flex items-center justify-center gap-1.5" style={{ color: 'var(--color-accent)', border: '1px dashed var(--color-border-bright)', background: 'var(--color-accent-dim)' }}><Plus className="w-4 h-4" /> Add Domain</button>
      </div>
    </div>
  )
}
