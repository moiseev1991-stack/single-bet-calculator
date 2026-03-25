'use client'

import { useState, useMemo } from 'react'
import { fractionalToDecimal } from '@/lib/utils/odds-converter'

// Sharp Stakes: compare the soft bookmaker line against the sharp/true line
// to determine bet sizing based on your edge.

export function SharpStakesCalculator() {
  const [sharpOddsNum, setSharpOddsNum] = useState('3')
  const [sharpOddsDen, setSharpOddsDen] = useState('1')
  const [softOddsNum, setSoftOddsNum] = useState('7')
  const [softOddsDen, setSoftOddsDen] = useState('2')
  const [bankroll, setBankroll] = useState('')
  const [kellyFraction, setKellyFraction] = useState<'full' | 'half' | 'quarter'>('half')

  const result = useMemo(() => {
    const sharpDec = fractionalToDecimal(parseInt(sharpOddsNum) || 1, parseInt(sharpOddsDen) || 1)
    const softDec = fractionalToDecimal(parseInt(softOddsNum) || 1, parseInt(softOddsDen) || 1)
    const bank = parseFloat(bankroll)

    if (sharpDec < 1.01 || softDec < 1.01) return null

    // True probability from sharp odds (no-vig, assuming 2-outcome market)
    const trueProb = 1 / sharpDec
    const impliedSoftProb = 1 / softDec

    const edge = trueProb - impliedSoftProb
    const edgePct = edge * 100

    // Kelly criterion using true prob and soft book odds
    const b = softDec - 1
    const q = 1 - trueProb
    const kellyFull = (b * trueProb - q) / b

    const fractionMult = kellyFraction === 'full' ? 1 : kellyFraction === 'half' ? 0.5 : 0.25
    const kellySized = kellyFull * fractionMult
    const stake = !isNaN(bank) && bank > 0 ? Math.max(0, kellySized) * bank : null

    return { sharpDec, softDec, trueProb, impliedSoftProb, edge, edgePct, kellyFull, kellySized, stake, positive: edge > 0 }
  }, [sharpOddsNum, sharpOddsDen, softOddsNum, softOddsDen, bankroll, kellyFraction])

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">Sharp Stakes Calculator</span>
      </div>

      <div className="bg-white p-4 space-y-5">
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800">
          Enter the sharp (true market) odds and the soft bookmaker odds. The calculator computes your edge and optimal stake using the Kelly Criterion.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Sharp / True Odds (Fractional)</label>
            <p className="text-xs text-gray-400 mb-1.5">e.g. Pinnacle, Betfair SP</p>
            <div className="flex items-center gap-1">
              <input type="number" min="1" step="1" value={sharpOddsNum}
                onChange={e => setSharpOddsNum(e.target.value)}
                className="w-20 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <span className="text-gray-500 font-medium">/</span>
              <input type="number" min="1" step="1" value={sharpOddsDen}
                onChange={e => setSharpOddsDen(e.target.value)}
                className="w-20 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Soft Book Odds (Fractional)</label>
            <p className="text-xs text-gray-400 mb-1.5">e.g. Betway, William Hill</p>
            <div className="flex items-center gap-1">
              <input type="number" min="1" step="1" value={softOddsNum}
                onChange={e => setSoftOddsNum(e.target.value)}
                className="w-20 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <span className="text-gray-500 font-medium">/</span>
              <input type="number" min="1" step="1" value={softOddsDen}
                onChange={e => setSoftOddsDen(e.target.value)}
                className="w-20 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Kelly Fraction</label>
            <div className="flex">
              {[['full', 'Full Kelly'], ['half', 'Half Kelly'], ['quarter', 'Quarter Kelly']].map(([val, label]) => (
                <button key={val} onClick={() => setKellyFraction(val as 'full' | 'half' | 'quarter')}
                  className={`px-3 py-1.5 text-sm font-medium border first:rounded-l last:rounded-r transition-colors ${
                    kellyFraction === val
                      ? 'bg-[#1b4fd8] text-white border-[#1b4fd8]'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Bankroll (£) — optional</label>
            <input type="number" min="1" step="1" placeholder="e.g. 1000" value={bankroll}
              onChange={e => setBankroll(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {result && (
          <div className="space-y-3">
            <div className={`rounded-lg px-4 py-3 text-sm font-medium ${
              result.positive
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {result.positive
                ? `Edge: +${result.edgePct.toFixed(2)}% — value bet detected. Soft book odds are better than true market.`
                : `No edge: ${result.edgePct.toFixed(2)}%. Soft odds are worse than the sharp market.`}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 border border-gray-200 rounded overflow-hidden text-sm">
              {[
                ['True Prob.', `${(result.trueProb * 100).toFixed(2)}%`],
                ['Edge', `${result.edge >= 0 ? '+' : ''}${result.edgePct.toFixed(2)}%`],
                [`${kellyFraction === 'full' ? 'Full' : kellyFraction === 'half' ? 'Half' : '¼'} Kelly %`, `${Math.max(0, result.kellySized * 100).toFixed(2)}%`],
                ['Recommended Stake', result.stake !== null ? `£${result.stake.toFixed(2)}` : 'Enter bankroll'],
              ].map(([label, value], i) => (
                <div key={i}>
                  <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide">
                    {label}
                  </div>
                  <div className={`text-center py-3 px-2 font-semibold ${
                    label === 'Edge'
                      ? result.positive ? 'text-emerald-600' : 'text-red-500'
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
