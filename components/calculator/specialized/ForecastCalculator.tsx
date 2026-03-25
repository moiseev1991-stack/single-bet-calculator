'use client'

import { useState, useMemo } from 'react'
import { ResultsSummary } from '../ResultsSummary'

// Straight Forecast approximation: treats the two selections as a win double accumulator.
// This is the standard simplified approach used by most UK online forecast calculators.
// Actual CSF dividends set by the Tote may differ.

export function ForecastCalculator({ reverse = false }: { reverse?: boolean }) {
  const [sel1Num, setSel1Num] = useState(2)
  const [sel1Den, setSel1Den] = useState(1)
  const [sel2Num, setSel2Num] = useState(3)
  const [sel2Den, setSel2Den] = useState(1)
  const [stake, setStake] = useState('')

  const result = useMemo(() => {
    const s = parseFloat(stake)
    if (isNaN(s) || s <= 0) return null

    const dec1 = sel1Num / sel1Den + 1
    const dec2 = sel2Num / sel2Den + 1

    if (!reverse) {
      // Straight Forecast: A wins, B 2nd (win double approximation)
      const combinedDecimal = dec1 * dec2
      return {
        totalOutlay: s,
        totalReturn: s * combinedDecimal,
        totalProfit: s * combinedDecimal - s,
        numBets: 1,
      }
    } else {
      // Reverse Forecast: 2 bets (A/B and B/A)
      const comb1 = dec1 * dec2
      const comb2 = dec2 * dec1 // same odds but semantically both orders
      const totalOutlay = s * 2
      const totalReturn = s * comb1 + s * comb2
      return {
        totalOutlay,
        totalReturn,
        totalProfit: totalReturn - totalOutlay,
        numBets: 2,
      }
    }
  }, [stake, sel1Num, sel1Den, sel2Num, sel2Den, reverse])

  const title = reverse ? 'Reverse Forecast Calculator' : 'Forecast Bet Calculator'

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">{title}</span>
      </div>

      <div className="bg-white p-4 space-y-5">
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
          Returns are calculated as a win double (selections treated as a 2-leg accumulator). Actual Tote CSF dividends may differ.
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="pb-2 text-left text-gray-500 font-medium w-10 text-center">#</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Position</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Odds (Fractional)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2.5 px-3 text-sm text-gray-500 font-medium text-center">1</td>
                <td className="py-2.5 px-3 text-sm text-gray-600 font-medium">1st</td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={sel1Num}
                      onChange={e => setSel1Num(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">/</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={sel1Den}
                      onChange={e => setSel1Den(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2.5 px-3 text-sm text-gray-500 font-medium text-center">2</td>
                <td className="py-2.5 px-3 text-sm text-gray-600 font-medium">2nd</td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={sel2Num}
                      onChange={e => setSel2Num(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">/</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={sel2Den}
                      onChange={e => setSel2Den(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100 text-sm">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              {reverse ? 'Stake Per Bet (£)' : 'Stake (£)'}
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="e.g. 10.00"
              value={stake}
              onChange={e => setStake(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {reverse && (
            <div className="flex items-end">
              <p className="text-sm text-gray-500">
                Total outlay: <strong>£{stake ? (parseFloat(stake) * 2).toFixed(2) : '—'}</strong> (2 bets)
              </p>
            </div>
          )}
        </div>

        <ResultsSummary
          totalOutlay={result?.totalOutlay ?? null}
          totalReturn={result?.totalReturn ?? null}
          totalProfit={result?.totalProfit ?? null}
          numBets={result?.numBets}
        />
      </div>
    </div>
  )
}
