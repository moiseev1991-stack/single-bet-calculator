'use client'

import { useState, useMemo } from 'react'
import { ResultsSummary } from '../ResultsSummary'

export function DeadHeatCalculator() {
  const [oddsNum, setOddsNum] = useState(5)
  const [oddsDen, setOddsDen] = useState(1)
  const [stake, setStake] = useState('')
  const [numTied, setNumTied] = useState(2)
  const [eachWay, setEachWay] = useState(false)
  const [ewFraction, setEwFraction] = useState(4)

  const result = useMemo(() => {
    const s = parseFloat(stake)
    if (isNaN(s) || s <= 0) return null

    const decimal = oddsNum / oddsDen + 1

    // Dead heat: effective stake for win = stake / numTied
    const effectiveStake = s / numTied
    const winReturn = effectiveStake * decimal

    if (!eachWay) {
      return {
        totalOutlay: s,
        totalReturn: winReturn,
        totalProfit: winReturn - s,
        numBets: 1,
      }
    }

    // Each way dead heat
    const placeOdds = (decimal - 1) / ewFraction + 1
    const placeEffectiveStake = s / numTied
    const placeReturn = placeEffectiveStake * placeOdds

    const totalOutlay = s * 2
    const totalReturn = winReturn + placeReturn
    return {
      totalOutlay,
      totalReturn,
      totalProfit: totalReturn - totalOutlay,
      numBets: 2,
    }
  }, [stake, oddsNum, oddsDen, numTied, eachWay, ewFraction])

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">Dead Heat Calculator</span>
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
            <label className="block text-gray-600 font-medium mb-1">Number of Dead-Heaters</label>
            <select
              value={numTied}
              onChange={e => setNumTied(parseInt(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1.5 bg-white w-full"
            >
              {[2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n} horses</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Each Way?</label>
            <div className="flex">
              {['No', 'Yes'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setEachWay(opt === 'Yes')}
                  className={`px-4 py-1.5 text-sm font-medium border first:rounded-l last:rounded-r transition-colors ${
                    (opt === 'Yes') === eachWay
                      ? 'bg-[#f59e0b] text-white border-[#f59e0b]'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {eachWay && (
            <div>
              <label className="block text-gray-600 font-medium mb-1">Each Way Fraction</label>
              <select
                value={ewFraction}
                onChange={e => setEwFraction(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1.5 bg-white w-full"
              >
                {[3, 4, 5, 6, 8].map(f => (
                  <option key={f} value={f}>1/{f}</option>
                ))}
              </select>
            </div>
          )}

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

        {result && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800">
            <strong>Dead heat rule:</strong> Your effective stake is reduced to £{(parseFloat(stake || '0') / numTied).toFixed(2)} (stake ÷ {numTied} tied runners).
          </div>
        )}

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
