import { useMemo } from 'react'
import { ClipboardList } from 'lucide-react'
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { useAssessment } from '../../store/assessment-store'
import { useFramework } from '../../store/framework-context'
import { MaturityLevel, Priority, MATURITY_NUMERIC, PRIORITY_LABELS, getFunctionColors } from '../../types/assessment'
import { useAnimatedNumber } from '../../hooks/useAnimatedNumber'

const PRIORITY_CHART_COLORS: Record<Priority, string> = {
  [Priority.NotSet]: '#cbd5e1',
  [Priority.Working]: '#059669',
  [Priority.Next]: '#0284c7',
  [Priority.High]: '#ef4444',
  [Priority.Med]: '#f59e0b',
  [Priority.Low]: '#eab308',
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
    const compensating = entries.filter(e => e.compensating).length
    const avgMaturity = total > 0
      ? entries.reduce((sum, e) => sum + MATURITY_NUMERIC[e.maturity], 0) / total
      : 0
    return { total, assessed, withPlan, highPriority, compensating, avgMaturity }
  }, [assessment])

  const priorityData = useMemo(() => {
    return Object.values(Priority)
      .map(p => ({
        name: PRIORITY_LABELS[p],
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

  // Animated counters
  const animCompletion = useAnimatedNumber(completionPct, 500)
  const animMaturity = useAnimatedNumber(stats.avgMaturity, 500, 1)
  const animHighPriority = useAnimatedNumber(stats.highPriority, 400)
  const animPlans = useAnimatedNumber(stats.withPlan, 400)

  return (
    <div className="p-4 sm:p-6 max-w-6xl">
      {/* Title */}
      <div className="mb-6">
        <h2 className="type-dashboard-title" style={{ color: 'var(--color-text-primary)' }}>
          {framework.name} <span style={{ color: 'var(--color-accent)' }}>Dashboard</span>
        </h2>
        <p className="type-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{framework.description}</p>
      </div>

      {/* Empty state */}
      {stats.assessed === 0 && (
        <div className="rounded-xl p-8 text-center mb-6" style={{ background: 'var(--color-surface-card)', border: '1px dashed var(--color-border-default)' }}>
          <ClipboardList className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--color-accent)' }} />
          <p className="type-body font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>Start your assessment</p>
          <p className="type-sm mb-1" style={{ color: 'var(--color-text-muted)', maxWidth: '360px', margin: '0 auto' }}>
            Pick a category from the sidebar to begin assessing controls. Your dashboard will populate as you go.
          </p>
        </div>
      )}

      {/* Summary Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="p-4 card-interactive animate-stagger-in" style={{ ...cardStyle, borderLeft: '3px solid var(--color-accent)', animationDelay: '0ms' }}>
          <p className="type-label mb-2" style={{ color: 'var(--color-accent)' }}>Completion</p>
          <p className="type-stat" style={{ color: 'var(--color-accent)' }}>{animCompletion}%</p>
          <p className="type-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{stats.assessed} of {stats.total}</p>
          <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-border-dim)' }}>
            <div className={`h-full rounded-full animate-bar-fill ${completionPct === 100 ? 'shimmer-bar' : ''}`} style={{ width: `${completionPct}%`, background: 'var(--color-accent)' }} />
          </div>
        </div>
        <div className="p-4 card-interactive animate-stagger-in" style={{ ...cardStyle, borderLeft: '3px solid var(--color-info)', animationDelay: '30ms' }}>
          <p className="type-label mb-2" style={{ color: 'var(--color-info)' }}>Avg Maturity</p>
          <p className="type-stat" style={{ color: stats.avgMaturity >= 3 ? 'var(--color-info)' : 'var(--color-text-primary)' }}>{animMaturity}</p>
          <p className="type-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>out of 5.0</p>
        </div>
        <div className="p-4 card-interactive animate-stagger-in" style={{ ...cardStyle, borderLeft: '3px solid var(--color-danger)', animationDelay: '60ms' }}>
          <p className="type-label mb-2" style={{ color: stats.highPriority > 0 ? 'var(--color-danger)' : 'var(--color-text-muted)' }}>High Priority</p>
          <p className="type-stat" style={{ color: stats.highPriority > 0 ? 'var(--color-danger)' : 'var(--color-text-primary)' }}>{animHighPriority}</p>
          <p className="type-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>need attention</p>
        </div>
        <div className="p-4 card-interactive animate-stagger-in" style={{ ...cardStyle, borderLeft: '3px solid var(--color-success)', animationDelay: '90ms' }}>
          <p className="type-label mb-2" style={{ color: stats.withPlan > 0 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>Plans</p>
          <p className="type-stat" style={{ color: stats.withPlan > 0 ? 'var(--color-success)' : 'var(--color-text-primary)' }}>{animPlans}</p>
          <p className="type-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>improvement plans</p>
        </div>
      </div>

      {/* Charts — side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="p-4 card-interactive animate-stagger-in" style={{ ...cardStyle, animationDelay: '120ms' }}>
          <p className="type-label mb-4" style={{ color: 'var(--color-text-muted)' }}>Priority Breakdown</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={75} innerRadius={42} label={({ value }) => value} labelLine={false}>
                {priorityData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-default)', borderRadius: 8, color: 'var(--color-text-primary)' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-muted)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 card-interactive animate-stagger-in" style={{ ...cardStyle, animationDelay: '150ms' }}>
          <p className="type-label mb-4" style={{ color: 'var(--color-text-muted)' }}>Maturity by Domain</p>
          <ResponsiveContainer width="100%" height={260}>
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

      {/* Secondary stats */}
      {stats.compensating > 0 && (
        <div className="p-3 rounded-lg inline-flex items-center gap-2 type-sm" style={{ background: 'rgba(79,70,229,0.05)', border: '1px solid rgba(79,70,229,0.12)', color: '#4f46e5' }}>
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#4f46e5' }} />
          {stats.compensating} compensating {stats.compensating === 1 ? 'control' : 'controls'}
        </div>
      )}
    </div>
  )
}
