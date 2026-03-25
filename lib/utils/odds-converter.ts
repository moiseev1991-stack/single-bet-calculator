export type OddsFormat = 'fractional' | 'decimal' | 'american'

export function fractionalToDecimal(numerator: number, denominator: number): number {
  if (denominator === 0) return 1
  return numerator / denominator + 1
}

export function decimalToFractional(decimal: number): { numerator: number; denominator: number } {
  const profit = decimal - 1
  if (profit <= 0) return { numerator: 0, denominator: 1 }
  // Find best fraction approximation
  const tolerance = 1e-6
  let bestNum = 1
  let bestDen = 1
  let bestError = Math.abs(profit - bestNum / bestDen)
  for (let den = 1; den <= 100; den++) {
    const num = Math.round(profit * den)
    const error = Math.abs(profit - num / den)
    if (error < bestError) {
      bestError = error
      bestNum = num
      bestDen = den
    }
    if (bestError < tolerance) break
  }
  return { numerator: bestNum, denominator: bestDen }
}

export function americanToDecimal(american: number): number {
  if (american > 0) return american / 100 + 1
  return 100 / Math.abs(american) + 1
}

export function decimalToAmerican(decimal: number): number {
  if (decimal >= 2) return Math.round((decimal - 1) * 100)
  return Math.round(-100 / (decimal - 1))
}

export function toDecimal(odds: string | number, format: OddsFormat, den?: number): number {
  if (format === 'decimal') {
    const d = typeof odds === 'string' ? parseFloat(odds) : odds
    return isNaN(d) || d < 1 ? 1 : d
  }
  if (format === 'fractional') {
    const num = typeof odds === 'string' ? parseFloat(odds) : odds
    const denominator = den ?? 1
    if (isNaN(num) || num < 0) return 1
    return fractionalToDecimal(num, denominator)
  }
  if (format === 'american') {
    const a = typeof odds === 'string' ? parseFloat(odds) : odds
    if (isNaN(a)) return 1
    return americanToDecimal(a)
  }
  return 1
}

export function formatDecimalOdds(decimal: number): string {
  return decimal.toFixed(2)
}

export function formatFractionalOdds(numerator: number, denominator: number): string {
  return `${numerator}/${denominator}`
}

export function impliedProbability(decimal: number): number {
  if (decimal <= 0) return 0
  return 1 / decimal
}
