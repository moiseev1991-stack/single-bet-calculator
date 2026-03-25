'use client'

import { useState, useMemo } from 'react'
import { ResultsSummary } from '../ResultsSummary'

const RULE4_TABLE = [
  { range: '1/9 or shorter', deduction: 75 },
  { range: '2/11 to 1/5', deduction: 70 },
  { range: '2/9 to 1/4', deduction: 65 },
  { range: '3/10 to 2/7', deduction: 60 },
  { range: '1/3 to 3/10', deduction: 55 },
  { range: '4/9 to 2/5', deduction: 50 },
  { range: '8/15 to 4/9', deduction: 45 },
  { range: '8/13 to 4/7', deduction: 40 },
  { range: 'Evens to 4/5', deduction: 35 },
  { range: '6/4 to 5/4', deduction: 25 },
  { range: '2/1 to 7/4', deduction: 20 },
  { range: '3/1 to 5/2', deduction: 15 },
  { range: '4/1 to 100/30', deduction: 10 },
  { range: '9/2 to 4/1', deduction: 5 },
  { range: '5/1 or longer', deduction: 0 },
]

export function Rule4Calculator() {
  const [oddsNum, setOddsNum] = useState(2)
  const [oddsDen, setOddsDen] = useState(1)
  const [stake, setStake] = useState('')
  const [deduction, setDeduction] = useState(25)
  const [stakeType, setStakeType] = useState<'win' | 'each-way'>('win')

  const result = useMemo(() => {
    const s = parseFloat(stake)
    if (isNaN(s) || s <= 0) return null
    const decimal = oddsNum / oddsDen + 1
    const grossProfit = (decimal - 1) * s
    const adjustedProfit = grossProfit * (1 - deduction / 100)

    if (stakeType === 'each-way') {
      const totalOutlay = s * 2
      const placeOdds = (decimal - 1) / 4 + 1
      const winAdjustedProfit = grossProfit * (1 - deduction / 100)
      const placeGrossProfit = (placeOdds - 1) * s
      const placeAdjustedProfit = placeGrossProfit * (1 - deduction / 100)
      const totalReturn = s + winAdjustedProfit + s + placeAdjustedProfit
      return {
        totalOutlay,
        totalReturn,
        totalProfit: totalReturn - totalOutlay,
        numBets: 2,
      }
    }

    return {
      totalOutlay: s,
      totalReturn: s + adjustedProfit,
      totalProfit: adjustedProfit,
      numBets: 1,
    }
  }, [stake, oddsNum, oddsDen, deduction, stakeType])

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">Rule 4 Deduction Calculator</span>
      </div>

      <div className="bg-white p-4 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Odds (Fractional)</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="1"
                step="1"
                value={oddsNum}
                onChange={e => setOddsNum(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500 font-medium">/</span>
              <input
                type="number"
                min="1"
                step="1"
                value={oddsDen}
                onChange={e => setOddsDen(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Rule 4 Deduction (%)</label>
            <select
              value={deduction}
              onChange={e => setDeduction(parseInt(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1.5 bg-white w-full"
            >
              {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75].map(d => (
                <option key={d} value={d}>{d}p in the £ ({d}%)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Bet Type</label>
            <div className="flex">
              {[['win', 'Win'], ['each-way', 'Each Way']].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setStakeType(val as 'win' | 'each-way')}
                  className={`px-4 py-1.5 text-sm font-medium border first:rounded-l last:rounded-r transition-colors ${
                    stakeType === val
                      ? 'bg-[#1b4fd8] text-white border-[#1b4fd8]'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Stake (£)</label>
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
        </div>

        <ResultsSummary
          totalOutlay={result?.totalOutlay ?? null}
          totalReturn={result?.totalReturn ?? null}
          totalProfit={result?.totalProfit ?? null}
          numBets={result?.numBets}
        />

        {/* Rule 4 reference table */}
        <details className="text-sm">
          <summary className="cursor-pointer text-[#1b4fd8] font-medium hover:underline">
            Rule 4 Deduction Reference Table
          </summary>
          <div className="mt-3 overflow-x-auto rounded border border-gray-200">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Withdrawn horse SP</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Deduction</th>
                </tr>
              </thead>
              <tbody>
                {RULE4_TABLE.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-3 py-1.5 text-gray-600">{row.range}</td>
                    <td className="px-3 py-1.5 text-gray-800 font-medium">{row.deduction}p in the £</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </div>
  )
}
