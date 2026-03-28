import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { type FrameworkMeta } from '../types/assessment'
import { FRAMEWORKS } from '../data/frameworks'

const STORAGE_KEY = 'active-framework'
const CUSTOM_FRAMEWORKS_KEY = 'custom-frameworks'

function loadCustomFrameworks(): FrameworkMeta[] {
  const stored = localStorage.getItem(CUSTOM_FRAMEWORKS_KEY)
  if (stored) {
    try { return JSON.parse(stored) } catch { /* ignore */ }
  }
  return []
}

function saveCustomFrameworks(frameworks: FrameworkMeta[]) {
  localStorage.setItem(CUSTOM_FRAMEWORKS_KEY, JSON.stringify(frameworks))
}

interface FrameworkContextType {
  framework: FrameworkMeta
  setFramework: (id: string) => void
  allFrameworks: FrameworkMeta[]
  addCustomFramework: (fw: FrameworkMeta) => void
  deleteCustomFramework: (id: string) => void
  isCustom: (id: string) => boolean
}

const FrameworkContext = createContext<FrameworkContextType | null>(null)

export function FrameworkProvider({ children }: { children: ReactNode }) {
  const [customFrameworks, setCustomFrameworks] = useState<FrameworkMeta[]>(loadCustomFrameworks)
  const [frameworkId, setFrameworkId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || FRAMEWORKS[0].id
  })

  const allFrameworks = [...FRAMEWORKS, ...customFrameworks]
  const framework = allFrameworks.find(f => f.id === frameworkId) || FRAMEWORKS[0]

  const setFramework = (id: string) => {
    setFrameworkId(id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  const addCustomFramework = useCallback((fw: FrameworkMeta) => {
    setCustomFrameworks(prev => {
      const updated = [...prev.filter(f => f.id !== fw.id), fw]
      saveCustomFrameworks(updated)
      return updated
    })
  }, [])

  const deleteCustomFramework = useCallback((id: string) => {
    setCustomFrameworks(prev => {
      const updated = prev.filter(f => f.id !== id)
      saveCustomFrameworks(updated)
      return updated
    })
    // Switch away if we're on the deleted framework
    if (frameworkId === id) {
      setFrameworkId(FRAMEWORKS[0].id)
      localStorage.setItem(STORAGE_KEY, FRAMEWORKS[0].id)
    }
    // Clean up assessment data
    localStorage.removeItem(`assessment-${id}`)
    localStorage.removeItem(`snapshots-${id}`)
  }, [frameworkId])

  const isCustom = useCallback((id: string) => {
    return !FRAMEWORKS.some(f => f.id === id)
  }, [])

  return (
    <FrameworkContext.Provider value={{ framework, setFramework, allFrameworks, addCustomFramework, deleteCustomFramework, isCustom }}>
      {children}
    </FrameworkContext.Provider>
  )
}

export function useFramework() {
  const ctx = useContext(FrameworkContext)
  if (!ctx) throw new Error('useFramework must be used within FrameworkProvider')
  return ctx
}
