'use client'

import { useState, useMemo } from 'react'
import { fractionalToDecimal, americanToDecimal } from '@/lib/utils/odds-converter'

interface MarginOdds {
  id: number
  fracNum: number
  fracDen: number
  decimal: number
  american: number
  label: string
}

type Format = 'fractional' | 'decimal' | 'american'

export function BettingMarginCalculator() {
  const [format, setFormat] = useState<Format>('decimal')
  const [entries, setEntries] = useState<MarginOdds[]>([
    { id: 0, fracNum: 10, fracDen: 11, decimal: 1.909, american: -110, label: 'Home' },
    { id: 1, fracNum: 10, fracDen: 11, decimal: 1.909, american: -110, label: 'Away' },
  ])

  function addEntry() {
    const newId = Math.max(...entries.map(e => e.id)) + 1
    setEntries(prev => [...prev, { id: newId, fracNum: 2, fracDen: 1, decimal: 3.0, american: 200, label: `Option ${newId + 1}` }])
  }

  function removeEntry(id: number) {
    if (entries.length <= 2) return
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  function updateEntry(id: number, field: string, val: string) {
    setEntries(prev => prev.map(e => {
      if (e.id !== id) return e
      const n = parseFloat(val)
      if (field === 'label') return { ...e, label: val }
      if (field === 'decimal') return { ...e, decimal: isNaN(n) ? e.decimal : Math.max(1.01, n) }
      if (field === 'fracNum') return { ...e, fracNum: Math.max(1, parseInt(val) || 1) }
      if (field === 'fracDen') return { ...e, fracDen: Math.max(1, parseInt(val) || 1) }
      if (field === 'american') return { ...e, american: isNaN(n) ? e.american : n }
      return e
    }))
  }

  const result = useMemo(() => {
    const decimalOdds = entries.map(e => {
      if (format === 'fractional') return fractionalToDecimal(e.fracNum, e.fracDen)
      if (format === 'decimal') return e.decimal
      return americanToDecimal(e.american)
    })

    const impliedProbs = decimalOdds.map(d => 1 / d)
    const totalImplied = impliedProbs.reduce((s, p) => s + p, 0)
    const margin = (totalImplied - 1) * 100
    const marginPct = (1 - 1 / totalImplied) * 100

    // Per-outcome: how much of the margin each outcome accounts for
    return { decimalOdds, impliedProbs, totalImplied, margin, marginPct }
  }, [entries, format])

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">Betting Margin Calculator</span>
      </div>

      <div className="bg-white p-4 space-y-5">
        <div className="text-sm">
          <label className="block text-gray-600 font-medium mb-2">Odds Format</label>
          <div className="flex">
            {[['fractional', 'Fractional'], ['decimal', 'Decimal'], ['american', 'American']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFormat(val as Format)}
                className={`px-4 py-1.5 text-sm font-medium border first:rounded-l last:rounded-r transition-colors ${
                  format === val
                    ? 'bg-[#1b4fd8] text-white border-[#1b4fd8]'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="pb-2 text-left text-gray-500 font-medium">Outcome</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Odds</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Implied %</th>
                <th className="pb-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={entry.id} className="border-b border-gray-100">
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={entry.label}
                      onChange={e => updateEntry(entry.id, 'label', e.target.value)}
                      className="w-24 border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    {format === 'fractional' ? (
                      <div className="flex items-center gap-1">
                        <input type="number" min="1" step="1" value={entry.fracNum}
                          onChange={e => updateEntry(entry.id, 'fracNum', e.target.value)}
                          className="w-14 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <span className="text-gray-500">/</span>
                        <input type="number" min="1" step="1" value={entry.fracDen}
                          onChange={e => updateEntry(entry.id, 'fracDen', e.target.value)}
                          className="w-14 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    ) : format === 'decimal' ? (
                      <input type="number" min="1.01" step="0.001" value={entry.decimal}
                        onChange={e => updateEntry(entry.id, 'decimal', e.target.value)}
                        className="w-24 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    ) : (
                      <input type="number" value={entry.american}
                        onChange={e => updateEntry(entry.id, 'american', e.target.value)}
                        className="w-24 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="-110" />
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-sm font-medium text-gray-800">
                    {(result.impliedProbs[i] * 100).toFixed(2)}%
                  </td>
                  <td className="py-2.5 px-3">
                    <button onClick={() => removeEntry(entry.id)} disabled={entries.length <= 2}
                      className="text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed text-lg leading-none">
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={addEntry} className="text-sm text-[#1b4fd8] hover:underline">
          + Add outcome
        </button>

        <div className="grid grid-cols-3 border border-gray-200 rounded overflow-hidden text-sm">
          {[
            ['Total Implied %', `${(result.totalImplied * 100).toFixed(3)}%`],
            ['Overround', `+${result.margin.toFixed(3)}%`],
            ['Bookmaker Margin', `${result.marginPct.toFixed(3)}%`],
          ].map(([label, value], i) => (
            <div key={i}>
              <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide">
                {label}
              </div>
              <div className={`text-center py-3 px-2 font-semibold ${i === 0 ? 'text-gray-700' : 'text-orange-600'}`}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs text-gray-600 space-y-1">
          <p><strong>Overround</strong>: sum of all implied probabilities minus 100%. Higher = more vig taken.</p>
          <p><strong>Bookmaker margin</strong>: percentage of each bet the bookmaker keeps long-term.</p>
        </div>
      </div>
    </div>
  )
}
