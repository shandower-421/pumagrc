import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { useAssessment } from '../../store/assessment-store'
import { useFramework } from '../../store/framework-context'
import { MaturityLevel, Priority, MATURITY_LABELS, MATURITY_NUMERIC, getFunctionColors } from '../../types/assessment'

const MATURITY_CHART_COLORS: Record<MaturityLevel, string> = {
  [MaturityLevel.NotAssessed]: '#e5e7eb',
  [MaturityLevel.AdHoc]: '#fca5a5',
  [MaturityLevel.Repeatable]: '#fdba74',
  [MaturityLevel.Defined]: '#fde047',
  [MaturityLevel.Managed]: '#93c5fd',
  [MaturityLevel.Optimized]: '#86efac',
}

const PRIORITY_CHART_COLORS: Record<Priority, string> = {
  [Priority.NotSet]: '#e5e7eb',
  [Priority.Working]: '#93c5fd',
  [Priority.Next]: '#c4b5fd',
  [Priority.High]: '#fca5a5',
  [Priority.Med]: '#fde047',
  [Priority.Low]: '#d1d5db',
}

export function DashboardView() {
  const { assessment } = useAssessment()
  const { framework } = useFramework()
  const functionColors = getFunctionColors(framework)

  const stats = useMemo(() => {
    const entries = Object.values(assessment.subcategories)
    const total = entries.length
    const assessed = entries.filter(e => e.maturity !== MaturityLevel.NotAssessed).length
    const withPlan = entries.filter(e => e.plan.trim().length > 0).length
    const highPriority = entries.filter(e => e.priority === Priority.High).length

    const avgMaturity = total > 0
      ? entries.reduce((sum, e) => sum + MATURITY_NUMERIC[e.maturity], 0) / total
      : 0

    return { total, assessed, withPlan, highPriority, avgMaturity }
  }, [assessment])

  const maturityData = useMemo(() => {
    return Object.values(MaturityLevel).map(level => ({
      name: MATURITY_LABELS[level],
      count: Object.values(assessment.subcategories).filter(e => e.maturity === level).length,
      fill: MATURITY_CHART_COLORS[level],
    }))
  }, [assessment])

  const priorityData = useMemo(() => {
    return Object.values(Priority)
      .map(p => ({
        name: p === Priority.NotSet ? 'Not Set' : p.charAt(0).toUpperCase() + p.slice(1),
        value: Object.values(assessment.subcategories).filter(e => e.priority === p).length,
        fill: PRIORITY_CHART_COLORS[p],
      }))
      .filter(d => d.value > 0)
  }, [assessment])

  const radarData = useMemo(() => {
    return framework.data.map(fn => {
      const subs = fn.categories.flatMap(c => c.subcategories)
      const avg = subs.length > 0
        ? subs.reduce((sum, sub) => sum + MATURITY_NUMERIC[assessment.subcategories[sub.id]?.maturity || MaturityLevel.NotAssessed], 0) / subs.length
        : 0
      return { function: fn.id, score: Math.round(avg * 100) / 100, fullMark: 5 }
    })
  }, [assessment, framework])

  const completionPct = Math.round((stats.assessed / stats.total) * 100)

  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-xl font-semibold text-slate-900 mb-1">{framework.name} Dashboard</h2>
      <p className="text-sm text-slate-500 mb-6">{framework.description}</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Completion</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{completionPct}%</p>
          <p className="text-xs text-slate-400">{stats.assessed} of {stats.total} assessed</p>
          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${completionPct}%` }} />
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Maturity</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.avgMaturity.toFixed(1)}</p>
          <p className="text-xs text-slate-400">out of 5.0</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">High Priority</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.highPriority}</p>
          <p className="text-xs text-slate-400">items need attention</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">With Plans</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.withPlan}</p>
          <p className="text-xs text-slate-400">improvement plans</p>
        </div>
      </div>

      {/* Per-function progress */}
      <div className={`grid gap-3 mb-8`} style={{ gridTemplateColumns: `repeat(${Math.min(framework.data.length, 6)}, minmax(0, 1fr))` }}>
        {framework.data.map(fn => {
          const subs = fn.categories.flatMap(c => c.subcategories)
          const assessed = subs.filter(s => assessment.subcategories[s.id]?.maturity !== MaturityLevel.NotAssessed).length
          const pct = Math.round((assessed / subs.length) * 100)
          const colors = functionColors[fn.id]
          return (
            <div key={fn.id} className={`border rounded-lg p-3 ${colors.border} ${colors.light}`}>
              <p className={`text-xs font-semibold ${colors.text}`}>{fn.id}</p>
              <p className="text-sm font-medium text-slate-700 truncate">{fn.name}</p>
              <p className="text-xs text-slate-500 mt-1">{assessed}/{subs.length}</p>
              <div className="mt-1 h-1 bg-white/60 rounded-full overflow-hidden">
                <div className={`h-full ${colors.bg} rounded-full`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Maturity Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={maturityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {maturityData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Priority Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: ${value}`}>
                {priorityData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 col-span-2">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Maturity by Domain</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="function" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10 }} />
              <Radar name="Maturity" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
