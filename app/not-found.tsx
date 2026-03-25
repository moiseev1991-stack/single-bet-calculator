import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  robots: { index: false, follow: false },
}

const POPULAR = [
  { slug: 'single',      name: 'Single Bet Calculator',      desc: 'Returns for one selection.' },
  { slug: 'accumulator', name: 'Accumulator Calculator',      desc: 'Returns for 2–20 selections.' },
  { slug: 'each-way',    name: 'Each Way Calculator',         desc: 'Win and place returns.' },
  { slug: 'lucky-15',   name: 'Lucky 15 Calculator',         desc: '4 selections, 15 bets.' },
]

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center"
      style={{ color: 'var(--text-col)' }}
    >
      {/* Decorative 404 */}
      <div
        className="select-none leading-none mb-4 font-extrabold pointer-events-none"
        style={{
          fontSize: 'clamp(6rem, 20vw, 12rem)',
          fontFamily: 'var(--font-syne, Syne, sans-serif)',
          color: 'var(--green)',
          opacity: 0.12,
        }}
        aria-hidden
      >
        404
      </div>

      <h1
        className="text-3xl font-bold mb-3 -mt-8"
        style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
      >
        Page not found
      </h1>
      <p className="text-sm mb-8 max-w-sm" style={{ color: 'var(--text-muted)' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white mb-12 transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, #2563eb 0%, #0e7490 100%)' }}
      >
        ← Back to Single Bet Calculator
      </Link>

      {/* Popular calculators */}
      <div className="w-full max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
          Popular calculators
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {POPULAR.map(c => (
            <Link
              key={c.slug}
              href={`/bet-calculator/${c.slug}`}
              className="rounded-xl p-4 text-left transition-all duration-150 border hover:border-transparent hover:shadow-[0_4px_16px_rgba(37,99,235,0.15)]"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-col)',
              }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-col)' }}>{c.name}</p>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
