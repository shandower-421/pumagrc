import { createContext, useContext, useReducer, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { type Assessment, type SubcategoryAssessment, type LogEntry, type FrameworkMeta, MaturityLevel, Priority, MATURITY_NUMERIC } from '../types/assessment'

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

const CURRENT_VERSION = '1.1'

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
    compensating: false,
    proof: '',
    plan: '',
    notes: '',
    activityLog: [],
  }
}

// Migrate legacy notes string into activityLog entries
function migrateSubcategory(sub: any, fallbackTimestamp: string): SubcategoryAssessment {
  if (!sub.activityLog) {
    sub.activityLog = []
    if (sub.notes && typeof sub.notes === 'string' && sub.notes.trim()) {
      sub.activityLog.push({
        id: 'migrated-' + Date.now(),
        text: sub.notes.trim(),
        timestamp: fallbackTimestamp,
        resolved: false,
      })
      sub.notes = ''
    }
  }
  if (sub.compensating === undefined) sub.compensating = false
  return sub as SubcategoryAssessment
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
        } else {
          parsed.subcategories[id] = migrateSubcategory(parsed.subcategories[id], parsed.lastSaved || new Date().toISOString())
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
  | { type: 'SET_FIELD'; id: string; field: keyof SubcategoryAssessment; value: string | boolean | number }
  | { type: 'ADD_LOG_ENTRY'; id: string; text: string }
  | { type: 'TOGGLE_LOG_RESOLVED'; id: string; entryId: string }
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
    case 'ADD_LOG_ENTRY': {
      const sub = state.subcategories[action.id]
      const entry: LogEntry = {
        id: Date.now().toString(),
        text: action.text,
        timestamp: new Date().toISOString(),
        resolved: false,
      }
      return {
        ...state,
        lastSaved: new Date().toISOString(),
        subcategories: {
          ...state.subcategories,
          [action.id]: {
            ...sub,
            activityLog: [entry, ...(sub?.activityLog || [])],
          },
        },
      }
    }
    case 'TOGGLE_LOG_RESOLVED': {
      const sub = state.subcategories[action.id]
      return {
        ...state,
        lastSaved: new Date().toISOString(),
        subcategories: {
          ...state.subcategories,
          [action.id]: {
            ...sub,
            activityLog: (sub?.activityLog || []).map(e =>
              e.id === action.entryId ? { ...e, resolved: !e.resolved } : e
            ),
          },
        },
      }
    }
    case 'IMPORT': {
      // Migrate imported data
      const imported = { ...action.assessment, lastSaved: new Date().toISOString() }
      for (const [, sub] of Object.entries(imported.subcategories)) {
        migrateSubcategory(sub, imported.lastSaved)
      }
      return imported
    }
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
  setField: (id: string, field: keyof SubcategoryAssessment, value: string | boolean | number) => void
  setFieldForFramework: (frameworkId: string, controlId: string, field: keyof SubcategoryAssessment, value: string | boolean | number) => void
  getAssessmentForFramework: (frameworkId: string, controlId: string) => SubcategoryAssessment
  addLogEntry: (id: string, text: string) => void
  toggleLogResolved: (id: string, entryId: string) => void
  addLogEntryForFramework: (frameworkId: string, controlId: string, text: string) => void
  toggleLogResolvedForFramework: (frameworkId: string, controlId: string, entryId: string) => void
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

  useEffect(() => {
    if (frameworkIdRef.current !== framework.id) {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      localStorage.setItem(getStorageKey(frameworkIdRef.current), JSON.stringify(assessment))
      frameworkIdRef.current = framework.id
      dispatch({ type: 'SWITCH_FRAMEWORK', framework })
    }
  }, [framework.id])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      localStorage.setItem(getStorageKey(framework.id), JSON.stringify(assessment))
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [assessment, framework.id])

  const setField = (id: string, field: keyof SubcategoryAssessment, value: string | boolean | number) => {
    dispatch({ type: 'SET_FIELD', id, field, value })
  }

  const setFieldForFramework = useCallback((frameworkId: string, controlId: string, field: keyof SubcategoryAssessment, value: string | boolean | number) => {
    if (frameworkId === framework.id) {
      dispatch({ type: 'SET_FIELD', id: controlId, field, value })
      return
    }
    const key = getStorageKey(frameworkId)
    const stored = localStorage.getItem(key)
    const data: Assessment = stored ? JSON.parse(stored) : { version: CURRENT_VERSION, lastSaved: new Date().toISOString(), subcategories: {} }
    if (!data.subcategories[controlId]) {
      data.subcategories[controlId] = createEmptyAssessment()
    }
    ;(data.subcategories[controlId] as any)[field] = value
    data.lastSaved = new Date().toISOString()
    localStorage.setItem(key, JSON.stringify(data))
  }, [framework.id])

  const getAssessmentForFramework = useCallback((frameworkId: string, controlId: string): SubcategoryAssessment => {
    if (frameworkId === framework.id) {
      return assessment.subcategories[controlId] || createEmptyAssessment()
    }
    const key = getStorageKey(frameworkId)
    const stored = localStorage.getItem(key)
    if (stored) {
      try {
        const data = JSON.parse(stored) as Assessment
        const sub = data.subcategories[controlId]
        return sub ? migrateSubcategory(sub, data.lastSaved) : createEmptyAssessment()
      } catch { /* ignore */ }
    }
    return createEmptyAssessment()
  }, [framework.id, assessment])

  const addLogEntry = (id: string, text: string) => {
    dispatch({ type: 'ADD_LOG_ENTRY', id, text })
  }

  const toggleLogResolved = (id: string, entryId: string) => {
    dispatch({ type: 'TOGGLE_LOG_RESOLVED', id, entryId })
  }

  const addLogEntryForFramework = useCallback((frameworkId: string, controlId: string, text: string) => {
    if (frameworkId === framework.id) {
      dispatch({ type: 'ADD_LOG_ENTRY', id: controlId, text })
      return
    }
    const key = getStorageKey(frameworkId)
    const stored = localStorage.getItem(key)
    const data: Assessment = stored ? JSON.parse(stored) : { version: CURRENT_VERSION, lastSaved: new Date().toISOString(), subcategories: {} }
    if (!data.subcategories[controlId]) data.subcategories[controlId] = createEmptyAssessment()
    const entry: LogEntry = { id: Date.now().toString(), text, timestamp: new Date().toISOString(), resolved: false }
    data.subcategories[controlId].activityLog = [entry, ...(data.subcategories[controlId].activityLog || [])]
    data.lastSaved = new Date().toISOString()
    localStorage.setItem(key, JSON.stringify(data))
  }, [framework.id])

  const toggleLogResolvedForFramework = useCallback((frameworkId: string, controlId: string, entryId: string) => {
    if (frameworkId === framework.id) {
      dispatch({ type: 'TOGGLE_LOG_RESOLVED', id: controlId, entryId })
      return
    }
    const key = getStorageKey(frameworkId)
    const stored = localStorage.getItem(key)
    if (!stored) return
    const data: Assessment = JSON.parse(stored)
    const sub = data.subcategories[controlId]
    if (!sub?.activityLog) return
    sub.activityLog = sub.activityLog.map(e => e.id === entryId ? { ...e, resolved: !e.resolved } : e)
    data.lastSaved = new Date().toISOString()
    localStorage.setItem(key, JSON.stringify(data))
  }, [framework.id])

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
    <AssessmentContext.Provider value={{ assessment, setField, setFieldForFramework, getAssessmentForFramework, addLogEntry, toggleLogResolved, addLogEntryForFramework, toggleLogResolvedForFramework, importAssessment, resetAssessment, saveSnapshot, deleteSnapshot, getSnapshots }}>
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext)
  if (!ctx) throw new Error('useAssessment must be used within AssessmentProvider')
  return ctx
}
