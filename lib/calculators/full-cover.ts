import { Selection, BetResult, EachWayTerms } from './types'

function applyRule4(odds: number, deduction: number): number {
  if (deduction <= 0) return odds
  const profit = (odds - 1) * (1 - deduction / 100)
  return profit + 1
}

function combinations<T>(arr: T[], k: number): T[][] {
  if (k === 0) return [[]]
  if (k > arr.length) return []
  const [first, ...rest] = arr
  const withFirst = combinations(rest, k - 1).map(combo => [first, ...combo])
  const withoutFirst = combinations(rest, k)
  return [...withFirst, ...withoutFirst]
}

function calcLegReturn(
  sels: Selection[],
  stakePerBet: number,
  eachWay: boolean,
  eachWayTerms: EachWayTerms,
): { winReturn: number; placeReturn: number } {
  let winMultiplier = 1
  let winLost = false
  let placeMultiplier = 1
  let placeLost = false

  for (const sel of sels) {
    const { outcome, decimalOdds, rule4Deduction } = sel
    const adjustedOdds = applyRule4(decimalOdds, rule4Deduction)
    const placeOdds = eachWay ? (adjustedOdds - 1) / eachWayTerms.fraction + 1 : 1

    if (outcome === 'non-runner' || outcome === 'void') continue

    if (outcome === 'winner') {
      winMultiplier *= adjustedOdds
      placeMultiplier *= placeOdds
    } else if (outcome === 'place') {
      winLost = true
      placeMultiplier *= placeOdds
    } else {
      // loser
      winLost = true
      placeLost = true
    }
  }

  return {
    winReturn: winLost ? 0 : stakePerBet * winMultiplier,
    placeReturn: placeLost ? 0 : stakePerBet * placeMultiplier,
  }
}

export interface FullCoverConfig {
  /** minimum combination leg size (1 for Lucky/Patent, 2 for Trixie/Yankee) */
  minLegSize: number
  /** maximum combination leg size — equals number of selections */
  maxLegSize: number
}

export function calculateFullCover(
  selections: Selection[],
  stake: number,
  stakeType: 'per-bet' | 'total',
  eachWay: boolean,
  eachWayTerms: EachWayTerms,
  config: FullCoverConfig,
): BetResult {
  const { minLegSize, maxLegSize } = config

  // Build all combination legs
  const allLegs: Selection[][] = []
  for (let k = minLegSize; k <= maxLegSize; k++) {
    allLegs.push(...combinations(selections, k))
  }

  const numLegs = allLegs.length
  const numBets = numLegs * (eachWay ? 2 : 1)

  // Resolve stake per individual bet
  const stakePerBet = stakeType === 'total' ? stake / numBets : stake
  const totalOutlay = stakePerBet * numBets

  let totalReturn = 0
  for (const leg of allLegs) {
    const { winReturn, placeReturn } = calcLegReturn(leg, stakePerBet, eachWay, eachWayTerms)
    totalReturn += winReturn
    if (eachWay) totalReturn += placeReturn
  }

  return {
    totalOutlay,
    totalReturn,
    totalProfit: totalReturn - totalOutlay,
    numBets,
  }
}

// Config map for each full-cover bet type
export const FULL_COVER_CONFIGS: Record<string, FullCoverConfig> = {
  trixie:       { minLegSize: 2, maxLegSize: 3 },
  patent:       { minLegSize: 1, maxLegSize: 3 },
  yankee:       { minLegSize: 2, maxLegSize: 4 },
  'super-yankee': { minLegSize: 2, maxLegSize: 5 },
  heinz:        { minLegSize: 2, maxLegSize: 6 },
  'super-heinz': { minLegSize: 2, maxLegSize: 7 },
  goliath:      { minLegSize: 2, maxLegSize: 8 },
  'lucky-15':   { minLegSize: 1, maxLegSize: 4 },
  'lucky-31':   { minLegSize: 1, maxLegSize: 5 },
  'lucky-63':   { minLegSize: 1, maxLegSize: 6 },
}
