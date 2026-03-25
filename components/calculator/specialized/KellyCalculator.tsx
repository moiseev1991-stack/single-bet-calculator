'use client'

import { useState, useMemo } from 'react'

export function KellyCalculator() {
  const [decimalOdds, setDecimalOdds] = useState('3.00')
  const [probability, setProbability] = useState('40')
  const [bankroll, setBankroll] = useState('')
  const [fraction, setFraction] = useState<'full' | 'half' | 'quarter'>('full')

  const result = useMemo(() => {
    const odds = parseFloat(decimalOdds)
    const prob = parseFloat(probability) / 100
    const bank = parseFloat(bankroll)

    if (isNaN(odds) || odds < 1.01 || isNaN(prob) || prob <= 0 || prob >= 1) return null

    // Kelly formula: f* = (b*p - q) / b
    // where b = decimal odds - 1 (net odds), p = win probability, q = 1 - p
    const b = odds - 1
    const q = 1 - prob
    const kellyFull = (b * prob - q) / b

    const fractionMultiplier = fraction === 'full' ? 1 : fraction === 'half' ? 0.5 : 0.25
    const kellyCriterion = kellyFull * fractionMultiplier

    const bankStake = !isNaN(bank) && bank > 0 ? bank * Math.max(0, kellyCriterion) : null
    const ev = b * prob - q // expected value per £1 staked

    return { kellyFull, kellyCriterion, bankStake, ev, isPositive: kellyCriterion > 0 }
  }, [decimalOdds, probability, bankroll, fraction])

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">Kelly Criterion Calculator</span>
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
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Your Estimated Win Probability (%)</label>
            <input
              type="number"
              min="1"
              max="99"
              step="1"
              value={probability}
              onChange={e => setProbability(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Implied probability from odds: {parseFloat(decimalOdds) > 0 ? (100 / parseFloat(decimalOdds)).toFixed(1) : '—'}%
            </p>
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Kelly Fraction</label>
            <div className="flex">
              {[['full', 'Full'], ['half', 'Half (½)'], ['quarter', 'Quarter (¼)']].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFraction(val as 'full' | 'half' | 'quarter')}
                  className={`px-3 py-1.5 text-sm font-medium border first:rounded-l last:rounded-r transition-colors ${
                    fraction === val
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
            <label className="block text-gray-600 font-medium mb-1">Bankroll (£) — optional</label>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="e.g. 1000"
              value={bankroll}
              onChange={e => setBankroll(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {result && (
          <div className="space-y-3">
            {!result.isPositive && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-800">
                Negative Kelly — this bet has a negative expected value. Do not bet.
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 border border-gray-200 rounded overflow-hidden text-sm">
              {[
                ['Full Kelly %', `${(result.kellyFull * 100).toFixed(2)}%`],
                [fraction === 'full' ? 'Bet Size %' : `${fraction === 'half' ? 'Half' : 'Quarter'} Kelly %`, `${(result.kellyCriterion * 100).toFixed(2)}%`],
                ['Expected Value', `${result.ev >= 0 ? '+' : ''}${(result.ev * 100).toFixed(2)}%`],
                ['Stake', result.bankStake !== null ? `£${result.bankStake.toFixed(2)}` : 'Enter bankroll'],
              ].map(([label, value], i) => (
                <div key={i} className={i % 2 === 0 ? '' : 'sm:border-l border-gray-100'}>
                  <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide">
                    {label}
                  </div>
                  <div className={`text-center py-3 px-2 font-semibold ${
                    label === 'Expected Value'
                      ? result.ev >= 0 ? 'text-emerald-600' : 'text-red-500'
                      : 'text-gray-700'
                  }`}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
