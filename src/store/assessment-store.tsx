import { createContext, useContext, useReducer, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { type Assessment, type SubcategoryAssessment, type FrameworkMeta, MaturityLevel, Priority, MATURITY_NUMERIC } from '../types/assessment'

export interface Snapshot {
  id: string
  label: string
  date: string
  avgMaturity: number
  assessed: number
  total: number
  subcategories: Record<string, { maturity: MaturityLevel; priority: Priority }>
}

function getSnapshotsKey(frameworkId: string) {
  return `snapshots-${frameworkId}`
}

function loadSnapshots(frameworkId: string): Snapshot[] {
  const stored = localStorage.getItem(getSnapshotsKey(frameworkId))
  if (stored) {
    try { return JSON.parse(stored) } catch { /* ignore */ }
  }
  return []
}

function saveSnapshots(frameworkId: string, snapshots: Snapshot[]) {
  localStorage.setItem(getSnapshotsKey(frameworkId), JSON.stringify(snapshots))
}

const CURRENT_VERSION = '1.0'

function getStorageKey(frameworkId: string) {
  return `assessment-${frameworkId}`
}

function getAllSubcategoryIds(framework: FrameworkMeta): string[] {
  return framework.data.flatMap(fn =>
    fn.categories.flatMap(cat =>
      cat.subcategories.map(sub => sub.id)
    )
  )
}

function createEmptyAssessment(): SubcategoryAssessment {
  return {
    maturity: MaturityLevel.NotAssessed,
    priority: Priority.NotSet,
    proof: '',
    plan: '',
    notes: '',
  }
}

function initializeAssessment(framework: FrameworkMeta): Assessment {
  const storageKey = getStorageKey(framework.id)
  const stored = localStorage.getItem(storageKey)
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Assessment
      const allIds = getAllSubcategoryIds(framework)
      for (const id of allIds) {
        if (!parsed.subcategories[id]) {
          parsed.subcategories[id] = createEmptyAssessment()
        }
      }
      return parsed
    } catch {
      // Fall through to create new
    }
  }
  const subcategories: Record<string, SubcategoryAssessment> = {}
  for (const id of getAllSubcategoryIds(framework)) {
    subcategories[id] = createEmptyAssessment()
  }
  return { version: CURRENT_VERSION, lastSaved: new Date().toISOString(), subcategories }
}

type Action =
  | { type: 'SET_FIELD'; id: string; field: keyof SubcategoryAssessment; value: string }
  | { type: 'IMPORT'; assessment: Assessment }
  | { type: 'RESET'; framework: FrameworkMeta }
  | { type: 'SWITCH_FRAMEWORK'; framework: FrameworkMeta }

function reducer(state: Assessment, action: Action): Assessment {
  switch (action.type) {
    case 'SET_FIELD': {
      return {
        ...state,
        lastSaved: new Date().toISOString(),
        subcategories: {
          ...state.subcategories,
          [action.id]: {
            ...state.subcategories[action.id],
            [action.field]: action.value,
          },
        },
      }
    }
    case 'IMPORT':
      return { ...action.assessment, lastSaved: new Date().toISOString() }
    case 'RESET': {
      const subcategories: Record<string, SubcategoryAssessment> = {}
      for (const id of getAllSubcategoryIds(action.framework)) {
        subcategories[id] = createEmptyAssessment()
      }
      return { version: CURRENT_VERSION, lastSaved: new Date().toISOString(), subcategories }
    }
    case 'SWITCH_FRAMEWORK':
      return initializeAssessment(action.framework)
    default:
      return state
  }
}

interface AssessmentContextType {
  assessment: Assessment
  setField: (id: string, field: keyof SubcategoryAssessment, value: string) => void
  importAssessment: (data: Assessment) => void
  resetAssessment: () => void
  saveSnapshot: (label: string) => void
  deleteSnapshot: (id: string) => void
  getSnapshots: () => Snapshot[]
}

const AssessmentContext = createContext<AssessmentContextType | null>(null)

export function AssessmentProvider({ children, framework }: { children: ReactNode; framework: FrameworkMeta }) {
  const [assessment, dispatch] = useReducer(reducer, framework, initializeAssessment)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  const frameworkIdRef = useRef(framework.id)

  // Switch assessment data when framework changes
  useEffect(() => {
    if (frameworkIdRef.current !== framework.id) {
      // Save current assessment before switching
      if (debounceRef.current) clearTimeout(debounceRef.current)
      localStorage.setItem(getStorageKey(frameworkIdRef.current), JSON.stringify(assessment))
      frameworkIdRef.current = framework.id
      dispatch({ type: 'SWITCH_FRAMEWORK', framework })
    }
  }, [framework.id])

  // Debounced save
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      localStorage.setItem(getStorageKey(framework.id), JSON.stringify(assessment))
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [assessment, framework.id])

  const setField = (id: string, field: keyof SubcategoryAssessment, value: string) => {
    dispatch({ type: 'SET_FIELD', id, field, value })
  }

  const importAssessment = (data: Assessment) => {
    dispatch({ type: 'IMPORT', assessment: data })
  }

  const resetAssessment = () => {
    dispatch({ type: 'RESET', framework })
  }

  const saveSnapshot = useCallback((label: string) => {
    const entries = Object.entries(assessment.subcategories)
    const total = entries.length
    const assessed = entries.filter(([, v]) => v.maturity !== MaturityLevel.NotAssessed).length
    const avgMaturity = total > 0
      ? entries.reduce((sum, [, v]) => sum + MATURITY_NUMERIC[v.maturity], 0) / total
      : 0

    const snapshot: Snapshot = {
      id: new Date().toISOString(),
      label,
      date: new Date().toISOString(),
      avgMaturity: Math.round(avgMaturity * 100) / 100,
      assessed,
      total,
      subcategories: Object.fromEntries(
        entries.map(([id, v]) => [id, { maturity: v.maturity, priority: v.priority }])
      ),
    }

    const snapshots = loadSnapshots(framework.id)
    snapshots.push(snapshot)
    saveSnapshots(framework.id, snapshots)
  }, [assessment, framework.id])

  const deleteSnapshot = useCallback((id: string) => {
    const snapshots = loadSnapshots(framework.id).filter(s => s.id !== id)
    saveSnapshots(framework.id, snapshots)
  }, [framework.id])

  const getSnapshots = useCallback(() => {
    return loadSnapshots(framework.id)
  }, [framework.id])

  return (
    <AssessmentContext.Provider value={{ assessment, setField, importAssessment, resetAssessment, saveSnapshot, deleteSnapshot, getSnapshots }}>
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext)
  if (!ctx) throw new Error('useAssessment must be used within AssessmentProvider')
  return ctx
}
