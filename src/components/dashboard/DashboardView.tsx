import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { useAssessment } from '../../store/assessment-store'
import { useFramework } from '../../store/framework-context'
import { MaturityLevel, Priority, MATURITY_LABELS, MATURITY_NUMERIC, getFunctionColors } from '../../types/assessment'

const MATURITY_CHART_COLORS: Record<MaturityLevel, string> = {
  [MaturityLevel.NotAssessed]: '#2a2d3a',
  [MaturityLevel.AdHoc]: '#ef4444',
  [MaturityLevel.Repeatable]: '#f97316',
  [MaturityLevel.Defined]: '#eab308',
  [MaturityLevel.Managed]: '#22d3ee',
  [MaturityLevel.Optimized]: '#22c55e',
}

const PRIORITY_CHART_COLORS: Record<Priority, string> = {
  [Priority.NotSet]: '#2a2d3a',
  [Priority.Working]: '#22d3ee',
  [Priority.Next]: '#a78bfa',
  [Priority.High]: '#ef4444',
  [Priority.Med]: '#eab308',
  [Priority.Low]: '#6b7280',
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
    <div className="p-4 sm:p-6 max-w-6xl">
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-light tracking-tight" style={{ color: 'var(--color-text-primary)', fontFamily: "'Instrument Serif', serif" }}>
          {framework.name} <span style={{ color: 'var(--color-accent)' }}>Dashboard</span>
        </h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{framework.description}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
        {[
          { label: 'COMPLETION', value: `${completionPct}%`, sub: `${stats.assessed} of ${stats.total} assessed`, accent: completionPct >= 75, progress: completionPct },
          { label: 'AVG MATURITY', value: stats.avgMaturity.toFixed(1), sub: 'out of 5.0', accent: stats.avgMaturity >= 3 },
          { label: 'HIGH PRIORITY', value: stats.highPriority.toString(), sub: 'items need attention', danger: stats.highPriority > 0 },
          { label: 'WITH PLANS', value: stats.withPlan.toString(), sub: 'improvement plans', success: stats.withPlan > 0 },
        ].map((card, i) => (
          <div key={i} className="p-4" style={cardStyle}>
            <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{card.label}</p>
            <p className="text-3xl font-light" style={{
              color: card.danger ? 'var(--color-danger)' : card.success ? 'var(--color-success)' : card.accent ? 'var(--color-accent)' : 'var(--color-text-primary)',
              fontFamily: "'Instrument Serif', serif",
            }}>{card.value}</p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--color-text-muted)' }}>{card.sub}</p>
            {card.progress !== undefined && (
              <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-border-dim)' }}>
                <div className="h-full rounded-full" style={{ width: `${card.progress}%`, background: 'var(--color-accent)', boxShadow: '0 0 8px var(--color-accent-glow)' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Per-function progress */}
      <div className="mb-8" style={cardStyle}>
        <div className="p-4 pb-3" style={{ borderBottom: '1px solid var(--color-border-dim)' }}>
          <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>Domain Coverage</p>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {framework.data.map(fn => {
            const subs = fn.categories.flatMap(c => c.subcategories)
            const assessed = subs.filter(s => assessment.subcategories[s.id]?.maturity !== MaturityLevel.NotAssessed).length
            const pct = Math.round((assessed / subs.length) * 100)
            const colors = functionColors[fn.id]
            return (
              <div key={fn.id} className="rounded-lg p-3" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border-dim)' }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors.bg}`} />
                  <p className="text-[10px] font-mono font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{fn.id}</p>
                </div>
                <p className="text-xs truncate mb-1.5" style={{ color: 'var(--color-text-muted)' }}>{fn.name}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-border-dim)' }}>
                    <div className={`h-full rounded-full ${colors.bg}`} style={{ width: `${pct}%`, opacity: 0.8 }} />
                  </div>
                  <span className="text-[10px] font-mono" style={{ color: pct === 100 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>{assessed}/{subs.length}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4" style={cardStyle}>
          <p className="text-[10px] font-medium uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>Maturity Distribution</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={maturityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-dim)" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
              <Tooltip contentStyle={{ background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-default)', borderRadius: 8, color: 'var(--color-text-primary)' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {maturityData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4" style={cardStyle}>
          <p className="text-[10px] font-medium uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>Priority Breakdown</p>
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
          <p className="text-[10px] font-medium uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>Maturity by Domain</p>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--color-border-dim)" />
              <PolarAngleAxis dataKey="function" tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 9, fill: 'var(--color-text-muted)' }} />
              <Radar name="Maturity" dataKey="score" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip contentStyle={{ background: 'var(--color-surface-overlay)', border: '1px solid var(--color-border-default)', borderRadius: 8, color: 'var(--color-text-primary)' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
