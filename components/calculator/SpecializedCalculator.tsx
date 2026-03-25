import { Rule4Calculator } from './specialized/Rule4Calculator'
import { DeadHeatCalculator } from './specialized/DeadHeatCalculator'
import { ForecastCalculator } from './specialized/ForecastCalculator'
import { ArbitrageCalculator } from './specialized/ArbitrageCalculator'
import { MatchedBettingCalculator } from './specialized/MatchedBettingCalculator'
import { DutchCalculator } from './specialized/DutchCalculator'
import { KellyCalculator } from './specialized/KellyCalculator'
import { EVCalculator } from './specialized/EVCalculator'
import { NoVigCalculator } from './specialized/NoVigCalculator'
import { OddsConverterCalculator } from './specialized/OddsConverterCalculator'
import { ImpliedProbabilityCalculator } from './specialized/ImpliedProbabilityCalculator'
import { BettingMarginCalculator } from './specialized/BettingMarginCalculator'
import { SharpStakesCalculator } from './specialized/SharpStakesCalculator'

interface SpecializedCalculatorProps {
  type: string
}

export function SpecializedCalculator({ type }: SpecializedCalculatorProps) {
  switch (type) {
    case 'rule-4':
      return <Rule4Calculator />
    case 'dead-heat':
      return <DeadHeatCalculator />
    case 'forecast':
      return <ForecastCalculator />
    case 'reverse-forecast':
      return <ForecastCalculator reverse />
    case 'arbitrage':
      return <ArbitrageCalculator />
    case 'matched-betting':
      return <MatchedBettingCalculator />
    case 'dutch':
      return <DutchCalculator />
    case 'kelly-criterion':
      return <KellyCalculator />
    case 'expected-value':
      return <EVCalculator />
    case 'no-vig':
      return <NoVigCalculator />
    case 'odds-converter':
      return <OddsConverterCalculator />
    case 'implied-probability':
      return <ImpliedProbabilityCalculator />
    case 'betting-margin':
      return <BettingMarginCalculator />
    case 'sharp-stakes':
      return <SharpStakesCalculator />
    default:
      return null
  }
}

export const SPECIALIZED_TYPES = new Set([
  'rule-4',
  'dead-heat',
  'forecast',
  'reverse-forecast',
  'arbitrage',
  'matched-betting',
  'dutch',
  'kelly-criterion',
  'expected-value',
  'no-vig',
  'odds-converter',
  'implied-probability',
  'betting-margin',
  'sharp-stakes',
])
