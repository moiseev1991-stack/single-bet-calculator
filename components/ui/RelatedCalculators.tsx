import { CalculatorInfo } from '@/lib/constants'
import { CalculatorCard } from './CalculatorCard'

interface RelatedCalculatorsProps {
  calculators: CalculatorInfo[]
  title?: string
}

export function RelatedCalculators({ calculators, title = 'Related Calculators' }: RelatedCalculatorsProps) {
  if (calculators.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {calculators.map(calc => (
          <CalculatorCard key={calc.slug} calculator={calc} />
        ))}
      </div>
    </section>
  )
}
