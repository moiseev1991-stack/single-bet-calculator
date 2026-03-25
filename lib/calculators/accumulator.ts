import { Selection, BetResult, EachWayTerms } from './types'

function applyRule4(odds: number, deduction: number): number {
  if (deduction <= 0) return odds
  const profit = (odds - 1) * (1 - deduction / 100)
  return profit + 1
}

export function calculateAccumulator(
  selections: Selection[],
  stake: number,
  eachWay: boolean,
  eachWayTerms: EachWayTerms,
): BetResult {
  const numBets = eachWay ? 2 : 1
  const totalOutlay = stake * numBets

  // Win accumulator
  let winMultiplier = 1
  let winLost = false
  // Place accumulator
  let placeMultiplier = 1
  let placeLost = false

  for (const sel of selections) {
    const { outcome, decimalOdds, rule4Deduction } = sel
    const adjustedOdds = applyRule4(decimalOdds, rule4Deduction)
    const placeOdds = (adjustedOdds - 1) / eachWayTerms.fraction + 1

    if (outcome === 'non-runner' || outcome === 'void') {
      // Treated as ×1 — bet continues without this selection
      continue
    }

    if (outcome === 'winner') {
      winMultiplier *= adjustedOdds
      placeMultiplier *= placeOdds
    } else if (outcome === 'place') {
      // Win acca loses at this selection
      winLost = true
      placeMultiplier *= placeOdds
    } else {
      // Loser — both accas lose
      winLost = true
      placeLost = true
    }
  }

  let totalReturn = 0
  if (!winLost) totalReturn += stake * winMultiplier
  if (eachWay && !placeLost) totalReturn += stake * placeMultiplier

  return {
    totalOutlay,
    totalReturn,
    totalProfit: totalReturn - totalOutlay,
    numBets,
  }
}
