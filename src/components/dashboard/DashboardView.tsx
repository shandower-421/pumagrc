import { useMemo } from 'react'
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { useAssessment } from '../../store/assessment-store'
import { useFramework } from '../../store/framework-context'
import { MaturityLevel, Priority, MATURITY_NUMERIC, getFunctionColors } from '../../types/assessment'

const PRIORITY_CHART_COLORS: Record<Priority, string> = {
  [Priority.NotSet]: '#cbd5e1',
  [Priority.Working]: '#0284c7',
  [Priority.Next]: '#7c3aed',
  [Priority.High]: '#dc2626',
  [Priority.Med]: '#d97706',
  [Priority.Low]: '#94a3b8',
}

const cardStyle = {
  background: 'var(--color-surface-card)',
  border: '1px solid var(--color-border-dim)',
  borderRadius: '12px',
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
    <div className="p-4 sm:p-6 max-w-6xl">
      {/* Title */}
      <div className="mb-8">
        <h2 className="type-dashboard-title" style={{ color: 'var(--color-text-primary)' }}>
          {framework.name} <span style={{ color: 'var(--color-accent)' }}>Dashboard</span>
        </h2>
        <p className="type-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{framework.description}</p>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <div className="p-4" style={{ ...cardStyle, borderLeft: '3px solid var(--color-accent)' }}>
          <p className="type-label mb-2" style={{ color: 'var(--color-accent)' }}>Completion</p>
          <p className="type-stat" style={{ color: 'var(--color-accent)' }}>{completionPct}%</p>
          <p className="type-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{stats.assessed} of {stats.total}</p>
          <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-border-dim)' }}>
            <div className="h-full rounded-full" style={{ width: `${completionPct}%`, background: 'var(--color-accent)' }} />
          </div>
        </div>
        <div className="p-4" style={{ ...cardStyle, borderLeft: '3px solid var(--color-info)' }}>
          <p className="type-label mb-2" style={{ color: 'var(--color-info)' }}>Avg Maturity</p>
          <p className="type-stat" style={{ color: stats.avgMaturity >= 3 ? 'var(--color-info)' : 'var(--color-text-primary)' }}>{stats.avgMaturity.toFixed(1)}</p>
          <p className="type-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>out of 5.0</p>
        </div>
        <div className="p-4" style={{ ...cardStyle, borderLeft: '3px solid var(--color-danger)' }}>
          <p className="type-label mb-2" style={{ color: stats.highPriority > 0 ? 'var(--color-danger)' : 'var(--color-text-muted)' }}>High Priority</p>
          <p className="type-stat" style={{ color: stats.highPriority > 0 ? 'var(--color-danger)' : 'var(--color-text-primary)' }}>{stats.highPriority}</p>
          <p className="type-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>need attention</p>
        </div>
        <div className="p-4" style={{ ...cardStyle, borderLeft: '3px solid var(--color-success)' }}>
          <p className="type-label mb-2" style={{ color: stats.withPlan > 0 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>Plans</p>
          <p className="type-stat" style={{ color: stats.withPlan > 0 ? 'var(--color-success)' : 'var(--color-text-primary)' }}>{stats.withPlan}</p>
          <p className="type-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>improvement plans</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4" style={cardStyle}>
          <p className="type-label mb-4" style={{ color: 'var(--color-text-muted)' }}>Priority Breakdown</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} label={({ name, value }) => `${name}: ${value}`} labelLine={{ stroke: 'var(--color-text-muted)' }}>
                {priorityData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-default)', borderRadius: 8, color: 'var(--color-text-primary)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 lg:col-span-2" style={cardStyle}>
          <p className="type-label mb-4" style={{ color: 'var(--color-text-muted)' }}>Maturity by Domain</p>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--color-border-dim)" />
              <PolarAngleAxis dataKey="function" tick={{ fontSize: 11, fill: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }} />
              <Radar name="Maturity" dataKey="score" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip contentStyle={{ background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-default)', borderRadius: 8, color: 'var(--color-text-primary)' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
