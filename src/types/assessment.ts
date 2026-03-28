export enum MaturityLevel {
  NotAssessed = 'not-assessed',
  AdHoc = 'ad-hoc',
  Repeatable = 'repeatable',
  Defined = 'defined',
  Managed = 'managed',
  Optimized = 'optimized',
}

export enum Priority {
  NotSet = 'not-set',
  Working = 'working',
  Next = 'next',
  High = 'high',
  Med = 'med',
  Low = 'low',
}

export interface LogEntry {
  id: string
  text: string
  timestamp: string
  resolved: boolean
}

export interface SubcategoryAssessment {
  maturity: MaturityLevel
  priority: Priority
  compensating: boolean
  proof: string
  plan: string
  notes: string
  activityLog: LogEntry[]
}

export interface Assessment {
  version: string
  lastSaved: string
  subcategories: Record<string, SubcategoryAssessment>
}

export interface SubcategoryDef {
  id: string
  description: string
}

export interface CategoryDef {
  id: string
  name: string
  subcategories: SubcategoryDef[]
}

export interface FunctionDef {
  id: string
  name: string
  description: string
  categories: CategoryDef[]
  color: string
}

export const MATURITY_LABELS: Record<MaturityLevel, string> = {
  [MaturityLevel.NotAssessed]: 'Not Assessed',
  [MaturityLevel.AdHoc]: 'Ad-Hoc',
  [MaturityLevel.Repeatable]: 'Repeatable',
  [MaturityLevel.Defined]: 'Defined',
  [MaturityLevel.Managed]: 'Managed',
  [MaturityLevel.Optimized]: 'Optimized',
}

export const MATURITY_DESCRIPTIONS: Record<MaturityLevel, string> = {
  [MaturityLevel.NotAssessed]: 'Not yet evaluated',
  [MaturityLevel.AdHoc]: '1 — Reactive, informal, undocumented processes',
  [MaturityLevel.Repeatable]: '2 — Some processes documented and repeatable',
  [MaturityLevel.Defined]: '3 — Standardized, documented policies in place',
  [MaturityLevel.Managed]: '4 — Measured, monitored, and controlled',
  [MaturityLevel.Optimized]: '5 — Continuously improving, fully integrated',
}

export const PRIORITY_DESCRIPTIONS: Record<Priority, string> = {
  [Priority.NotSet]: 'Not yet prioritized',
  [Priority.Working]: 'Control is in place and operating',
  [Priority.Next]: 'Scheduled for upcoming work',
  [Priority.High]: 'Urgent — address immediately',
  [Priority.Med]: 'Important but not urgent',
  [Priority.Low]: 'Address when resources allow',
}

export const MATURITY_COLORS: Record<MaturityLevel, string> = {
  [MaturityLevel.NotAssessed]: 'bg-slate-100 text-slate-500',
  [MaturityLevel.AdHoc]: 'bg-red-50 text-red-700',
  [MaturityLevel.Repeatable]: 'bg-amber-50 text-amber-700',
  [MaturityLevel.Defined]: 'bg-yellow-50 text-yellow-700',
  [MaturityLevel.Managed]: 'bg-sky-50 text-sky-700',
  [MaturityLevel.Optimized]: 'bg-emerald-50 text-emerald-700',
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  [Priority.NotSet]: 'Not Set',
  [Priority.Working]: 'Functional',
  [Priority.Next]: 'Next',
  [Priority.High]: 'High',
  [Priority.Med]: 'Med',
  [Priority.Low]: 'Low',
}

export const PRIORITY_HEX: Record<Priority, string> = {
  [Priority.NotSet]: '#cbd5e1',
  [Priority.High]: '#ef4444',
  [Priority.Med]: '#f59e0b',
  [Priority.Low]: '#eab308',
  [Priority.Next]: '#0284c7',
  [Priority.Working]: '#059669',
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  [Priority.NotSet]: 'bg-slate-100 text-slate-500',
  [Priority.Working]: 'bg-emerald-50 text-emerald-700',
  [Priority.Next]: 'bg-sky-50 text-sky-700',
  [Priority.High]: 'bg-red-50 text-red-700',
  [Priority.Med]: 'bg-amber-50 text-amber-700',
  [Priority.Low]: 'bg-yellow-50 text-yellow-700',
}

export const MATURITY_HEX: Record<MaturityLevel, string> = {
  [MaturityLevel.NotAssessed]: '#cbd5e1',
  [MaturityLevel.AdHoc]: '#ef4444',
  [MaturityLevel.Repeatable]: '#f59e0b',
  [MaturityLevel.Defined]: '#eab308',
  [MaturityLevel.Managed]: '#0284c7',
  [MaturityLevel.Optimized]: '#059669',
}

export const MATURITY_NUMERIC: Record<MaturityLevel, number> = {
  [MaturityLevel.NotAssessed]: 0,
  [MaturityLevel.AdHoc]: 1,
  [MaturityLevel.Repeatable]: 2,
  [MaturityLevel.Defined]: 3,
  [MaturityLevel.Managed]: 4,
  [MaturityLevel.Optimized]: 5,
}

export interface FrameworkMeta {
  id: string
  name: string
  shortName: string
  version: string
  description: string
  data: FunctionDef[]
}

export interface FunctionColors {
  bg: string
  text: string
  border: string
  light: string
}

const COLOR_PALETTE: FunctionColors[] = [
  { bg: 'bg-purple-600', text: 'text-purple-700', border: 'border-purple-300', light: 'bg-purple-50' },
  { bg: 'bg-blue-600', text: 'text-blue-700', border: 'border-blue-300', light: 'bg-blue-50' },
  { bg: 'bg-green-600', text: 'text-green-700', border: 'border-green-300', light: 'bg-green-50' },
  { bg: 'bg-amber-600', text: 'text-amber-700', border: 'border-amber-300', light: 'bg-amber-50' },
  { bg: 'bg-orange-600', text: 'text-orange-700', border: 'border-orange-300', light: 'bg-orange-50' },
  { bg: 'bg-red-600', text: 'text-red-700', border: 'border-red-300', light: 'bg-red-50' },
  { bg: 'bg-teal-600', text: 'text-teal-700', border: 'border-teal-300', light: 'bg-teal-50' },
  { bg: 'bg-indigo-600', text: 'text-indigo-700', border: 'border-indigo-300', light: 'bg-indigo-50' },
  { bg: 'bg-pink-600', text: 'text-pink-700', border: 'border-pink-300', light: 'bg-pink-50' },
  { bg: 'bg-cyan-600', text: 'text-cyan-700', border: 'border-cyan-300', light: 'bg-cyan-50' },
  { bg: 'bg-lime-600', text: 'text-lime-700', border: 'border-lime-300', light: 'bg-lime-50' },
  { bg: 'bg-rose-600', text: 'text-rose-700', border: 'border-rose-300', light: 'bg-rose-50' },
  { bg: 'bg-violet-600', text: 'text-violet-700', border: 'border-violet-300', light: 'bg-violet-50' },
  { bg: 'bg-emerald-600', text: 'text-emerald-700', border: 'border-emerald-300', light: 'bg-emerald-50' },
]

export function getFunctionColors(framework: FrameworkMeta): Record<string, FunctionColors> {
  const map: Record<string, FunctionColors> = {}
  framework.data.forEach((fn, i) => {
    map[fn.id] = COLOR_PALETTE[i % COLOR_PALETTE.length]
  })
  return map
}
