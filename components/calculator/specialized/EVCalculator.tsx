'use client'

import { useState, useMemo } from 'react'

export function EVCalculator() {
  const [decimalOdds, setDecimalOdds] = useState('3.00')
  const [probability, setProbability] = useState('40')
  const [stake, setStake] = useState('')

  const result = useMemo(() => {
    const odds = parseFloat(decimalOdds)
    const prob = parseFloat(probability) / 100
    const s = parseFloat(stake)

    if (isNaN(odds) || odds < 1.01 || isNaN(prob) || prob <= 0 || prob >= 1) return null

    const b = odds - 1 // net odds (profit per £1)
    const q = 1 - prob

    // EV = (p × b) - (q × 1) per £1 staked
    const evPerUnit = prob * b - q
    const evStake = !isNaN(s) && s > 0 ? evPerUnit * s : null

    const impliedProb = 1 / odds
    const edge = prob - impliedProb

    return { evPerUnit, evStake, impliedProb, edge, positive: evPerUnit > 0 }
  }, [decimalOdds, probability, stake])

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">Expected Value (EV) Calculator</span>
      </div>

      <div className="bg-white p-4 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Decimal Odds</label>
            <input
              type="number"
              min="1.01"
              step="0.01"
              value={decimalOdds}
              onChange={e => setDecimalOdds(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Implied probability: {parseFloat(decimalOdds) > 0 ? (100 / parseFloat(decimalOdds)).toFixed(2) : '—'}%
            </p>
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">True Win Probability (%)</label>
            <input
              type="number"
              min="1"
              max="99"
              step="0.1"
              value={probability}
              onChange={e => setProbability(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Stake (£) — optional</label>
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
          <div className="space-y-3">
            <div
              className={`rounded-lg px-4 py-3 text-sm font-medium ${
                result.positive
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {result.positive
                ? `Positive EV (+${(result.evPerUnit * 100).toFixed(2)}% per £1). This bet has an edge.`
                : `Negative EV (${(result.evPerUnit * 100).toFixed(2)}% per £1). You are paying vig.`}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 border border-gray-200 rounded overflow-hidden text-sm">
              {[
                ['EV per £1', `${result.evPerUnit >= 0 ? '+' : ''}£${result.evPerUnit.toFixed(4)}`],
                ['Edge', `${result.edge >= 0 ? '+' : ''}${(result.edge * 100).toFixed(2)}%`],
                ['Implied Prob.', `${(result.impliedProb * 100).toFixed(2)}%`],
                ['EV on Stake', result.evStake !== null ? `${result.evStake >= 0 ? '+' : ''}£${result.evStake.toFixed(2)}` : '—'],
              ].map(([label, value], i) => (
                <div key={i}>
                  <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide">
                    {label}
                  </div>
                  <div className={`text-center py-3 px-2 font-semibold border-r border-gray-100 ${
                    (label === 'EV per £1' || label === 'Edge' || label === 'EV on Stake')
                      ? result.evPerUnit >= 0 ? 'text-emerald-600' : 'text-red-500'
                      : 'text-gray-700'
                  }`}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs text-gray-600">
              <strong>Formula:</strong> EV = (Win Prob × Net Odds) − Loss Prob = ({parseFloat(probability).toFixed(1)}% × {(parseFloat(decimalOdds) - 1).toFixed(2)}) − {(100 - parseFloat(probability)).toFixed(1)}%
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
