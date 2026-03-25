'use client'

import { useState, useMemo } from 'react'

interface ArbSelection {
  id: number
  odds: number
}

function makeArb(id: number, odds = 2.0): ArbSelection {
  return { id, odds }
}

export function ArbitrageCalculator() {
  const [selections, setSelections] = useState<ArbSelection[]>([
    makeArb(0, 2.1),
    makeArb(1, 2.1),
  ])
  const [totalBudget, setTotalBudget] = useState('')

  function updateOdds(id: number, val: string) {
    const n = parseFloat(val)
    setSelections(prev => prev.map(s => s.id === id ? { ...s, odds: isNaN(n) ? s.odds : Math.max(1.01, n) } : s))
  }

  function addSelection() {
    setSelections(prev => [...prev, makeArb(prev.length, 3.0)])
  }

  function removeSelection(id: number) {
    if (selections.length <= 2) return
    setSelections(prev => prev.filter(s => s.id !== id))
  }

  const result = useMemo(() => {
    const budget = parseFloat(totalBudget)
    if (isNaN(budget) || budget <= 0) return null
    if (selections.some(s => s.odds < 1.01)) return null

    // Sum of inverse odds = arbitrage percentage
    const arbPct = selections.reduce((sum, s) => sum + 1 / s.odds, 0)
    const profit = budget * (1 / arbPct - 1)
    const isArb = arbPct < 1

    // Optimal stakes for equal profit
    const stakes = selections.map(s => ({
      id: s.id,
      odds: s.odds,
      stake: budget / (s.odds * arbPct),
      profit: budget / arbPct - budget / (s.odds * arbPct),
    }))

    return { arbPct, profit, isArb, stakes }
  }, [selections, totalBudget])

  const budget = parseFloat(totalBudget)

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">Arbitrage Calculator</span>
      </div>

      <div className="bg-white p-4 space-y-5">
        {/* Selections */}
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide px-1">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Decimal Odds</div>
            <div className="col-span-4">Implied Prob.</div>
            <div className="col-span-3">Stake</div>
          </div>
          {selections.map((sel, i) => {
            const stake = result?.stakes.find(s => s.id === sel.id)
            return (
              <div key={sel.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-1 text-sm text-gray-500 font-medium text-center">{i + 1}</div>
                <div className="col-span-4">
                  <input
                    type="number"
                    min="1.01"
                    step="0.01"
                    value={sel.odds}
                    onChange={e => updateOdds(sel.id, e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-4 text-sm text-gray-600 text-center">
                  {(100 / sel.odds).toFixed(1)}%
                </div>
                <div className="col-span-2 text-sm text-gray-700 font-medium">
                  {stake && !isNaN(budget) && budget > 0
                    ? `£${stake.stake.toFixed(2)}`
                    : '—'}
                </div>
                <div className="col-span-1">
                  <button
                    onClick={() => removeSelection(sel.id)}
                    disabled={selections.length <= 2}
                    className="text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
            )
          })}
          <button
            onClick={addSelection}
            className="text-sm text-[#1b4fd8] hover:underline"
          >
            + Add outcome
          </button>
        </div>

        <div className="border-t border-gray-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Total Budget (£)</label>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="e.g. 100"
              value={totalBudget}
              onChange={e => setTotalBudget(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {result && (
          <div className="space-y-3">
            <div
              className={`rounded-lg px-4 py-3 text-sm font-medium ${
                result.isArb
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {result.isArb ? (
                <>
                  Arbitrage opportunity found! Arbitrage margin: <strong>{((1 - result.arbPct) * 100).toFixed(2)}%</strong>
                </>
              ) : (
                <>
                  No arbitrage — margin is <strong>+{((result.arbPct - 1) * 100).toFixed(2)}%</strong> in favour of the bookmaker.
                </>
              )}
            </div>

            <div className="grid grid-cols-3 border border-gray-200 rounded overflow-hidden text-sm">
              <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide">
                Total Outlay
              </div>
              <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide border-x border-white/20">
                Arb Margin
              </div>
              <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide">
                Guaranteed Profit
              </div>
              <div className="text-center py-3 px-2 font-medium text-gray-700 border-r border-gray-100">
                £{budget.toFixed(2)}
              </div>
              <div className="text-center py-3 px-2 font-medium text-gray-700 border-r border-gray-100">
                {(result.arbPct * 100).toFixed(2)}%
              </div>
              <div className={`text-center py-3 px-2 font-semibold ${result.isArb ? 'text-emerald-600' : 'text-red-500'}`}>
                {result.isArb ? `£${result.profit.toFixed(2)}` : '—'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
