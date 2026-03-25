'use client'

import { useState, useMemo, useCallback } from 'react'
import { Settings, Share2, Check, RotateCcw } from 'lucide-react'
import { OddsFormat, fractionalToDecimal, americanToDecimal, decimalToFractional, decimalToAmerican } from '@/lib/utils/odds-converter'
import { Outcome, Selection, EachWayTerms } from '@/lib/calculators/types'
import { calculateSingle } from '@/lib/calculators/single'
import { calculateAccumulator } from '@/lib/calculators/accumulator'
import { calculateFullCover, FULL_COVER_CONFIGS } from '@/lib/calculators/full-cover'
import { SelectionRow } from './SelectionRow'
import { ResultsSummary } from './ResultsSummary'
import { ToggleSwitch } from './ToggleSwitch'

export type BetType = 'single' | 'double' | 'treble' | 'accumulator' | string

interface BetCalculatorProps {
  betType: BetType
  title: string
  fixedSelections?: number
  onStateChange?: (state: { eachWay: boolean; numSelections: number; ewFraction: number; ewPlaces: number }) => void
}

interface SelectionState {
  id: number
  outcome: Outcome
  numerator: number
  denominator: number
  decimalOdds: number
  americanOdds: number
  rule4Deduction: number
}

const EW_FRACTIONS = [
  { label: '1/4', value: 4 },
  { label: '1/5', value: 5 },
  { label: '1/3', value: 3 },
  { label: '1/6', value: 6 },
  { label: '1/8', value: 8 },
]

const EW_PLACES = [2, 3, 4, 5, 6, 7, 8]

const FORMATS: { value: OddsFormat; label: string }[] = [
  { value: 'fractional', label: 'Fractional' },
  { value: 'decimal',    label: 'Decimal' },
  { value: 'american',   label: 'American' },
]

function makeSelection(id: number): SelectionState {
  return { id, outcome: 'winner', numerator: 1, denominator: 1, decimalOdds: 2.0, americanOdds: 100, rule4Deduction: 0 }
}

function selectionToCalc(s: SelectionState, format: OddsFormat): Selection {
  let decimal: number
  if (format === 'fractional') {
    decimal = fractionalToDecimal(s.numerator, s.denominator)
  } else if (format === 'decimal') {
    decimal = s.decimalOdds
  } else {
    decimal = americanToDecimal(s.americanOdds)
  }
  return { id: s.id, outcome: s.outcome, decimalOdds: Math.max(1.001, decimal), rule4Deduction: s.rule4Deduction }
}

const selectCls =
  'border rounded-lg px-3 py-2 text-sm bg-[var(--bg-surface2)] border-[var(--border-col)] text-[var(--text-col)] focus:outline-none focus:border-[var(--blue)] transition-colors duration-150 appearance-none cursor-pointer'

