interface ResultsSummaryProps {
  totalOutlay: number | null
  totalReturn: number | null
  totalProfit: number | null
  numBets?: number
}

function fmt(value: number | null): string {
  if (value === null) return '—'
  const abs = Math.abs(value).toFixed(2)
  return value < 0 ? `-£${abs}` : `£${abs}`
}

export function ResultsSummary({ totalOutlay, totalReturn, totalProfit, numBets }: ResultsSummaryProps) {
  const profitPos = totalProfit !== null && totalProfit > 0
  const profitNeg = totalProfit !== null && totalProfit < 0

  const profitColor = profitPos ? 'var(--green)' : profitNeg ? 'var(--red)' : 'var(--text-muted)'
  const neutralColor = totalOutlay !== null ? 'var(--text-col)' : 'var(--text-muted)'

  const profitBg = profitPos
    ? 'linear-gradient(135deg, rgba(5,150,105,0.08) 0%, rgba(5,150,105,0.04) 100%)'
    : profitNeg
    ? 'linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(220,38,38,0.04) 100%)'
    : 'transparent'

  return (
    <div style={{ borderTop: '1px solid var(--border-col)' }}>
      {/* Labels row */}
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        {[
          { label: 'Total Outlay', accent: 'rgba(100,116,139,0.15)' },
          { label: 'Total Return', accent: 'rgba(37,99,235,0.12)' },
          { label: 'Total Profit', accent: profitPos ? 'rgba(5,150,105,0.15)' : profitNeg ? 'rgba(220,38,38,0.12)' : 'rgba(100,116,139,0.10)' },
        ].map(({ label, accent }, i) => (
          <div
            key={label}
            className="text-center py-2 px-2 text-[10px] font-bold uppercase tracking-widest"
            style={{
              background: accent,
              color: 'var(--text-muted)',
              borderRight: i < 2 ? '1px solid var(--border-col)' : 'none',
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Value row */}
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div
          className="text-center py-4 px-2 font-semibold text-xl"
          style={{
            color: neutralColor,
            fontFamily: 'var(--font-syne, Syne, sans-serif)',
            borderRight: '1px solid var(--border-col)',
          }}
        >
          {fmt(totalOutlay)}
        </div>
        <div
          className="text-center py-4 px-2 font-semibold text-xl"
          style={{
            color: neutralColor,
            fontFamily: 'var(--font-syne, Syne, sans-serif)',
            borderRight: '1px solid var(--border-col)',
          }}
        >
          {fmt(totalReturn)}
        </div>
        <div
          className="text-center py-4 px-2 font-bold text-xl transition-colors duration-200"
          style={{
            color: profitColor,
            fontFamily: 'var(--font-syne, Syne, sans-serif)',
            background: profitBg,
          }}
        >
          {fmt(totalProfit)}
        </div>
      </div>

      {numBets !== undefined && (
        <p className="text-[11px] text-right px-5 pb-2" style={{ color: 'var(--text-muted)' }}>
          {numBets} bet{numBets !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}
