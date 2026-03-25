interface InfoPanelProps {
  betType?: string
  numSelections?: number
  eachWay?: boolean
  ewFraction?: number
  ewPlaces?: number
}

const QUICK_EXAMPLES = [
  { frac: '2/1',  dec: '3.00', stake: '£10', profit: '+£20.00' },
  { frac: '7/4',  dec: '2.75', stake: '£20', profit: '+£35.00' },
  { frac: '5/2',  dec: '3.50', stake: '£50', profit: '+£125.00' },
]

function SectionLabel({ color, children }: { color: string; children: string }) {
  return (
    <p
      className="text-[10px] font-semibold uppercase tracking-[.08em] mb-3 flex items-center gap-1.5"
      style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
      <span style={{ color }}>{children}</span>
    </p>
  )
}

export function InfoPanel({
  betType = 'single',
  numSelections = 1,
  eachWay = false,
  ewFraction = 4,
  ewPlaces = 3,
}: InfoPanelProps) {
  const numBets = eachWay ? 2 : 1
  const betLabel = eachWay ? 'Each Way Single' : 'Single'
  const fractionLabel = `1/${ewFraction}`

  const infoRows = [
    ['Bet type',    betLabel],
    ['Selections',  String(numSelections)],
    ['Total bets',  String(numBets)],
    ...(eachWay
      ? [['Place fraction', fractionLabel], ['Places', String(ewPlaces)]]
      : []),
  ] as [string, string][]

  return (
    <div className="space-y-4">
      {/* Bet Info */}
      <div
        className="rounded-xl p-4 border"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-col)' }}
      >
        <SectionLabel color="var(--blue)">Bet Info</SectionLabel>
        <div>
          {infoRows.map(([key, val], i) => (
            <div
              key={key}
              className="flex justify-between py-1.5 text-[13px]"
              style={{
                borderBottom: i < infoRows.length - 1 ? '1px solid var(--border-col)' : 'none',
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>{key}</span>
              <span
                style={{
                  color: key === 'Total bets' ? 'var(--green)' : 'var(--text-col)',
                  fontWeight: key === 'Total bets' ? 600 : 400,
                }}
              >
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Examples */}
      <div
        className="rounded-xl p-4 border"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-col)' }}
      >
        <SectionLabel color="var(--green)">Quick Examples</SectionLabel>
        <div className="space-y-2.5">
          {QUICK_EXAMPLES.map((ex, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-medium" style={{ color: 'var(--text-col)' }}>{ex.frac}</span>
                <span
                  className="px-1.5 py-0.5 rounded text-[10px]"
                  style={{ background: 'var(--bg-surface2)', color: 'var(--text-muted)' }}
                >
                  {ex.dec}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{ex.stake}</span>
              </div>
              <span
                className="font-semibold"
                style={{ color: 'var(--green)', fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
              >
                {ex.profit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div
        className="rounded-xl p-4 border"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-col)' }}
      >
        <SectionLabel color="var(--purple)">How it works</SectionLabel>
        <p className="text-xs leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
          A <span style={{ color: 'var(--text-col)' }}>single bet</span> is one selection
          in any market or sport. Enter your stake and odds — return and profit
          update in real time. Enable{' '}
          <span style={{ color: 'var(--text-col)' }}>each-way</span> to split into a win
          bet and a place bet, or add a{' '}
          <span style={{ color: 'var(--text-col)' }}>Rule 4</span> deduction for
          withdrawn runners.
        </p>
      </div>
    </div>
  )
}
