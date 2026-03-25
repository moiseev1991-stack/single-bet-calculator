import type { Metadata } from 'next'
import { LegalPage, LH2, LP } from '@/components/layout/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie Policy | Single Bet Calculator',
  description: 'Information about the cookies we use on Single Bet Calculator.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/cookie-policy' },
}

const COOKIES = [
  { name: '_ga',             type: 'Analytics',  purpose: 'Google Analytics — distinguishes users',          duration: '2 years' },
  { name: '_gid',            type: 'Analytics',  purpose: 'Google Analytics — distinguishes users (24h)',    duration: '24 hours' },
  { name: '_ga_*',           type: 'Analytics',  purpose: 'Google Analytics — session persistence',          duration: '2 years' },
  { name: 'cookie_consent',  type: 'Necessary',  purpose: 'Stores your cookie preference',                   duration: '1 year' },
]

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="March 2026">
      <LH2>What Are Cookies</LH2>
      <LP>
        Cookies are small text files that are stored on your device when you visit a website.
        They help the site remember information about your visit, such as your preferred language
        and settings, making your next visit easier and the site more useful to you.
      </LP>

      <LH2>Cookies We Use</LH2>
      <LP>The following cookies may be set when you visit this site:</LP>

      <div className="overflow-x-auto rounded-xl border mb-6" style={{ borderColor: 'var(--border-col)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--blue)' }}>
              {['Cookie', 'Type', 'Purpose', 'Duration'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COOKIES.map((c, i) => (
              <tr key={c.name} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)', borderTop: '1px solid var(--border-col)' }}>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text-col)' }}>{c.name}</td>
                <td className="px-4 py-3 text-xs" style={{ color: c.type === 'Analytics' ? 'var(--blue)' : 'var(--green)' }}>{c.type}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>{c.purpose}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LH2>Managing Cookies</LH2>
      <LP>
        You can control and delete cookies through your browser settings. Note that disabling
        cookies may affect the functionality of some parts of this site.
      </LP>
      <LP>Browser instructions for managing cookies:</LP>
      <ul className="list-disc pl-5 space-y-1 mb-4 text-sm">
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
            Google Chrome
          </a>
        </li>
        <li>
          <a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
            Apple Safari
          </a>
        </li>
        <li>
          <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
            Microsoft Edge
          </a>
        </li>
      </ul>

      <LH2>Third-Party Cookies</LH2>
      <LP>
        We use Google Analytics to understand how visitors use the site. Google may set cookies
        on your device to track this usage. You can opt out of Google Analytics tracking using the{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
          Google Analytics Opt-out Browser Add-on
        </a>.
      </LP>
      <LP>
        For more information on how Google uses data, see the{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
          Google Privacy Policy
        </a>.
      </LP>
    </LegalPage>
  )
}
