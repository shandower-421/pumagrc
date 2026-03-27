import { memo, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useAssessment } from '../../store/assessment-store'
import {
  MaturityLevel, Priority,
  MATURITY_LABELS, MATURITY_COLORS,
  PRIORITY_LABELS, PRIORITY_COLORS,
  type SubcategoryAssessment,
} from '../../types/assessment'

interface SubcategoryCardProps {
  id: string
  description: string
  functionColor: string
}

export const SubcategoryCard = memo(function SubcategoryCard({ id, description, functionColor }: SubcategoryCardProps) {
  const { assessment, setField } = useAssessment()
  const data = assessment.subcategories[id] || {
    maturity: MaturityLevel.NotAssessed,
    priority: Priority.NotSet,
    proof: '', plan: '', notes: '',
  }
  const [isExpanded, setIsExpanded] = useState(false)

  const handleChange = (field: keyof SubcategoryAssessment, value: string) => {
    setField(id, field, value)
  }

  return (
    <div className={`border rounded-lg overflow-hidden ${
      data.maturity !== MaturityLevel.NotAssessed ? 'border-slate-200' : 'border-slate-100'
    }`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors"
      >
        {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
        <span className={`text-xs font-mono font-semibold px-1.5 py-0.5 rounded ${functionColor}`}>{id}</span>
        <span className="text-sm text-slate-700 flex-1">{description}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${MATURITY_COLORS[data.maturity]}`}>
          {MATURITY_LABELS[data.maturity]}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[data.priority]}`}>
          {PRIORITY_LABELS[data.priority]}
        </span>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 pt-2 bg-slate-50 border-t border-slate-100 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Maturity Level</label>
              <select
                value={data.maturity}
                onChange={e => handleChange('maturity', e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-md px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(MATURITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Priority</label>
              <select
                value={data.priority}
                onChange={e => handleChange('priority', e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-md px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Proof</label>
            <textarea
              value={data.proof}
              onChange={e => handleChange('proof', e.target.value)}
              placeholder="Evidence of implementation..."
              rows={2}
              className="w-full text-sm border border-slate-200 rounded-md px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Plan</label>
            <textarea
              value={data.plan}
              onChange={e => handleChange('plan', e.target.value)}
              placeholder="Improvement plan..."
              rows={2}
              className="w-full text-sm border border-slate-200 rounded-md px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Notes</label>
            <textarea
              value={data.notes}
              onChange={e => handleChange('notes', e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              className="w-full text-sm border border-slate-200 rounded-md px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
            />
          </div>
        </div>
      )}
    </div>
  )
})
