import { Selection, BetResult, EachWayTerms } from './types'

function applyRule4(odds: number, deduction: number): number {
  if (deduction <= 0) return odds
  // Rule 4 reduces the profit portion
  const profit = (odds - 1) * (1 - deduction / 100)
  return profit + 1
}

export function calculateSingle(
  selections: Selection[],
  stake: number,
  stakeType: 'per-bet' | 'total',
  eachWay: boolean,
  eachWayTerms: EachWayTerms,
): BetResult {
  const activeSelections = selections.filter(s => s.outcome !== 'non-runner' && s.outcome !== 'void')
  const numBets = activeSelections.length * (eachWay ? 2 : 1)

  // Effective stake per individual bet
  const stakePerBet = stakeType === 'per-bet' ? stake : stake / Math.max(numBets, 1)

  let totalReturn = 0
  let totalOutlay = 0

  for (const sel of selections) {
    const { outcome, decimalOdds, rule4Deduction } = sel
    const adjustedOdds = applyRule4(decimalOdds, rule4Deduction)

    if (outcome === 'non-runner' || outcome === 'void') {
      // Stake(s) returned
      if (eachWay) {
        totalOutlay += stakePerBet * 2
        totalReturn += stakePerBet * 2
      } else {
        totalOutlay += stakePerBet
        totalReturn += stakePerBet
      }
      continue
    }

    if (eachWay) {
      totalOutlay += stakePerBet * 2
      const placeOdds = (adjustedOdds - 1) / eachWayTerms.fraction + 1

      if (outcome === 'winner') {
        totalReturn += stakePerBet * adjustedOdds  // win part
        totalReturn += stakePerBet * placeOdds      // place part
      } else if (outcome === 'place') {
        // Win part lost, place part wins
        totalReturn += stakePerBet * placeOdds
      }
      // place outcome with no places: totalReturn += 0 for both
    } else {
      totalOutlay += stakePerBet
      if (outcome === 'winner') {
        totalReturn += stakePerBet * adjustedOdds
      }
      // loser / place-only without ew: return 0
    }
  }

  return {
    totalOutlay,
    totalReturn,
    totalProfit: totalReturn - totalOutlay,
    numBets,
  }
}
