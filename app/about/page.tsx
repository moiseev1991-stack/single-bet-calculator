import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'About Us | Single Bet Calculator',
  description: 'Learn about our free bet calculator tools and why we built them for UK bettors.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/about' },
}

const SITE_URL = 'https://single-bet-calculator.com'

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Single Bet Calculator',
  url: SITE_URL,
  description: 'Free online bet calculators for UK bettors covering single, accumulator, each way, and 30+ bet types.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'hello@single-bet-calculator.com',
  },
}

const CALCULATOR_GROUPS = [
  { label: 'Bet Calculators', items: ['Single', 'Double', 'Treble', 'Accumulator', 'Trixie', 'Patent', 'Yankee', 'Lucky 15', 'Lucky 31', 'Lucky 63', 'Heinz', 'Super Heinz', 'Goliath'] },
  { label: 'Special Bets',    items: ['Each Way', 'Each Way Double', 'Rule 4', 'Dead Heat', 'Forecast', 'Reverse Forecast'] },
  { label: 'Arb & Value',     items: ['Arbitrage', 'Matched Betting', 'Dutching', 'Kelly Criterion', 'Expected Value', 'No Vig'] },
  { label: 'Odds Tools',      items: ['Odds Converter', 'Implied Probability', 'Betting Margin', 'Sharp Stakes'] },
]

export default function AboutPage() {
  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-10" style={{ color: 'var(--text-col)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      <h1
        className="text-3xl font-bold mt-5 mb-4"
        style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}
      >
        About Single Bet Calculator
      </h1>

      <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
        Single Bet Calculator is a free collection of betting tools built for UK bettors who want
        accurate, instant calculations without the hassle of spreadsheets. Whether you&apos;re checking
        a simple single or working out a complex Lucky 63 with each way terms, our calculators handle
        the maths so you can focus on your selections.
      </p>

      <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>
        Our Calculators
      </h2>
      <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
        We offer 30+ free bet calculators across four categories:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {CALCULATOR_GROUPS.map(group => (
          <div
            key={group.label}
            className="rounded-xl p-4 border"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-col)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--blue)' }}>
              {group.label}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {group.items.join(' · ')}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>
        How Our Calculators Work
      </h2>
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
        Every calculator accepts fractional, decimal, and American odds formats. Enter your stake
        and odds, and the result updates instantly in your browser — no page reload, no server
        round-trip. All calculations happen client-side, so no betting data ever leaves your device.
      </p>
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
        For horse racing we support each way bets, Rule 4 deductions, dead heat settlements,
        and non-runner handling — the scenarios that trip up most manual calculations.
        For value bettors, we offer arbitrage, matched betting, Kelly Criterion, expected value,
        and no-vig calculators.
      </p>
      <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
        We follow UK bookmaker settlement rules. Rounding is applied at the final step to
        match industry standard payout practices.
      </p>

      <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>
        Our Mission
      </h2>
      <p className="text-sm leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
        We believe every bettor deserves free, accurate tools to understand exactly what they
        stand to win — before they place a bet. No paywalls, no sign-ups, no ads obscuring
        the calculator. Just clean, fast, reliable maths.
      </p>

      <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>
        Contact Us
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
        Found a bug? Have a suggestion? We&apos;d love to hear from you.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, #2563eb 0%, #0e7490 100%)' }}
      >
        Get in touch →
      </Link>
    </div>
  )
}
