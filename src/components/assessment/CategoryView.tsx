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
    return <div className="p-8 text-slate-500">Category not found.</div>
  }

  const functionColors = getFunctionColors(framework)
  const colors = functionColors[fn.id]
  const cardColor = `${colors.light} ${colors.text}`

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${colors.bg} text-white`}>
            {fn.id} - {fn.name}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-slate-900">{category.id} - {category.name}</h2>
        <p className="text-sm text-slate-500 mt-1">{category.subcategories.length} controls</p>
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
