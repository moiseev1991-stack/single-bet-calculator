import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { FAQSection, FAQItem } from '@/components/ui/FAQSection'

export const metadata: Metadata = {
  title: 'Odds Explained: Fractional, Decimal & American | Bet Calculator',
  description: 'Learn how betting odds work. Clear explanation of fractional, decimal and American odds with examples and conversion formulas.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/odds-explained' },
}

const FAQS: FAQItem[] = [
  { question: 'What do fractional odds mean?', answer: 'Fractional odds like 5/1 show your profit relative to your stake. 5/1 means you profit £5 for every £1 staked. The first number is profit; the second is the stake required.' },
  { question: 'How do I convert fractional to decimal odds?', answer: 'Divide the numerator by the denominator and add 1. For example: 5/2 → (5 ÷ 2) + 1 = 3.50. Decimal odds always include your stake in the return.' },
  { question: 'What does +200 mean in American odds?', answer: '+200 means you profit £200 for every £100 staked — a total return of £300. Positive American odds show profit per £100 wagered.' },
  { question: 'What does -150 mean in American odds?', answer: 'You must stake £150 to profit £100 (total return £250). Negative American odds show the amount you need to stake to win £100.' },
  { question: 'What are evens in betting?', answer: 'Evens (1/1 fractional, 2.00 decimal, +100 American) means you profit the same amount as your stake. A £10 bet at evens returns £20 — £10 profit plus your £10 stake back.' },
  { question: 'Which odds format is best?', answer: 'It depends on where you bet. Fractional is traditional in UK/Ireland, decimal is the European standard and easier for maths, American (moneyline) is used in the USA. Our odds converter handles all three formats.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const thCls = 'text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white'
const tdCls = 'px-4 py-3 text-xs'
const tableWrap = 'overflow-x-auto rounded-xl border mb-6'

export default function OddsExplainedPage() {
  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-10" style={{ color: 'var(--text-col)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Odds Explained' }]} />

      <h1
        className="text-3xl font-bold mt-5 mb-4"
        style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
      >
        Betting Odds Explained
      </h1>
      <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
        Betting odds tell you two things: how likely the bookmaker thinks an outcome is, and how
        much you stand to win. There are three main formats — fractional, decimal, and American.
        All three convey the same information, just expressed differently.
      </p>

      {/* Fractional */}
      <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>
        Fractional Odds
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
        The traditional UK format. The first number (numerator) is your profit; the second
        (denominator) is the stake required. Formula: <strong>profit = stake × (numerator ÷ denominator)</strong>
      </p>
      <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--blue)' }}>
              {['Odds', '£10 stake', 'Profit', 'Total Return'].map(h => <th key={h} className={thCls}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[['1/1 (Evens)', '£10', '£10.00', '£20.00'], ['2/1', '£10', '£20.00', '£30.00'], ['5/2', '£10', '£25.00', '£35.00'], ['1/2', '£10', '£5.00', '£15.00'], ['7/4', '£10', '£17.50', '£27.50']].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)', borderTop: '1px solid var(--border-col)' }}>
                {row.map((cell, j) => <td key={j} className={tdCls} style={{ color: j === 0 ? 'var(--text-col)' : 'var(--text-muted)' }}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decimal */}
      <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>
        Decimal Odds
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
        The European standard — and the easiest format to calculate with. Decimal odds represent
        your <em>total return</em> (including stake) per unit staked.
        Formula: <strong>total return = stake × decimal odds</strong>; <strong>profit = return − stake</strong>
      </p>
      <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--blue)' }}>
              {['Odds', '£10 stake', 'Total Return', 'Profit'].map(h => <th key={h} className={thCls}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[['1.50', '£10', '£15.00', '£5.00'], ['2.00', '£10', '£20.00', '£10.00'], ['3.00', '£10', '£30.00', '£20.00'], ['5.00', '£10', '£50.00', '£40.00'], ['10.00', '£10', '£100.00', '£90.00']].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)', borderTop: '1px solid var(--border-col)' }}>
                {row.map((cell, j) => <td key={j} className={tdCls} style={{ color: j === 0 ? 'var(--text-col)' : 'var(--text-muted)' }}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* American */}
      <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>
        American (Moneyline) Odds
      </h2>
      <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--text-muted)' }}>
        Used primarily in the USA. There are two cases:
      </p>
      <ul className="list-disc pl-5 text-sm space-y-1 mb-4" style={{ color: 'var(--text-muted)' }}>
        <li><strong>Positive (+200)</strong>: profit per £100 staked. Profit = stake × (X ÷ 100)</li>
        <li><strong>Negative (−150)</strong>: stake needed to profit £100. Profit = stake × (100 ÷ Y)</li>
      </ul>
      <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--blue)' }}>
              {['Odds', '£10 stake', 'Profit', 'Total Return'].map(h => <th key={h} className={thCls}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[['+100', '£10', '£10.00', '£20.00'], ['+200', '£10', '£20.00', '£30.00'], ['+500', '£10', '£50.00', '£60.00'], ['−150', '£10', '£6.67', '£16.67'], ['−200', '£10', '£5.00', '£15.00']].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)', borderTop: '1px solid var(--border-col)' }}>
                {row.map((cell, j) => <td key={j} className={tdCls} style={{ color: j === 0 ? 'var(--text-col)' : 'var(--text-muted)' }}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conversion table */}
      <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>
        Converting Between Formats
      </h2>
      <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--blue)' }}>
              {['Fractional', 'Decimal', 'American', 'Implied Prob.'].map(h => <th key={h} className={thCls}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[['1/2', '1.50', '−200', '66.67%'], ['Evens (1/1)', '2.00', '+100', '50.00%'], ['6/4', '2.50', '+150', '40.00%'], ['7/4', '2.75', '+175', '36.36%'], ['2/1', '3.00', '+200', '33.33%'], ['5/2', '3.50', '+250', '28.57%'], ['4/1', '5.00', '+400', '20.00%'], ['9/1', '10.00', '+900', '10.00%']].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)', borderTop: '1px solid var(--border-col)' }}>
                {row.map((cell, j) => <td key={j} className={tdCls} style={{ color: j === 0 ? 'var(--text-col)' : 'var(--text-muted)' }}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Which format */}
      <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>
        Which Format Should I Use?
      </h2>
      <ul className="list-disc pl-5 text-sm space-y-2 mb-8" style={{ color: 'var(--text-muted)' }}>
        <li><strong>UK &amp; Ireland</strong> — fractional is the traditional format, still widely used by UK bookmakers</li>
        <li><strong>Europe &amp; Australia</strong> — decimal is the standard; easier for multi-bet maths</li>
        <li><strong>USA</strong> — American (moneyline) is universal; all major US sportsbooks use it</li>
      </ul>

      {/* CTA */}
      <div
        className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 border"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-col)' }}
      >
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-col)' }}>Convert odds instantly</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Use our free odds converter for any format.</p>
        </div>
        <Link
          href="/bet-calculator/odds-converter"
          className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #2563eb 0%, #0e7490 100%)' }}
        >
          Odds Converter →
        </Link>
      </div>

      <FAQSection faqs={FAQS} title="Odds FAQ" />
    </div>
  )
}
