import { createContext, useContext, useState, type ReactNode } from 'react'
import { type FrameworkMeta } from '../types/assessment'
import { FRAMEWORKS } from '../data/frameworks'

const STORAGE_KEY = 'active-framework'

interface FrameworkContextType {
  framework: FrameworkMeta
  setFramework: (id: string) => void
  allFrameworks: FrameworkMeta[]
}

const FrameworkContext = createContext<FrameworkContextType | null>(null)

export function FrameworkProvider({ children }: { children: ReactNode }) {
  const [frameworkId, setFrameworkId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || FRAMEWORKS[0].id
  })

  const framework = FRAMEWORKS.find(f => f.id === frameworkId) || FRAMEWORKS[0]

  const setFramework = (id: string) => {
    setFrameworkId(id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  return (
    <FrameworkContext.Provider value={{ framework, setFramework, allFrameworks: FRAMEWORKS }}>
      {children}
    </FrameworkContext.Provider>
  )
}

export function useFramework() {
  const ctx = useContext(FrameworkContext)
  if (!ctx) throw new Error('useFramework must be used within FrameworkProvider')
  return ctx
}
