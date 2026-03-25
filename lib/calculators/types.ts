export type Outcome = 'winner' | 'place' | 'non-runner' | 'void'

export interface Selection {
  id: number
  outcome: Outcome
  decimalOdds: number
  rule4Deduction: number // 0-75
}

export interface BetResult {
  totalOutlay: number
  totalReturn: number
  totalProfit: number
  numBets: number
}

export interface EachWayTerms {
  fraction: number  // denominator, e.g. 4 for 1/4, 5 for 1/5
  places: number
}
