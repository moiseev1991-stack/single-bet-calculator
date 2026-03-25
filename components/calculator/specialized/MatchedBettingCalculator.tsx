'use client'

import { useState, useMemo } from 'react'

export function MatchedBettingCalculator() {
  const [backOdds, setBackOdds] = useState('3.00')
  const [layOdds, setLayOdds] = useState('3.10')
  const [backStake, setBackStake] = useState('')
  const [commission, setCommission] = useState('5')
  const [betType, setBetType] = useState<'normal' | 'free'>('normal')
  const [freeBetStakeReturned, setFreeBetStakeReturned] = useState(false)

  const result = useMemo(() => {
    const bo = parseFloat(backOdds)
    const lo = parseFloat(layOdds)
    const bs = parseFloat(backStake)
    const comm = parseFloat(commission) / 100

    if (isNaN(bo) || isNaN(lo) || isNaN(bs) || bs <= 0 || lo < 1.01 || bo < 1.01) return null

    let layStake: number

    if (betType === 'normal') {
      // Lay stake for qualifying bet: layStake = (backStake × backOdds) / (layOdds - commission)
      layStake = (bs * bo) / (lo - comm)
    } else {
      // Free bet (stake not returned): layStake = (backStake × (backOdds - 1)) / (layOdds - commission)
      layStake = (bs * (bo - 1)) / (lo - comm)
    }

    const layLiability = layStake * (lo - 1)

    // P&L if back wins
    const backWinProfit = betType === 'normal'
      ? bs * (bo - 1)
      : freeBetStakeReturned ? bs * bo : bs * (bo - 1)

    const layLoss = layStake * (lo - 1)
    const pnlBackWins = backWinProfit - layLoss

    // P&L if back loses
    const backLoss = betType === 'normal' ? -bs : 0 // free bet: no loss
    const layWin = layStake * (1 - comm)
    const pnlBackLoses = backLoss + layWin

    const qualifyingLoss = pnlBackWins // worst case (back wins) for normal bets

    return { layStake, layLiability, pnlBackWins, pnlBackLoses, qualifyingLoss }
  }, [backOdds, layOdds, backStake, commission, betType, freeBetStakeReturned])

  const formatPnl = (v: number) => {
    const sign = v >= 0 ? '+' : ''
    return `${sign}£${v.toFixed(2)}`
  }

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">Matched Betting Calculator</span>
      </div>

      <div className="bg-white p-4 space-y-5">
        {/* Bet type toggle */}
        <div className="text-sm">
          <label className="block text-gray-600 font-medium mb-2">Bet Type</label>
          <div className="flex gap-2">
            {[['normal', 'Qualifying Bet'], ['free', 'Free Bet']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setBetType(val as 'normal' | 'free')}
                className={`px-4 py-2 text-sm font-medium border rounded transition-colors ${
                  betType === val
                    ? 'bg-[#1b4fd8] text-white border-[#1b4fd8]'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {betType === 'free' && (
          <div className="text-sm">
            <label className="block text-gray-600 font-medium mb-1">Free Bet Type</label>
            <div className="flex gap-2">
              {[[false, 'Stake Not Returned (SNR)'], [true, 'Stake Returned (SR)']].map(([val, label]) => (
                <button
                  key={String(val)}
                  onClick={() => setFreeBetStakeReturned(val as boolean)}
                  className={`px-3 py-1.5 text-sm font-medium border rounded transition-colors ${
                    freeBetStakeReturned === val
                      ? 'bg-[#f59e0b] text-white border-[#f59e0b]'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {label as string}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Back Odds (Decimal)</label>
            <input
              type="number"
              min="1.01"
              step="0.01"
              value={backOdds}
              onChange={e => setBackOdds(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Lay Odds (Decimal)</label>
            <input
              type="number"
              min="1.01"
              step="0.01"
              value={layOdds}
              onChange={e => setLayOdds(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              {betType === 'free' ? 'Free Bet Amount (£)' : 'Back Stake (£)'}
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="e.g. 10.00"
              value={backStake}
              onChange={e => setBackStake(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Exchange Commission (%)</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.5"
              value={commission}
              onChange={e => setCommission(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {result && (
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800 space-y-1">
              <div>Lay stake: <strong>£{result.layStake.toFixed(2)}</strong></div>
              <div>Lay liability: <strong>£{result.layLiability.toFixed(2)}</strong></div>
            </div>

            <div className="grid grid-cols-2 border border-gray-200 rounded overflow-hidden text-sm">
              <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide">
                If Back Wins
              </div>
              <div className="bg-[#1b4fd8] text-white text-center py-2.5 px-2 font-semibold text-xs uppercase tracking-wide border-l border-white/20">
                If Back Loses
              </div>
              <div className={`text-center py-3 px-2 font-semibold ${result.pnlBackWins >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {formatPnl(result.pnlBackWins)}
              </div>
              <div className={`text-center py-3 px-2 font-semibold border-l border-gray-100 ${result.pnlBackLoses >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {formatPnl(result.pnlBackLoses)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
