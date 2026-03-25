'use client'

import Link from 'next/link'

interface Calc {
  slug: string
  name: string
  description: string
  group: number
}

const GROUP_COLORS: Record<number, string> = {
  1: 'var(--green)',
  2: 'var(--amber)',
  3: 'var(--blue)',
  4: 'var(--purple)',
}

export function OtherCalculatorsGrid({ calcs }: { calcs: Calc[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {calcs.map(calc => {
        const color = GROUP_COLORS[calc.group] ?? 'var(--green)'
        return (
          <Link
            key={calc.slug}
            href={`/bet-calculator/${calc.slug}`}
            className="block rounded-xl p-4 border transition-all duration-150"
            style={{
              background: 'var(--bg-surface)',
              borderColor: 'var(--border-col)',
              borderTop: `2px solid ${color}`,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.boxShadow = `0 0 0 1px ${color}33`
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.boxShadow = 'none'
            }}
          >
            <div
              className="font-semibold text-sm mb-1"
              style={{ color: 'var(--text-col)', fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
            >
              {calc.name}
            </div>
            <div className="text-xs leading-snug line-clamp-2" style={{ color: 'var(--text-muted)' }}>
              {calc.description}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
