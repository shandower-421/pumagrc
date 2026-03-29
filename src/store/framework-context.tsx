import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { type FrameworkMeta } from '../types/assessment'
import { FRAMEWORKS } from '../data/frameworks'

const STORAGE_KEY = 'active-framework'
const ENABLED_FRAMEWORKS_KEY = 'enabled-frameworks'

function loadEnabledFrameworks(allIds: string[]): Set<string> {
  const stored = localStorage.getItem(ENABLED_FRAMEWORKS_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as string[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        const set = new Set(parsed)
        // Auto-enable any newly added frameworks not yet in stored set
        for (const id of allIds) {
          if (!set.has(id) && !parsed.includes(id)) set.add(id)
        }
        return set
      }
    } catch { /* ignore */ }
  }
  const defaults = ['nist-csf-2', 'iso-27001', 'cmmc']
  return new Set(allIds.filter(id => defaults.includes(id)))
}

function saveEnabledFrameworks(enabled: Set<string>) {
  localStorage.setItem(ENABLED_FRAMEWORKS_KEY, JSON.stringify([...enabled]))
}

interface FrameworkContextType {
  framework: FrameworkMeta
  setFramework: (id: string) => void
  allFrameworks: FrameworkMeta[]
  enabledFrameworks: FrameworkMeta[]
  isFrameworkEnabled: (id: string) => boolean
  toggleFramework: (id: string) => void
}

const FrameworkContext = createContext<FrameworkContextType | null>(null)

export function FrameworkProvider({ children }: { children: ReactNode }) {
  const allFrameworks = FRAMEWORKS

  const [enabledIds, setEnabledIds] = useState<Set<string>>(() =>
    loadEnabledFrameworks(allFrameworks.map(f => f.id))
  )

  const [frameworkId, setFrameworkId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || FRAMEWORKS[0].id
  })

  const enabledFrameworks = allFrameworks.filter(f => enabledIds.has(f.id))
  const framework = enabledFrameworks.find(f => f.id === frameworkId)
    || enabledFrameworks[0]
    || FRAMEWORKS[0]

  const setFramework = (id: string) => {
    setFrameworkId(id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  const isFrameworkEnabled = useCallback((id: string) => {
    return enabledIds.has(id)
  }, [enabledIds])

  const toggleFramework = useCallback((id: string) => {
    setEnabledIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        if (next.size > 1) {
          next.delete(id)
          if (frameworkId === id) {
            const firstEnabled = allFrameworks.find(f => next.has(f.id))
            if (firstEnabled) {
              setFrameworkId(firstEnabled.id)
              localStorage.setItem(STORAGE_KEY, firstEnabled.id)
            }
          }
        }
      } else {
        next.add(id)
      }
      saveEnabledFrameworks(next)
      return next
    })
  }, [frameworkId, allFrameworks])

  return (
    <FrameworkContext.Provider value={{ framework, setFramework, allFrameworks, enabledFrameworks, isFrameworkEnabled, toggleFramework }}>
      {children}
    </FrameworkContext.Provider>
  )
}

export function useFramework() {
  const ctx = useContext(FrameworkContext)
  if (!ctx) throw new Error('useFramework must be used within FrameworkProvider')
  return ctx
}
