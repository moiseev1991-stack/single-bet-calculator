'use client'

import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'Single',         href: '/' },
  { label: 'Double',         href: '/bet-calculator/double' },
  { label: 'Treble',         href: '/bet-calculator/treble' },
  { label: 'Accumulator',    href: '/bet-calculator/accumulator' },
  { label: 'Trixie',         href: '/bet-calculator/trixie' },
  { label: 'Patent',         href: '/bet-calculator/patent' },
  { label: 'Lucky 15',       href: '/bet-calculator/lucky-15' },
  { label: 'Lucky 31',       href: '/bet-calculator/lucky-31' },
  { label: 'Lucky 63',       href: '/bet-calculator/lucky-63' },
  { label: 'Yankee',         href: '/bet-calculator/yankee' },
  { label: 'Super Yankee',   href: '/bet-calculator/super-yankee' },
  { label: 'Heinz',          href: '/bet-calculator/heinz' },
  { label: 'Super Heinz',    href: '/bet-calculator/super-heinz' },
  { label: 'Goliath',        href: '/bet-calculator/goliath' },
  { label: 'Each Way',       href: '/bet-calculator/each-way' },
  { label: 'Each Way Double',href: '/bet-calculator/each-way-double' },
]

interface NavPillsProps {
  activeSlug?: string
}

export function NavPills({ activeSlug }: NavPillsProps) {
  return (
    <nav
      className="flex flex-wrap gap-2 mb-6"
      aria-label="Bet type navigation"
    >
      {NAV_ITEMS.map(item => {
        const slug = item.href === '/' ? 'single' : item.href.split('/').pop()!
        const isActive = slug === (activeSlug ?? 'single')
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 whitespace-nowrap"
            style={{
              background:  isActive ? 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)' : 'var(--bg-surface)',
              borderColor: isActive ? 'transparent' : 'var(--border-col)',
              color:       isActive ? '#fff' : 'var(--text-muted)',
              boxShadow:   isActive ? '0 2px 10px rgba(37,99,235,0.35)' : 'none',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'var(--border-hover)'
                el.style.color = 'var(--text-col)'
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'var(--border-col)'
                el.style.color = 'var(--text-muted)'
              }
            }}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
