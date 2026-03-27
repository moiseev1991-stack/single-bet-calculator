'use client'

import Link from 'next/link'
import { CALCULATORS, CALCULATOR_GROUPS } from '@/lib/constants'
import { TrendingUp } from 'lucide-react'

const SERVICE_LINKS = [
  { href: '/about/', label: 'About' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/contact/', label: 'Contact' },
  { href: '/betting-glossary/', label: 'Betting Glossary' },
  { href: '/odds-explained/', label: 'Odds Explained' },
  { href: '/responsible-gambling/', label: 'Responsible Gambling' },
  { href: '/privacy-policy/', label: 'Privacy Policy' },
  { href: '/terms-of-service/', label: 'Terms of Service' },
  { href: '/cookie-policy/', label: 'Cookie Policy' },
  { href: '/disclaimer/', label: 'Disclaimer' },
]

const GROUP_COLORS: Record<number, string> = {
  1: 'var(--green)',
  2: 'var(--amber)',
  3: 'var(--blue)',
  4: 'var(--purple)',
}

export function Footer() {
  const groups = CALCULATOR_GROUPS.map(g => ({
    ...g,
    calcs: CALCULATORS.filter(c => c.group === g.id),
  }))

  return (
    <footer
      className="mt-16"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-col)' }}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div
              className="flex items-center gap-2 font-bold text-base mb-4"
              style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(27,79,216,0.1)' }}
              >
                <TrendingUp className="h-4 w-4" style={{ color: 'var(--blue)' }} />
              </div>
              BetCalculator
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Free online bet calculators for all bet types. Calculate returns,
              profits, and stakes instantly.
            </p>
          </div>

          {/* Calculator groups */}
          {groups.map(group => {
            const color = GROUP_COLORS[group.id]
            return (
              <div key={group.id}>
                <h3
                  className="text-[11px] font-semibold uppercase tracking-[.06em] mb-3 flex items-center gap-1.5"
                  style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span style={{ color }}>{group.name}</span>
                </h3>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                  {group.calcs.map(calc => (
                    <li key={calc.slug}>
                      <Link
                        href={`/bet-calculator/${calc.slug}`}
                        className="text-xs transition-colors duration-150 leading-tight block py-0.5"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = color)}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
                      >
                        {calc.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          {/* Service / Legal */}
          <div>
            <h3
              className="text-[11px] font-semibold uppercase tracking-[.06em] mb-3 flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--text-muted)' }} />
              <span style={{ color: 'var(--text-muted)' }}>Info & Legal</span>
            </h3>
            <ul className="space-y-1">
              {SERVICE_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs transition-colors duration-150 leading-tight block py-0.5"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-col)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 text-center text-xs"
          style={{ borderTop: '1px solid var(--border-col)', color: 'var(--text-muted)' }}
        >
          &copy; {new Date().getFullYear()} BetCalculator. For educational purposes only.
          Please gamble responsibly. 18+
        </div>
      </div>
    </footer>
  )
}
