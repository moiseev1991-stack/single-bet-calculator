'use client'

import { OddsFormat } from '@/lib/utils/odds-converter'

interface OddsInputProps {
  format: OddsFormat
  numerator: number
  denominator: number
  decimalValue: number
  americanValue: number
  onChange: (data: { numerator?: number; denominator?: number; decimal?: number; american?: number }) => void
}

const inputCls =
  'border rounded-lg px-2 py-2 text-sm text-center bg-[var(--bg-surface2)] border-[var(--border-col)] text-[var(--text-col)] focus:outline-none focus:border-[var(--blue)] transition-colors duration-150 placeholder-[var(--text-muted)] w-full'

export function OddsInput({ format, numerator, denominator, decimalValue, americanValue, onChange }: OddsInputProps) {
  if (format === 'fractional') {
    return (
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          min="1"
          step="1"
          value={numerator}
          onChange={e => onChange({ numerator: Math.max(1, parseInt(e.target.value) || 1) })}
          className={inputCls}
          style={{ width: 54 }}
        />
        <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem', userSelect: 'none' }}>/</span>
        <input
          type="number"
          min="1"
          step="1"
          value={denominator}
          onChange={e => onChange({ denominator: Math.max(1, parseInt(e.target.value) || 1) })}
          className={inputCls}
          style={{ width: 54 }}
        />
      </div>
    )
  }

  if (format === 'decimal') {
    return (
      <input
        type="number"
        min="1.01"
        step="0.01"
        value={decimalValue}
        onChange={e => onChange({ decimal: Math.max(1.01, parseFloat(e.target.value) || 1.01) })}
        className={inputCls}
        style={{ width: 90 }}
      />
    )
  }

  return (
    <input
      type="number"
      value={americanValue}
      onChange={e => onChange({ american: parseInt(e.target.value) || 100 })}
      className={inputCls}
      style={{ width: 90 }}
      placeholder="+100"
    />
  )
}
