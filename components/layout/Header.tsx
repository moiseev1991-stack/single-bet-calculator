'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { CALCULATOR_GROUPS, CALCULATORS } from '@/lib/constants'
import { ChevronDown, Menu, X, TrendingUp } from 'lucide-react'

const GROUP_COLORS: Record<number, string> = {
  1: 'var(--green)',
  2: 'var(--amber)',
  3: 'var(--blue)',
  4: 'var(--purple)',
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup,   setOpenGroup]  = useState<number | null>(null)
  const [desktopOpen, setDesktopOpen] = useState<number | null>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const group1 = CALCULATORS.filter(c => c.group === 1)
  const group2 = CALCULATORS.filter(c => c.group === 2)
  const group3 = CALCULATORS.filter(c => c.group === 3)
  const group4 = CALCULATORS.filter(c => c.group === 4)
  const groups = [
    { ...CALCULATOR_GROUPS[0], calcs: group1 },
    { ...CALCULATOR_GROUPS[1], calcs: group2 },
    { ...CALCULATOR_GROUPS[2], calcs: group3 },
    { ...CALCULATOR_GROUPS[3], calcs: group4 },
  ]

  return (
    <header
      className="sticky top-0 z-50 shadow-lg"
      style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-col)' }}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-base transition-opacity hover:opacity-80"
            style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(27,79,216,0.1)' }}
            >
              <TrendingUp className="h-4 w-4" style={{ color: 'var(--blue)' }} />
            </div>
            BetCalculator
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {groups.map(group => {
              const color = GROUP_COLORS[group.id]
              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => {
                    if (closeTimeout.current) clearTimeout(closeTimeout.current)
                    setDesktopOpen(group.id)
                  }}
                  onMouseLeave={() => {
                    closeTimeout.current = setTimeout(() => setDesktopOpen(null), 150)
                  }}
                >
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150"
                    style={{
                      color: desktopOpen === group.id ? 'var(--text-col)' : 'var(--text-muted)',
                      background: desktopOpen === group.id ? 'var(--bg-surface2)' : 'transparent',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: color, opacity: desktopOpen === group.id ? 1 : 0.5 }}
                    />
                    {group.name}
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-150"
                      style={{ transform: desktopOpen === group.id ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>

                  {desktopOpen === group.id && (
                    <div
                      className="absolute top-full left-0 mt-1.5 rounded-xl py-1.5 min-w-[200px] z-50 shadow-2xl"
                      style={{
                        background: 'var(--bg-surface2)',
                        border: '1px solid var(--border-col)',
                        borderTop: `2px solid ${color}`,
                      }}
                    >
                      {group.calcs.map(calc => (
                        <Link
                          key={calc.slug}
                          href={`/bet-calculator/${calc.slug}`}
                          className="block px-4 py-2 text-xs transition-all duration-150"
                          style={{ color: 'var(--text-muted)' }}
                          onClick={() => setDesktopOpen(null)}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.color = color
                            ;(e.currentTarget as HTMLAnchorElement).style.background = 'var(--hover-subtle)'
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'
                            ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                          }}
                        >
                          {calc.shortName}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors duration-150"
              style={{ color: 'var(--text-muted)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-col)')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{ borderTop: '1px solid var(--border-col)', background: 'var(--bg-base)' }}
        >
          <div className="max-w-[1100px] mx-auto px-4 py-4 space-y-3">
            {groups.map(group => {
              const color = GROUP_COLORS[group.id]
              return (
                <div key={group.id}>
                  <button
                    className="flex items-center justify-between w-full text-xs font-semibold mb-2 py-1"
                    style={{ color: 'var(--text-muted)' }}
                    onClick={() => setOpenGroup(openGroup === group.id ? null : group.id)}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                      {group.name}
                    </span>
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-150"
                      style={{ transform: openGroup === group.id ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                  {openGroup === group.id && (
                    <div className="grid grid-cols-2 gap-1 pl-2">
                      {group.calcs.map(calc => (
                        <Link
                          key={calc.slug}
                          href={`/bet-calculator/${calc.slug}`}
                          className="text-xs py-1.5 px-2 rounded-lg transition-colors duration-150"
                          style={{ color: 'var(--text-muted)' }}
                          onClick={() => setMobileOpen(false)}
                          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = color)}
                          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
                        >
                          {calc.shortName}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