export function BetCalculator({ betType, title, fixedSelections, onStateChange }: BetCalculatorProps) {
  const isSingle     = betType === 'single' || betType === 'each-way'
  const isAccumulator = betType === 'accumulator' || betType === 'double' || betType === 'treble' || betType === 'each-way-double'
  const isFullCover  = betType in FULL_COVER_CONFIGS

  const defaultSelections = fixedSelections ?? (
    betType === 'double'         ? 2 :
    betType === 'treble'         ? 3 :
    betType === 'each-way-double'? 2 :
    betType === 'each-way'       ? 1 : 1
  )

  const [numSelections, setNumSelections] = useState(defaultSelections)
  const [selections, setSelections] = useState<SelectionState[]>(() =>
    Array.from({ length: defaultSelections }, (_, i) => makeSelection(i)),
  )
  const [eachWay,      setEachWay]      = useState(false)
  const [ewFraction,   setEwFraction]   = useState(4)
  const [ewPlaces,     setEwPlaces]     = useState(3)
  const [showRule4,    setShowRule4]    = useState(false)
  const [oddsFormat,   setOddsFormat]   = useState<OddsFormat>('fractional')
  const [stakeType,    setStakeType]    = useState<'per-bet' | 'total'>('per-bet')
  const [stake,        setStake]        = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [copied,       setCopied]       = useState(false)

  const handleShare = useCallback(() => {
    const params = new URLSearchParams()
    params.set('ew', eachWay ? '1' : '0')
    params.set('r4', showRule4 ? '1' : '0')
    params.set('fmt', oddsFormat)
    params.set('st', stakeType)
    if (stake) params.set('s', stake)
    selections.forEach((sel, i) => {
      params.set(`o${i}`, sel.outcome)
      params.set(`n${i}`, String(sel.numerator))
      params.set(`d${i}`, String(sel.denominator))
      if (oddsFormat === 'decimal')  params.set(`dec${i}`, String(sel.decimalOdds))
      if (oddsFormat === 'american') params.set(`am${i}`,  String(sel.americanOdds))
      if (sel.rule4Deduction) params.set(`r4v${i}`, String(sel.rule4Deduction))
    })
    const url = `${window.location.href.split('?')[0]}?${params.toString()}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [eachWay, showRule4, oddsFormat, stakeType, stake, selections])

  const handleReset = useCallback(() => {
    setSelections(Array.from({ length: defaultSelections }, (_, i) => makeSelection(i)))
    setNumSelections(defaultSelections)
    setEachWay(false)
    setShowRule4(false)
    setStake('')
  }, [defaultSelections])

  const eachWayTerms: EachWayTerms = { fraction: ewFraction, places: ewPlaces }

  function handleNumSelectionsChange(n: number) {
    setNumSelections(n)
    setSelections(prev => {
      if (n > prev.length) {
        return [...prev, ...Array.from({ length: n - prev.length }, (_, i) => makeSelection(prev.length + i))]
      }
      return prev.slice(0, n)
    })
  }

  function updateSelection(id: number, patch: Partial<SelectionState>) {
    setSelections(prev => prev.map(s => (s.id === id ? { ...s, ...patch } : s)))
  }

  function handleOddsChange(id: number, data: { numerator?: number; denominator?: number; decimal?: number; american?: number }) {
    setSelections(prev =>
      prev.map(s => {
        if (s.id !== id) return s
        const next = { ...s }
        if (data.numerator  !== undefined) next.numerator  = data.numerator
        if (data.denominator !== undefined) next.denominator = data.denominator
        if (data.decimal !== undefined) {
          next.decimalOdds = data.decimal
          const frac = decimalToFractional(data.decimal)
          next.numerator   = frac.numerator
          next.denominator = frac.denominator
          next.americanOdds = decimalToAmerican(data.decimal)
        }
        if (data.american !== undefined) {
          next.americanOdds = data.american
          const dec = americanToDecimal(data.american)
          next.decimalOdds  = dec
          const frac = decimalToFractional(dec)
          next.numerator    = frac.numerator
          next.denominator  = frac.denominator
        }
        if (data.numerator !== undefined || data.denominator !== undefined) {
          const num = data.numerator  ?? s.numerator
          const den = data.denominator ?? s.denominator
          const dec = fractionalToDecimal(num, den)
          next.decimalOdds  = dec
          next.americanOdds = decimalToAmerican(dec)
        }
        return next
      }),
    )
  }

  const stakeNum = parseFloat(stake)
  const hasStake = !isNaN(stakeNum) && stakeNum > 0

  const result = useMemo(() => {
    if (!hasStake) return null
    const calcs = selections.map(s => selectionToCalc(s, oddsFormat))
    const effectiveEW = betType === 'each-way' || betType === 'each-way-double' ? true : eachWay
    if (isSingle)      return calculateSingle(calcs, stakeNum, stakeType, effectiveEW, eachWayTerms)
    if (isAccumulator) return calculateAccumulator(calcs, stakeNum, effectiveEW, eachWayTerms)
    if (isFullCover) {
      const config = FULL_COVER_CONFIGS[betType]
      return calculateFullCover(calcs, stakeNum, stakeType, effectiveEW, eachWayTerms, config)
    }
    return null
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections, stakeNum, stakeType, eachWay, ewFraction, ewPlaces, oddsFormat, hasStake, betType])

  const btnHeader = 'flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 transition-all duration-150 rounded-lg px-2.5 py-1.5 text-xs text-white backdrop-blur-sm'

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-col)',
        boxShadow: '0 4px 24px rgba(37,99,235,0.08), 0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-5 py-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #0e7490 100%)',
        }}
      >
        {/* decorative glow circles */}
        <div className="pointer-events-none absolute -top-6 -right-6 w-28 h-28 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="pointer-events-none absolute top-2 right-16 w-10 h-10 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <span className="text-sm font-semibold text-white relative z-10">
          {title}
        </span>
        <div className="flex items-center gap-2 relative z-10">
          <button onClick={handleShare} className={btnHeader} title="Copy link">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            {copied ? 'Copied!' : 'Share'}
          </button>
          <button onClick={() => setShowSettings(!showSettings)} className={btnHeader}>
            <Settings className="h-3.5 w-3.5" />
            Settings
          </button>
        </div>
      </div>

      {/* ── Format toggle ── */}
      <div
        className="flex p-1.5 gap-1 m-3 rounded-xl"
        style={{ background: 'var(--bg-surface2)', borderBottom: 'none' }}
      >
        {FORMATS.map(fmt => (
          <button
            key={fmt.value}
            onClick={() => setOddsFormat(fmt.value)}
            className="flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200"
            style={{
              background: oddsFormat === fmt.value
                ? 'linear-gradient(135deg, #2563eb 0%, #0e7490 100%)'
                : 'transparent',
              color:      oddsFormat === fmt.value ? '#fff' : 'var(--text-muted)',
              boxShadow: oddsFormat === fmt.value ? '0 2px 8px rgba(37,99,235,0.3)' : 'none',
            }}
          >
            {fmt.label}
          </button>
        ))}
      </div>

      {/* ── Settings panel ── */}
      {showSettings && (
        <div
          className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
          style={{ borderBottom: '1px solid var(--border-col)', background: 'var(--bg-base)' }}
        >
          {/* EW settings (only shown when EW is on) */}
          {eachWay && (
            <>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Each Way Fraction</label>
                <div className="relative">
                  <select
                    value={ewFraction}
                    onChange={e => setEwFraction(parseInt(e.target.value))}
                    className={selectCls + ' w-full pr-7'}
                  >
                    {EW_FRACTIONS.map(f => (
                      <option key={f.value} value={f.value} style={{ background: 'var(--bg-surface2)' }}>{f.label}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Each Way Places</label>
                <div className="relative">
                  <select
                    value={ewPlaces}
                    onChange={e => setEwPlaces(parseInt(e.target.value))}
                    className={selectCls + ' w-full pr-7'}
                  >
                    {EW_PLACES.map(p => (
                      <option key={p} value={p} style={{ background: 'var(--bg-surface2)' }}>{p} places</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </>
          )}
          {!eachWay && (
            <p className="text-xs col-span-2" style={{ color: 'var(--text-muted)' }}>
              Enable "Each Way" to configure place terms.
            </p>
          )}
        </div>
      )}

      {/* ── Selection rows ── */}
      <div>
        {selections.map((sel, i) => (
          <SelectionRow
            key={sel.id}
            index={i}
            outcome={sel.outcome}
            numerator={sel.numerator}
            denominator={sel.denominator}
            decimalOdds={sel.decimalOdds}
            americanOdds={sel.americanOdds}
            rule4Deduction={sel.rule4Deduction}
            showRule4={showRule4}
            oddsFormat={oddsFormat}
            onOutcomeChange={outcome => updateSelection(sel.id, { outcome })}
            onOddsChange={data => handleOddsChange(sel.id, data)}
            onRule4Change={value => updateSelection(sel.id, { rule4Deduction: value })}
          />
        ))}
      </div>

      {/* ── Toggles row ── */}
      <div
        className="flex gap-2 flex-wrap px-5 py-3"
        style={{ borderTop: '1px solid var(--border-col)', borderBottom: '1px solid var(--border-col)' }}
      >
        {/* Each Way toggle (only for applicable bet types) */}
        {betType !== 'each-way' && betType !== 'each-way-double' && (
          <ToggleSwitch
            label="Each Way"
            checked={eachWay}
            onChange={setEachWay}
            accent="blue"
          />
        )}

        {/* Rule 4 toggle */}
        <ToggleSwitch
          label="Rule 4"
          checked={showRule4}
          onChange={setShowRule4}
          accent="amber"
        />

        {/* Number of selections (only for variable types) */}
        {!fixedSelections && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Selections</span>
            <div className="relative">
              <select
                value={numSelections}
                onChange={e => handleNumSelectionsChange(parseInt(e.target.value))}
                className={selectCls + ' pr-7 py-1.5 text-xs'}
                style={{ minWidth: 56 }}
              >
                {Array.from({ length: isSingle ? 20 : 19 }, (_, i) => i + (isSingle ? 1 : 2)).map(n => (
                  <option key={n} value={n} style={{ background: 'var(--bg-surface2)' }}>{n}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* ── Rule 4 global deduction row ── */}
      {showRule4 && (
        <div
          className="flex items-center gap-3 px-5 py-2.5"
          style={{ borderBottom: '1px solid var(--border-col)', background: 'rgba(255,184,0,0.04)' }}
        >
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Rule 4 deduction per selection (%) — set in each row above</span>
        </div>
      )}

      {/* ── Stake row ── */}
      <div
        className="flex gap-3 items-end px-5 py-4"
        style={{ borderBottom: '1px solid var(--border-col)' }}
      >
        {/* Stake type */}
        <div className="flex-shrink-0">
          <label className="block text-[11px] mb-1.5" style={{ color: 'var(--text-muted)' }}>Type</label>
          <div className="relative">
            <select
              value={stakeType}
              onChange={e => setStakeType(e.target.value as 'per-bet' | 'total')}
              className={selectCls + ' pr-8 text-xs'}
            >
              <option value="per-bet" style={{ background: 'var(--bg-surface2)' }}>Per Bet</option>
              <option value="total"   style={{ background: 'var(--bg-surface2)' }}>Total</option>
            </select>
            <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Stake amount */}
        <div className="flex-1">
          <label className="block text-[11px] mb-1.5" style={{ color: 'var(--text-muted)' }}>Stake</label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm select-none pointer-events-none"
              style={{ color: 'var(--text-muted)' }}
            >
              £
            </span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={stake}
              onChange={e => setStake(e.target.value)}
              className="border rounded-lg pl-7 pr-3 py-2 text-sm w-full bg-[var(--bg-surface2)] border-[var(--border-col)] text-[var(--text-col)] focus:outline-none focus:border-[var(--blue)] transition-colors duration-150 placeholder-[var(--text-muted)]"
            />
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <ResultsSummary
        totalOutlay={result?.totalOutlay ?? null}
        totalReturn={result?.totalReturn ?? null}
        totalProfit={result?.totalProfit ?? null}
        numBets={result?.numBets}
      />

      {/* ── Reset ── */}
      <div className="px-5 py-3">
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs border transition-all duration-150 group"
          style={{ borderColor: 'var(--border-col)', color: 'var(--text-muted)' }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.borderColor = 'var(--red)'
            el.style.color = 'var(--red)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.borderColor = 'var(--border-col)'
            el.style.color = 'var(--text-muted)'
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>
    </div>
  )
}
