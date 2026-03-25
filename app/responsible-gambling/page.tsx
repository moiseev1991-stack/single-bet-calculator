import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, LH2, LP } from '@/components/layout/LegalPage'

export const metadata: Metadata = {
  title: 'Responsible Gambling | Single Bet Calculator',
  description: 'Information about responsible gambling and resources for help if gambling is affecting you or someone you know.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/responsible-gambling' },
}

const ORGS = [
  { name: 'GamCare',            url: 'https://www.gamcare.org.uk',           phone: '0808 8020 133',   desc: 'Free support, information and counselling for problem gambling.' },
  { name: 'BeGambleAware',      url: 'https://www.begambleaware.org',         phone: null,              desc: 'National gambling support network — treatment, advice, and guidance.' },
  { name: 'GamStop',            url: 'https://www.gamstop.co.uk',             phone: null,              desc: 'Free UK self-exclusion scheme — exclude yourself from all online gambling.' },
  { name: 'Gamblers Anonymous', url: 'https://www.gamblersanonymous.org.uk',  phone: null,              desc: 'Fellowship of people who share experience to recover from gambling problems.' },
  { name: 'Gordon Moody',       url: 'https://www.gordonmoody.org.uk',        phone: '01384 241292',    desc: 'Residential and online treatment programmes for gambling addiction.' },
]

const SIGNS = [
  'Betting with money you cannot afford to lose',
  'Chasing losses — betting more to recover previous losses',
  'Hiding or lying to family and friends about your betting',
  'Neglecting work, family, or personal responsibilities due to gambling',
  'Feeling anxious, depressed, or irritable when not betting',
  'Borrowing money or selling possessions to fund betting',
  'Failed attempts to cut down or stop gambling',
  'Gambling to escape problems or negative feelings',
]

export default function ResponsibleGamblingPage() {
  return (
    <LegalPage title="Responsible Gambling" lastUpdated="March 2026">

      {/* Urgent helpline banner */}
      <div
        className="rounded-xl p-4 mb-8 border-l-4"
        style={{
          background: 'rgba(217,119,6,0.08)',
          borderLeftColor: 'var(--amber)',
        }}
      >
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--amber)' }}>
          Need help now?
        </p>
        <p className="text-sm" style={{ color: 'var(--text-col)' }}>
          If gambling is causing you harm, help is available free of charge.
        </p>
        <p className="text-lg font-bold mt-2" style={{ color: 'var(--amber)' }}>
          National Gambling Helpline: 0808 8020 133
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Free to call · Available 24 hours a day, 7 days a week</p>
      </div>

      <LH2>Gambling Should Be Fun</LH2>
      <LP>
        Betting and gambling are forms of entertainment — not a reliable way to make money.
        The odds are designed to favour the bookmaker over time. It&apos;s important to set limits,
        only bet what you can afford to lose, and never chase losses.
      </LP>

      <LH2>Signs of Problem Gambling</LH2>
      <LP>If you recognise any of the following in yourself or someone you know, it may be time to seek support:</LP>
      <ul className="space-y-2 mb-6">
        {SIGNS.map((sign, i) => (
          <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span
              className="flex-shrink-0 w-5 h-5 rounded border mt-0.5 flex items-center justify-center text-[10px]"
              style={{ borderColor: 'var(--border-col)' }}
            >
              {i + 1}
            </span>
            {sign}
          </li>
        ))}
      </ul>

      <LH2>Tools to Stay in Control</LH2>
      <LP>Most licensed UK bookmakers offer the following responsible gambling tools:</LP>
      <ul className="list-disc pl-5 space-y-1 mb-4 text-sm">
        <li><strong>Deposit limits</strong> — set daily, weekly, or monthly deposit limits</li>
        <li><strong>Loss limits</strong> — cap how much you can lose in a given period</li>
        <li><strong>Session time limits</strong> — restrict how long you can bet in one session</li>
        <li><strong>Reality checks</strong> — reminders that pop up during a session</li>
        <li><strong>Self-exclusion</strong> — temporarily or permanently exclude yourself from a site</li>
        <li><strong>GamStop</strong> — self-exclude from all UK-licensed online gambling sites at once</li>
      </ul>

      <LH2>Help &amp; Support</LH2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {ORGS.map(org => (
          <div
            key={org.name}
            className="rounded-xl p-4 border"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-col)' }}
          >
            <a
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold block mb-1 hover:underline"
              style={{ color: 'var(--blue)' }}
            >
              {org.name}
            </a>
            <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{org.desc}</p>
            {org.phone && (
              <p className="text-xs font-semibold" style={{ color: 'var(--text-col)' }}>{org.phone}</p>
            )}
            <a
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px]"
              style={{ color: 'var(--text-muted)' }}
            >
              {org.url.replace('https://', '')}
            </a>
          </div>
        ))}
      </div>

      <LH2>About Our Site</LH2>
      <LP>
        Single Bet Calculator is a free tool for calculating bet returns. We are not a bookmaker,
        we do not accept bets, and we have no financial interest in whether you win or lose.
        Our calculators are provided for educational and informational purposes only.
        See our <Link href="/disclaimer" style={{ color: 'var(--blue)' }}>Disclaimer</Link> for full details.
      </LP>

      <div
        className="mt-8 flex items-center justify-center rounded-xl p-4 border"
        style={{ borderColor: 'var(--border-col)', background: 'var(--bg-surface2)' }}
      >
        <span
          className="text-2xl font-black mr-3"
          style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-muted)' }}
        >
          18+
        </span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Gambling is only permitted for adults aged 18 and over.<br />
          Please gamble responsibly.
        </span>
      </div>
    </LegalPage>
  )
}
