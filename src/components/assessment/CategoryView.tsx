import { useEffect, useCallback } from 'react'
import { useFramework } from '../../store/framework-context'
import { useAssessment } from '../../store/assessment-store'
import { getFunctionColors, MaturityLevel } from '../../types/assessment'
import { SubcategoryCard } from './SubcategoryCard'

interface CategoryViewProps {
  categoryId: string
}

export function CategoryView({ categoryId }: CategoryViewProps) {
  const { framework } = useFramework()
  const { assessment } = useAssessment()

  // Keyboard shortcut: J/K to navigate between controls
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return
    const cards = document.querySelectorAll<HTMLButtonElement>('[aria-controls]')
    const expandedIdx = Array.from(cards).findIndex(c => c.getAttribute('aria-expanded') === 'true')
    if (e.key === 'j' || e.key === 'ArrowDown') {
      e.preventDefault()
      const next = expandedIdx < cards.length - 1 ? expandedIdx + 1 : 0
      cards[next]?.click()
      cards[next]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else if (e.key === 'k' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = expandedIdx > 0 ? expandedIdx - 1 : cards.length - 1
      cards[prev]?.click()
      cards[prev]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const fn = framework.data.find(f => f.categories.some(c => c.id === categoryId))
  const category = fn?.categories.find(c => c.id === categoryId)

  if (!fn || !category) {
    return <div className="p-8" style={{ color: 'var(--color-text-muted)' }}>Category not found.</div>
  }

  const functionColors = getFunctionColors(framework)
  const colors = functionColors[fn.id]
  const cardColor = `${colors.light} ${colors.text}`

  const assessed = category.subcategories.filter(
    sub => assessment.subcategories[sub.id]?.maturity !== MaturityLevel.NotAssessed
  ).length

  return (
    <div className="p-4 sm:p-6 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className={`type-2xs type-mono font-semibold px-2 py-0.5 rounded ${colors.bg} text-white`}>{fn.id}</span>
          <span className="type-label" style={{ color: 'var(--color-text-muted)' }}>{fn.name}</span>
        </div>
        <h2 className="type-page-title" style={{ color: 'var(--color-text-primary)' }}>
          {category.id} — {category.name}
        </h2>
        <div className="flex items-center gap-3 mt-1">
          <p className="type-mono-sm" style={{ color: assessed === category.subcategories.length ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
            {assessed}/{category.subcategories.length} assessed
            {assessed === category.subcategories.length && ' — Complete'}
          </p>
          <span className="type-2xs hidden sm:inline-flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
            <kbd className="type-2xs px-1 py-0.5 rounded" style={{ background: 'var(--color-surface-tint)', border: '1px solid var(--color-border-dim)', fontFamily: 'var(--font-mono)' }}>J</kbd>
            <kbd className="type-2xs px-1 py-0.5 rounded" style={{ background: 'var(--color-surface-tint)', border: '1px solid var(--color-border-dim)', fontFamily: 'var(--font-mono)' }}>K</kbd>
            to navigate
          </span>
        </div>
        <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-border-dim)', maxWidth: '280px' }}>
          <div className={`h-full rounded-full ${assessed === category.subcategories.length ? 'animate-bar-fill shimmer-bar' : 'animate-bar-fill'}`} style={{ width: `${Math.round((assessed / category.subcategories.length) * 100)}%`, background: assessed === category.subcategories.length ? 'var(--color-success)' : 'var(--color-accent)' }} />
        </div>
      </div>

      <div className="space-y-2">
        {category.subcategories.map(sub => (
          <SubcategoryCard
            key={sub.id}
            id={sub.id}
            description={sub.description}
            functionColor={cardColor}
          />
        ))}
      </div>
    </div>
  )
}
