'use client'

import { useState, useMemo } from 'react'
import { decimalToFractional, decimalToAmerican, fractionalToDecimal, americanToDecimal } from '@/lib/utils/odds-converter'

type InputMode = 'decimal' | 'fractional' | 'american'

export function OddsConverterCalculator() {
  const [inputMode, setInputMode] = useState<InputMode>('fractional')
  const [decimalInput, setDecimalInput] = useState('3.00')
  const [fracNum, setFracNum] = useState(2)
  const [fracDen, setFracDen] = useState(1)
  const [americanInput, setAmericanInput] = useState('+200')

  const result = useMemo(() => {
    let decimal: number

    if (inputMode === 'decimal') {
      decimal = parseFloat(decimalInput)
      if (isNaN(decimal) || decimal < 1.01) return null
    } else if (inputMode === 'fractional') {
      if (fracDen === 0) return null
      decimal = fractionalToDecimal(fracNum, fracDen)
    } else {
      const am = parseFloat(americanInput)
      if (isNaN(am) || am === 0) return null
      decimal = americanToDecimal(am)
    }

    const frac = decimalToFractional(decimal)
    const american = decimalToAmerican(decimal)
    const impliedProb = (1 / decimal) * 100
    const profit100 = american > 0 ? american : Math.round(10000 / Math.abs(american)) / 100

    return { decimal, frac, american, impliedProb, profit100 }
  }, [inputMode, decimalInput, fracNum, fracDen, americanInput])

  const formatAmerican = (a: number) => a >= 0 ? `+${a}` : `${a}`

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#1b4fd8] text-white px-4 py-3">
        <span className="font-semibold">Odds Converter</span>
      </div>

      <div className="bg-white p-4 space-y-5">
        {/* Input format selector */}
        <div className="text-sm">
          <label className="block text-gray-600 font-medium mb-2">Convert from</label>
          <div className="flex">
            {[['fractional', 'Fractional'], ['decimal', 'Decimal'], ['american', 'American']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setInputMode(val as InputMode)}
                className={`px-4 py-2 text-sm font-medium border first:rounded-l last:rounded-r transition-colors ${
                  inputMode === val
                    ? 'bg-[#1b4fd8] text-white border-[#1b4fd8]'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="text-sm">
          <label className="block text-gray-600 font-medium mb-1">Enter odds</label>
          {inputMode === 'fractional' && (
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="1"
                step="1"
                value={fracNum}
                onChange={e => setFracNum(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500 text-lg font-medium">/</span>
              <input
                type="number"
                min="1"
                step="1"
                value={fracDen}
                onChange={e => setFracDen(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {inputMode === 'decimal' && (
            <input
              type="number"
              min="1.01"
              step="0.01"
              value={decimalInput}
              onChange={e => setDecimalInput(e.target.value)}
              className="w-36 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          {inputMode === 'american' && (
            <input
              type="text"
              placeholder="+200 or -150"
              value={americanInput}
              onChange={e => setAmericanInput(e.target.value)}
              className="w-36 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Results grid */}
        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Fractional', value: `${result.frac.numerator}/${result.frac.denominator}`, highlight: inputMode === 'fractional' },
              { label: 'Decimal', value: result.decimal.toFixed(3), highlight: inputMode === 'decimal' },
              { label: 'American', value: formatAmerican(result.american), highlight: inputMode === 'american' },
              { label: 'Implied Prob.', value: `${result.impliedProb.toFixed(2)}%`, highlight: false },
            ].map(({ label, value, highlight }) => (
              <div
                key={label}
                className={`rounded-lg border p-3 text-center ${
                  highlight
                    ? 'border-[#1b4fd8] bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</div>
                <div className={`text-xl font-bold ${highlight ? 'text-[#1b4fd8]' : 'text-gray-900'}`}>{value}</div>
              </div>
            ))}
          </div>
        )}

        {result && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600">
            Profit on a £100 stake: <strong className="text-gray-900">£{result.american > 0 ? result.american : (10000 / Math.abs(result.american)).toFixed(2)}</strong>
          </div>
        )}

        {/* Common odds reference */}
        <details className="text-sm">
          <summary className="cursor-pointer text-[#1b4fd8] font-medium hover:underline">Common odds reference table</summary>
          <div className="mt-3 overflow-x-auto rounded border border-gray-200">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Fractional</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Decimal</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">American</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Implied %</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1/4', 1.25, -400, 80.0],
                  ['1/2', 1.50, -200, 66.67],
                  ['Evs', 2.00, 100, 50.0],
                  ['6/4', 2.50, 150, 40.0],
                  ['2/1', 3.00, 200, 33.33],
                  ['3/1', 4.00, 300, 25.0],
                  ['5/1', 6.00, 500, 16.67],
                  ['10/1', 11.00, 1000, 9.09],
                ].map(([frac, dec, am, imp], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-3 py-1.5 text-gray-700 font-medium">{frac}</td>
                    <td className="px-3 py-1.5 text-gray-600">{dec}</td>
                    <td className="px-3 py-1.5 text-gray-600">{(am as number) > 0 ? `+${am}` : am}</td>
                    <td className="px-3 py-1.5 text-gray-600">{(imp as number).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </div>
  )
}
