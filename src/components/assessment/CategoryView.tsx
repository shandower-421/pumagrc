import { useFramework } from '../../store/framework-context'
import { getFunctionColors } from '../../types/assessment'
import { SubcategoryCard } from './SubcategoryCard'

interface CategoryViewProps {
  categoryId: string
}

export function CategoryView({ categoryId }: CategoryViewProps) {
  const { framework } = useFramework()
  const fn = framework.data.find(f => f.categories.some(c => c.id === categoryId))
  const category = fn?.categories.find(c => c.id === categoryId)

  if (!fn || !category) {
    return <div className="p-8" style={{ color: 'var(--color-text-muted)' }}>Category not found.</div>
  }

  const functionColors = getFunctionColors(framework)
  const colors = functionColors[fn.id]
  const cardColor = `${colors.light} ${colors.text}`

  return (
    <div className="p-4 sm:p-6 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${colors.bg} text-white`}>{fn.id}</span>
          <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{fn.name}</span>
        </div>
        <h2 className="text-xl font-light" style={{ color: 'var(--color-text-primary)', fontFamily: "'Instrument Serif', serif" }}>
          {category.id} — {category.name}
        </h2>
        <p className="text-xs mt-1 font-mono" style={{ color: 'var(--color-text-muted)' }}>{category.subcategories.length} controls</p>
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
