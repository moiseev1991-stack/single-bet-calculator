'use client'

import { useState, useMemo } from 'react'

interface DutchSelection {
  id: number
  odds: number
}

export function DutchCalculator() {
  const [selections, setSelections] = useState<DutchSelection[]>([
    { id: 0, odds: 3.0 },
    { id: 1, odds: 4.0 },
    { id: 2, odds: 5.0 },
  ])
  const [totalBudget, setTotalBudget] = useState('')

  function updateOdds(id: number, val: string) {
    const n = parseFloat(val)
    setSelections(prev => prev.map(s => s.id === id ? { ...s, odds: isNaN(n) ? s.odds : Math.max(1.01, n) } : s))
  }

  function addSelection() {
    const newId = Math.max(...selections.map(s => s.id)) + 1
    setSelections(prev => [...prev, { id: newId, odds: 5.0 }])
  }

  function removeSelection(id: number) {
    if (selections.length <= 2) return
    setSelections(prev => prev.filter(s => s.id !== id))
  }

  const result = useMemo(() => {
    const budget = parseFloat(totalBudget)
    if (isNaN(budget) || budget <= 0) return null
    if (selections.some(s => isNaN(s.odds) || s.odds < 1.01)) return null

    // Dutch betting: stake_i = budget * (1/odds_i) / sum(1/odds_j)
    const sumInverse = selections.reduce((sum, s) => sum + 1 / s.odds, 0)
    const overround = sumInverse * 100

    const stakes = selections.map(s => {
      const stake = budget * (1 / s.odds) / sumInverse
      const returnIfWins = stake * s.odds
      const profit = returnIfWins - budget
      return { id: s.id, odds: s.odds, stake, returnIfWins, profit }
    })

    const guaranteedReturn = stakes[0]?.returnIfWins ?? 0
    const guaranteedProfit = guaranteedReturn - budget

    return { stakes, guaranteedReturn, guaranteedProfit, overround }
  }, [selections, totalBudget])

  const budget = parseFloat(totalBudget)

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">Dutching Calculator</span>
      </div>

      <div className="bg-white p-4 space-y-5">
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="pb-2 text-left text-gray-500 font-medium w-10 text-center">#</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Decimal Odds</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Implied Prob.</th>
                <th className="pb-2 text-left text-gray-500 font-medium">Stake</th>
                <th className="pb-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {selections.map((sel, i) => {
                const stake = result?.stakes.find(s => s.id === sel.id)
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
                      {sel.odds > 0 ? (100 / sel.odds).toFixed(1) : '—'}%
                    </td>
                    <td className="py-2.5 px-3 text-sm font-medium text-gray-800">
                      {stake && !isNaN(budget) && budget > 0 ? `£${stake.stake.toFixed(2)}` : '—'}
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

        <button
          onClick={addSelection}
          className="text-sm text-[#1b4fd8] hover:underline"
        >
          + Add selection
        </button>

        <div className="border-t border-gray-100 pt-4 text-sm">
          <label className="block text-gray-600 font-medium mb-1">Total Budget (£)</label>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="e.g. 100"
            value={totalBudget}
            onChange={e => setTotalBudget(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {result && (
          <div className="space-y-3">
            {result.overround > 100 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
                Combined book: <strong>{result.overround.toFixed(1)}%</strong> — above 100%, dutching will show a loss if any selection wins.
              </div>
            )}
            {result.overround <= 100 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-sm text-emerald-800">
                Combined book: <strong>{result.overround.toFixed(1)}%</strong> — below 100%, guaranteed profit possible.
              </div>
            )}

            <div className="grid grid-cols-3 border border-gray-200 rounded overflow-hidden text-sm">
              <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide">
                Total Outlay
              </div>
              <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide border-x border-white/20">
                Return (any winner)
              </div>
              <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide">
                Profit
              </div>
              <div className="text-center py-3 px-2 font-medium text-gray-700 border-r border-gray-100">
                £{budget.toFixed(2)}
              </div>
              <div className="text-center py-3 px-2 font-medium text-gray-700 border-r border-gray-100">
                £{result.guaranteedReturn.toFixed(2)}
              </div>
              <div className={`text-center py-3 px-2 font-semibold ${result.guaranteedProfit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {result.guaranteedProfit >= 0 ? '+' : ''}£{result.guaranteedProfit.toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
