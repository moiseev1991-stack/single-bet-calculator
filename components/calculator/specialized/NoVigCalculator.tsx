'use client'

import { useState, useMemo } from 'react'

interface VigOdds {
  id: number
  odds: number
}

export function NoVigCalculator() {
  const [selections, setSelections] = useState<VigOdds[]>([
    { id: 0, odds: 1.91 },
    { id: 1, odds: 1.91 },
  ])

  function updateOdds(id: number, val: string) {
    const n = parseFloat(val)
    setSelections(prev => prev.map(s => s.id === id ? { ...s, odds: isNaN(n) ? s.odds : Math.max(1.01, n) } : s))
  }

  function addSelection() {
    const newId = Math.max(...selections.map(s => s.id)) + 1
    setSelections(prev => [...prev, { id: newId, odds: 2.0 }])
  }

  function removeSelection(id: number) {
    if (selections.length <= 2) return
    setSelections(prev => prev.filter(s => s.id !== id))
  }

  const result = useMemo(() => {
    if (selections.some(s => isNaN(s.odds) || s.odds < 1.01)) return null

    const impliedProbs = selections.map(s => 1 / s.odds)
    const totalImpliedProb = impliedProbs.reduce((sum, p) => sum + p, 0)
    const vigPct = (totalImpliedProb - 1) * 100
    const margin = (1 - 1 / totalImpliedProb) * 100

    // Fair (no-vig) probabilities: normalize by sum of implied probs
    const fairProbs = impliedProbs.map(p => p / totalImpliedProb)

    // Fair decimal odds = 1 / fair probability
    const fairOdds = fairProbs.map(p => 1 / p)

    return { impliedProbs, totalImpliedProb, vigPct, margin, fairProbs, fairOdds }
  }, [selections])

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">No Vig / Fair Odds Calculator</span>
      </div>

      <div className="bg-white p-4 space-y-5">
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="pb-2 text-left text-gray-500 font-medium w-10 text-center">#</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Bookmaker Odds</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Implied Prob.</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Fair Prob.</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Fair Odds</th>
                <th className="pb-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {selections.map((sel, i) => {
                const fairOdds = result?.fairOdds[i]
                const impliedProb = result?.impliedProbs[i]
                const fairProb = result?.fairProbs[i]
                return (
                  <tr key={sel.id} className="border-b border-gray-100">
                    <td className="py-2.5 px-3 text-sm text-gray-500 font-medium text-center">{i + 1}</td>
                    <td className="py-2.5 px-3">
                      <input
                        type="number"
                        min="1.01"
                        step="0.01"
                        value={sel.odds}
                        onChange={e => updateOdds(sel.id, e.target.value)}
                        className="w-24 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-sm text-gray-600">
                      {impliedProb !== undefined ? `${(impliedProb * 100).toFixed(2)}%` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-sm text-gray-600">
                      {fairProb !== undefined ? `${(fairProb * 100).toFixed(2)}%` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-sm font-semibold text-[#1b4fd8]">
                      {fairOdds !== undefined ? fairOdds.toFixed(3) : '—'}
                    </td>
                    <td className="py-2.5 px-3">
                      <button
                        onClick={() => removeSelection(sel.id)}
                        disabled={selections.length <= 2}
                        className="text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed text-lg leading-none"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <button onClick={addSelection} className="text-sm text-[#1b4fd8] hover:underline">
          + Add outcome
        </button>

        {result && (
          <div className="grid grid-cols-3 border border-gray-200 rounded overflow-hidden text-sm">
            <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide">
              Total Implied %
            </div>
            <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide border-x border-white/20">
              Overround (Vig)
            </div>
            <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide">
              Book Margin
            </div>
            <div className="text-center py-3 px-2 font-medium text-gray-700 border-r border-gray-100">
              {(result.totalImpliedProb * 100).toFixed(2)}%
            </div>
            <div className="text-center py-3 px-2 font-medium text-orange-600 border-r border-gray-100">
              +{result.vigPct.toFixed(2)}%
            </div>
            <div className="text-center py-3 px-2 font-medium text-orange-600">
              {result.margin.toFixed(2)}%
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
