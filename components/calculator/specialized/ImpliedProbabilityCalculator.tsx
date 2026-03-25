'use client'

import { useState, useMemo } from 'react'
import { fractionalToDecimal, americanToDecimal } from '@/lib/utils/odds-converter'

interface OddEntry {
  id: number
  fracNum: number
  fracDen: number
  decimal: number
  american: number
}

type Format = 'fractional' | 'decimal' | 'american'

export function ImpliedProbabilityCalculator() {
  const [format, setFormat] = useState<Format>('decimal')
  const [entries, setEntries] = useState<OddEntry[]>([
    { id: 0, fracNum: 2, fracDen: 1, decimal: 3.0, american: 200 },
    { id: 1, fracNum: 3, fracDen: 2, decimal: 2.5, american: 150 },
  ])

  function addEntry() {
    const newId = Math.max(...entries.map(e => e.id)) + 1
    setEntries(prev => [...prev, { id: newId, fracNum: 4, fracDen: 1, decimal: 5.0, american: 400 }])
  }

  function removeEntry(id: number) {
    if (entries.length <= 1) return
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  function updateEntry(id: number, field: string, val: string) {
    const n = parseFloat(val)
    setEntries(prev => prev.map(e => {
      if (e.id !== id) return e
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
    const overround = (totalImplied - 1) * 100
    const fairProbs = impliedProbs.map(p => p / totalImplied)

    return { decimalOdds, impliedProbs, totalImplied, overround, fairProbs }
  }, [entries, format])

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">Implied Probability Calculator</span>
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
                <th className="pb-2 text-left text-gray-500 font-medium w-10 text-center">#</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Odds</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Implied Prob.</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Fair Prob.</th>
                <th className="pb-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={entry.id} className="border-b border-gray-100">
                  <td className="py-2.5 px-3 text-sm text-gray-500 font-medium text-center">{i + 1}</td>
                  <td className="py-2.5 px-3">
                    {format === 'fractional' ? (
                      <div className="flex items-center gap-1">
                        <input type="number" min="1" step="1" value={entry.fracNum}
                          onChange={e => updateEntry(entry.id, 'fracNum', e.target.value)}
                          className="w-16 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <span className="text-gray-500">/</span>
                        <input type="number" min="1" step="1" value={entry.fracDen}
                          onChange={e => updateEntry(entry.id, 'fracDen', e.target.value)}
                          className="w-16 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    ) : format === 'decimal' ? (
                      <input type="number" min="1.01" step="0.01" value={entry.decimal}
                        onChange={e => updateEntry(entry.id, 'decimal', e.target.value)}
                        className="w-24 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    ) : (
                      <input type="number" value={entry.american}
                        onChange={e => updateEntry(entry.id, 'american', e.target.value)}
                        className="w-24 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+200" />
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-sm text-gray-800 font-medium">
                    {(result.impliedProbs[i] * 100).toFixed(2)}%
                  </td>
                  <td className="py-2.5 px-3 text-sm text-gray-600">
                    {(result.fairProbs[i] * 100).toFixed(2)}%
                  </td>
                  <td className="py-2.5 px-3">
                    <button onClick={() => removeEntry(entry.id)} disabled={entries.length <= 1}
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
            ['Total Implied %', `${(result.totalImplied * 100).toFixed(2)}%`],
            ['Overround', `+${result.overround.toFixed(2)}%`],
            ['Book Margin', `${((1 - 1 / result.totalImplied) * 100).toFixed(2)}%`],
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
      </div>
    </div>
  )
}
