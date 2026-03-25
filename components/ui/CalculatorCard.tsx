'use client'

import Link from 'next/link'
import { CalculatorInfo } from '@/lib/constants'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

interface CalculatorCardProps {
  calculator: CalculatorInfo
}

const GROUP_GRADIENTS: Record<number, string> = {
  1: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
  2: 'linear-gradient(135deg, #d97706 0%, #dc2626 100%)',
  3: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
  4: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
}

const GROUP_GLOW: Record<number, string> = {
  1: 'rgba(37,99,235,0.18)',
  2: 'rgba(217,119,6,0.18)',
  3: 'rgba(5,150,105,0.18)',
  4: 'rgba(124,58,237,0.18)',
}

const GROUP_LABELS: Record<number, string> = {
  1: 'Bet Calculator',
  2: 'Special Bets',
  3: 'Arb & Value',
  4: 'Odds Converter',
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  const [hovered, setHovered] = useState(false)
  const gradient = GROUP_GRADIENTS[calculator.group] ?? GROUP_GRADIENTS[1]
  const glow     = GROUP_GLOW[calculator.group]     ?? GROUP_GLOW[1]
  const groupLabel = GROUP_LABELS[calculator.group] ?? ''

  return (
    <Link
      href={`/bet-calculator/${calculator.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block rounded-xl p-5 transition-all duration-200"
      style={{
        background: 'var(--bg-surface)',
        border: `1px solid ${hovered ? 'transparent' : 'var(--border-col)'}`,
        boxShadow: hovered
          ? `0 8px 32px ${glow}, 0 2px 8px rgba(0,0,0,0.06)`
          : '0 1px 3px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        {/* Icon badge */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: gradient }}
        >
          <span className="text-white text-[10px] font-bold">{groupLabel.slice(0, 2).toUpperCase()}</span>
        </div>
        <ArrowUpRight
          className="h-4 w-4 transition-all duration-150"
          style={{ color: hovered ? 'var(--blue)' : 'var(--text-muted)', transform: hovered ? 'translate(1px,-1px)' : 'none' }}
        />
      </div>
      <h3
        className="font-semibold mb-1 text-sm transition-colors duration-150"
        style={{ color: hovered ? 'var(--blue)' : 'var(--text-col)' }}
      >
        {calculator.shortName}
      </h3>
      <p className="text-xs line-clamp-2" style={{ color: 'var(--text-muted)' }}>
        {calculator.description}
      </p>
      {calculator.numBets && (
        <p
          className="text-[10px] mt-2 font-medium"
          style={{ color: 'var(--text-muted)' }}
        >
          {calculator.numBets} bets
        </p>
      )}
    </Link>
  )
}
