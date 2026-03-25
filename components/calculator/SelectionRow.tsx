'use client'

import { Outcome } from '@/lib/calculators/types'
import { OddsFormat } from '@/lib/utils/odds-converter'
import { OddsInput } from './OddsInput'

interface SelectionRowProps {
  index: number
  outcome: Outcome
  numerator: number
  denominator: number
  decimalOdds: number
  americanOdds: number
  rule4Deduction: number
  showRule4: boolean
  oddsFormat: OddsFormat
  onOutcomeChange: (outcome: Outcome) => void
  onOddsChange: (data: { numerator?: number; denominator?: number; decimal?: number; american?: number }) => void
  onRule4Change: (value: number) => void
}

const OUTCOMES: { value: Outcome; label: string }[] = [
  { value: 'winner',     label: 'Winner' },
  { value: 'place',      label: 'Place' },
  { value: 'non-runner', label: 'Non-Runner' },
  { value: 'void',       label: 'Void' },
]

const OUTCOME_ACCENT: Record<string, string> = {
  winner:       'var(--green)',
  place:        'var(--blue)',
  'non-runner': 'var(--text-muted)',
  void:         'var(--amber)',
}

const selectCls =
  'border rounded-lg px-2 py-2 text-sm bg-[var(--bg-surface2)] border-[var(--border-col)] text-[var(--text-col)] focus:outline-none focus:border-[var(--blue)] transition-colors duration-150 w-full appearance-none cursor-pointer'

export function SelectionRow({
  index,
  outcome,
  numerator,
  denominator,
  decimalOdds,
  americanOdds,
  rule4Deduction,
  showRule4,
  oddsFormat,
  onOutcomeChange,
  onOddsChange,
  onRule4Change,
}: SelectionRowProps) {
  const accentColor = OUTCOME_ACCENT[outcome] ?? 'var(--blue)'

  return (
    <div
      className="grid items-center gap-2.5 py-3 pr-5 relative"
      style={{
        gridTemplateColumns: showRule4 ? '4px 28px 1fr 1fr 80px' : '4px 28px 1fr 1fr',
        borderTop: '1px solid var(--border-col)',
        paddingLeft: 0,
      }}
    >
      {/* Color accent bar */}
      <div
        className="self-stretch rounded-r-full"
        style={{
          background: accentColor,
          width: 4,
          minHeight: 36,
          transition: 'background 0.2s',
          marginRight: 12,
        }}
      />

      {/* Number badge */}
      <div
        className="flex items-center justify-center rounded-lg text-sm font-bold flex-shrink-0"
        style={{
          width: 28,
          height: 28,
          background: `${accentColor}18`,
          color: accentColor,
          transition: 'all 0.2s',
        }}
      >
        {index + 1}
      </div>

      {/* Outcome */}
      <div className="relative">
        <select
          value={outcome}
          onChange={e => onOutcomeChange(e.target.value as Outcome)}
          className={selectCls}
        >
          {OUTCOMES.map(o => (
            <option key={o.value} value={o.value} style={{ background: 'var(--bg-surface2)' }}>
              {o.label}
            </option>
          ))}
        </select>
        {/* Custom chevron */}
        <svg
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
          width="12" height="12" viewBox="0 0 12 12" fill="none"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Odds */}
      <OddsInput
        format={oddsFormat}
        numerator={numerator}
        denominator={denominator}
        decimalValue={decimalOdds}
        americanValue={americanOdds}
        onChange={onOddsChange}
      />

      {/* Rule 4 */}
      {showRule4 && (
        <div className="flex items-center gap-1">
          <input
            type="number"
            min="0"
            max="75"
            step="5"
            value={rule4Deduction}
            onChange={e =>
              onRule4Change(Math.min(75, Math.max(0, parseInt(e.target.value) || 0)))
            }
            className="border rounded-lg px-2 py-2 text-sm text-center bg-[var(--bg-surface2)] border-[var(--border-col)] text-[var(--text-col)] focus:outline-none focus:border-[var(--amber)] transition-colors duration-150 w-full"
          />
          <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>%</span>
        </div>
      )}
    </div>
  )
}
