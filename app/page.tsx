import type { Metadata } from 'next'
import { CALCULATORS, SITE_URL } from '@/lib/constants'
import { BetCalculator } from '@/components/calculator/BetCalculator'
import { FAQSection, FAQItem } from '@/components/ui/FAQSection'
import { OtherCalculatorsGrid } from '@/components/ui/OtherCalculatorsGrid'
import { NavPills } from '@/components/layout/NavPills'
import { InfoPanel } from '@/components/layout/InfoPanel'

export const metadata: Metadata = {
  title: {
    absolute: 'Single Bet Calculator Official Returns UK 2026 | Free Bet Calculator',
  },
  description:
    'Free Single Bet Calculator for UK bettors. Enter stake and fractional, decimal, or American odds to see return, profit, and implied probability instantly.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Single Bet Calculator — Free UK Returns & Profit',
    description:
      'Free Single Bet Calculator for UK bettors. Enter stake and fractional, decimal, or American odds to see return, profit, and implied probability instantly.',
    url: SITE_URL,
  },
}

const HOME_FAQS: FAQItem[] = [
  {
    question: 'What is a single bet?',
    answer:
      'A single bet is a wager on one selection only. If that selection wins, you receive your stake multiplied by the decimal odds. It is the simplest form of sports bet — straightforward, low cost, and easy to calculate.',
  },
  {
    question: 'How do I calculate a single bet return?',
    answer:
      'Total Return = Stake × Decimal Odds. For example, a £10 stake at 5/1 (6.00 decimal) returns £60 — that is £50 profit plus your £10 stake back. The single bet calculator above does this instantly for any odds format.',
  },
  {
    question: 'What does each way mean on a single bet?',
    answer:
      'An each way single is two bets: one for the selection to win, and one for it to place (finish in the top 2, 3, or 4 depending on the race). The place part pays at a fraction of the win odds — usually 1/4 or 1/5. Toggle "Each Way" in the calculator to see both returns.',
  },
  {
    question: 'What is Rule 4 deduction?',
    answer:
      'Rule 4 is a percentage deduction applied to winnings when a horse is withdrawn from a race after bets have been placed. The deduction depends on the withdrawn horse\'s odds — the shorter their odds, the larger the deduction. Enable "Rule 4" in the calculator and enter the deduction percentage for each selection.',
  },
  {
    question: 'What happens if my selection is a non-runner?',
    answer:
      'If your selection is declared a non-runner, your stake is returned in full and the bet is void. Set the outcome to "Non-Runner" in the calculator — it will correctly return the stake and exclude that selection from profit calculations.',
  },
  {
    question: 'What is the difference between fractional and decimal odds?',
    answer:
      'Fractional odds (e.g. 5/1) show your profit relative to your stake — 5/1 means £5 profit per £1 staked. Decimal odds (e.g. 6.00) represent the total return including your stake — £6 back per £1 staked. American odds use a +/- system based on a £100 unit. Switch between formats using the tab at the top of the calculator.',
  },
  {
    question: 'How do I calculate the effective odds after a Rule 4 deduction?',
    answer:
      'Multiply only the winnings portion by (1 − deduction rate) and then re-add the stake. In decimal terms, D_effective = 1 + (D − 1) × (1 − r). Example: £10 at 6.00 with a 20% Rule 4 gives D_effective = 5.00, profit £40, return £50.',
  },
  {
    question: "What's the difference between Early Price, SP, and Best Odds Guaranteed?",
    answer:
      'Early Price can be reduced by Rule 4 if non-runners shorten the field; SP (Starting Price) already reflects withdrawals so Rule 4 does not apply; Best Odds Guaranteed pays the higher of your adjusted Early Price and the SP. Example: £10 at 5/1 EP with a 30% Rule 4 becomes 4.50 decimal; if SP is 5.00 and BOG applies, you are settled at 5.00 for £40 profit and £50 return.',
  },
  {
    question: 'Are betting winnings taxed in the UK?',
    answer:
      'In Great Britain, customer betting winnings are not subject to income tax. Exchanges typically charge a commission on net winnings which reduces profit. Example: £10 at 3.00 on an exchange with 5% commission yields gross profit £20; commission £1; net profit £19; net return £29.',
  },
  {
    question: 'How do I handle free bets (stake not returned) versus cash bets?',
    answer:
      'For stake-not-returned free bets, return equals profit only; for cash bets, return equals profit plus stake. Example: £10 SNR at 2.75 pays £17.50 return; £10 cash at 2.75 pays £27.50 return.',
  },
  {
    question: 'Can I solve for the stake needed to hit a target profit?',
    answer:
      'Yes. For decimal odds D, stake for a target profit P is P ÷ (D − 1), and stake for a target return R is R ÷ D. Example: To win £50 at 2.75, stake = 50 ÷ 1.75 = £28.57.',
  },
  {
    question: 'How do dead-heats affect each-way place returns?',
    answer:
      'Reduce the effective settled stake by the number of tied runners sharing that place, then settle at full place odds. Example: £10 EW at 10/1 with 1/5 place terms; horse dead-heats for the final place with one other runner, so the place part stakes £5 at 2/1, profit £10, return £15.',
  },
  {
    question: 'Does Rule 4 also apply to the each-way place part?',
    answer:
      'Unless the bookmaker states a separate place-market reduction, the same Rule 4 rate is applied to winnings on both win and place parts. Example: £10 EW at 8/1 with a 25% Rule 4 and 1/5 place terms: win profit reduces from £80 to £60 (return £70), place profit reduces from £16 to £12 (return £22).',
  },
  {
    question: 'How do voids and pushes work on Draw No Bet singles?',
    answer:
      'Draw No Bet (AH 0) pushes on a draw, returning the full stake. Example: £40 at 1.95 on AH +0.25 draws as half win and half push, so profit = 0.5 × £40 × (1.95 − 1) = £19 and total return £59.',
  },
  {
    question: 'How should results be rounded to match bookmaker settlement?',
    answer:
      'Round the final monetary amounts to the nearest penny; many UK firms round at the last step. Example: £7.25 at 13/8 gives raw profit £11.78125 and return £19.03125; rounded profit £11.78 and return £19.03.',
  },
  {
    question: 'How do I model an odds boost or profit boost on a single bet?',
    answer:
      'An odds boost increases decimal odds directly; a profit boost adds a percentage to the winnings portion. Example: £20 at 3.50 with a 20% profit boost yields baseline profit £50 plus £10 extra for £60 profit and £80 return.',
  },
  {
    question: 'What happens to a single if my selection is a non-runner under NRNB or ante-post rules?',
    answer:
      'With Non-Runner No Bet, your stake is returned if your selection does not run; under ante-post rules a non-runner is typically settled as a loss. Example: £20 NRNB returned £20 if withdrawn; £20 ante-post loses £20 if your runner is declared a non-runner.',
  },
  {
    question: 'Can I use the single-bet maths in EUR or USD instead of GBP?',
    answer:
      'Yes; the calculations are currency-agnostic and scale linearly. Example: €15 at 2.40 pays €36 return and €21 profit.',
  },
  {
    question: 'How do I get implied probability after a Rule 4 deduction?',
    answer:
      'First compute the effective odds after the deduction, then invert. Example: 6.00 with a 20% Rule 4 becomes D_effective = 5.00, so implied probability is 1 ÷ 5.00 = 20.00%.',
  },
  {
    question: 'Can a single-bet calculator predict Cash Out values accurately?',
    answer:
      'No; cash out is a live pricing function that applies the operator\'s current odds and margin. As a reasonableness check, if the live fair decimal is 1.90 on your £50 stake, a margin-adjusted cash out at a 2% discount would be about £50 × 1.90 × 0.98 = £93.10, but actual offers can differ.',
  },
]

const OTHER_CALCULATORS = [
  'accumulator',
  'each-way',
  'lucky-15',
  'trixie',
  'yankee',
  'patent',
  'arbitrage',
  'odds-converter',
]

// ── Shared prose styles ────────────────────────────────────────────────────────
const H2 = 'text-2xl font-bold mb-4'
const H3 = 'text-xl font-semibold mb-3 mt-6'
const P  = 'leading-relaxed mb-3 text-sm'
const UL = 'space-y-1 list-disc pl-5 mb-4 text-sm'
const NOTE = 'text-xs mt-2 mb-4'

const tableWrap  = 'overflow-x-auto rounded-xl border mb-4'
const tableCls   = 'w-full text-sm'
const theadCls   = ''
const thCls      = 'text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider'
const tdCls      = 'px-4 py-3'

export default function HomePage() {
  const otherCalcs = OTHER_CALCULATORS
    .map(slug => CALCULATORS.find(c => c.slug === slug)!)
    .filter(Boolean)
    .map(c => ({ slug: c.slug, name: c.name, description: c.description, group: c.group }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Single Bet Calculator',
    url: SITE_URL,
    description: 'Calculate your single bet returns and profit instantly.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── Calculator section (wider container) ─────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-8 pb-4">

        {/* H1 + subtitle */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="hidden sm:block w-1 h-10 rounded-full flex-shrink-0"
            style={{ background: 'linear-gradient(180deg, var(--blue) 0%, var(--teal) 100%)' }}
          />
          <h1
            className="font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
              fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)',
              letterSpacing: '-0.02em',
              color: 'var(--text-col)',
            }}
          >
            Single Bet Calculator — Free UK Returns &amp; Profit
          </h1>
        </div>
        <p className="text-sm mb-5 max-w-xl leading-relaxed" style={{ color: 'var(--text-muted)', paddingLeft: '1rem' }}>
          Calculate returns, profit, and implied probability on any single in seconds.
          Fractional, decimal, or American odds — each-way and Rule 4 supported.
        </p>

        {/* Nav pills */}
        <NavPills activeSlug="single" />

        {/* Two-column grid: calculator + info panel */}
        <div className="flex gap-6 items-start">
          {/* Left — calculator */}
          <div className="flex-1 min-w-0">
            <BetCalculator betType="single" title="Single Bet Calculator" />
          </div>

          {/* Right — info panel (desktop only) */}
          <div className="w-[300px] flex-shrink-0 hidden lg:block">
            <InfoPanel betType="single" numSelections={1} />
          </div>
        </div>
      </div>

      {/* ── SEO content (narrower container) ─────────────────────────────────── */}
      <div
        className="max-w-[780px] mx-auto px-4 sm:px-6 py-12 space-y-12"
        style={{ color: 'var(--text-col)' }}
      >

        {/* How to use */}
        <section>
          <h2 className={H2} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            How do I use the Single Bet Calculator correctly?
          </h2>
          <p className={P} style={{ color: 'var(--text-muted)' }}>
            Enter your stake and pick your odds format (fractional, decimal, or American). The
            calculator shows total return and profit for a single selection in real time. For UK
            horse racing, enable each-way and apply any Rule 4 deduction to the winnings portion.
            Always follow the settlement terms shown on your bet slip.
          </p>

          <h3 className={H3} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            Which odds formats can I choose: fractional, decimal, American?
          </h3>
          <p className={P} style={{ color: 'var(--text-muted)' }}>
            The calculator accepts all common UK and international formats. Type fractional odds
            like 7/4, decimal like 2.75, or American like +175 or -150. The tool converts between
            formats and uses the correct payout logic for each.
          </p>
          <ul className={UL} style={{ color: 'var(--text-muted)' }}>
            <li>Fractional (a/b): Profit = stake × (a/b); Return = stake + profit.</li>
            <li>Decimal (D): Profit = stake × (D − 1); Return = stake × D.</li>
            <li>American positive (+X): Profit = stake × (X / 100); Return = stake + profit.</li>
            <li>American negative (−Y): Profit = stake × (100 / Y); Return = stake + profit.</li>
          </ul>

          <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
            <table className={tableCls}>
              <thead className={theadCls} style={{ background: 'var(--blue)' }}>
                <tr>
                  {['Format', 'Input example', 'Profit formula', 'Return formula', 'Implied probability'].map(h => (
                    <th key={h} className={thCls} style={{ color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Decimal',           '2.75', 'stake × (D − 1)', 'stake × D',    '1 / D'],
                  ['Fractional',        '7/4',  'stake × (a/b)',   'stake + profit','b / (a + b)'],
                  ['American (positive)','+175', 'stake × (X/100)', 'stake + profit','100 / (X+100)'],
                  ['American (negative)','-150', 'stake × (100/Y)', 'stake + profit','Y / (Y+100)'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)' }}>
                    {row.map((cell, j) => (
                      <td key={j} className={tdCls} style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-col)' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
            <table className={tableCls}>
              <thead className={theadCls} style={{ background: 'var(--blue)' }}>
                <tr>
                  {['Fractional', 'Decimal', 'American', 'Implied prob.', '£10 profit / return'].map(h => (
                    <th key={h} className={thCls} style={{ color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['1/2',        '1.50', '-200', '66.67%','£5.00 / £15.00'],
                  ['Evens (1/1)','2.00', '+100', '50.00%','£10.00 / £20.00'],
                  ['11/10',      '2.10', '+110', '47.62%','£11.00 / £21.00'],
                  ['7/4',        '2.75', '+175', '36.36%','£17.50 / £27.50'],
                  ['5/2',        '3.50', '+250', '28.57%','£25.00 / £35.00'],
                  ['4/1',        '5.00', '+400', '20.00%','£40.00 / £50.00'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)' }}>
                    {row.map((cell, j) => (
                      <td key={j} className={tdCls} style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-col)' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className={H3} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            How do I enter stake, each-way, and Rule 4 deductions?
          </h3>
          <p className={P} style={{ color: 'var(--text-muted)' }}>
            Follow what is printed on your bet slip. For each-way, enter the place terms (place
            fraction and number of places). For Rule 4, enter the deduction value announced by the
            bookmaker. The calculator applies the deduction to the winnings portion only.
          </p>
          <ul className={UL} style={{ color: 'var(--text-muted)' }}>
            <li>Enter stake in GBP (each-way doubles the stake: two bets).</li>
            <li>Select odds format and enter the price (e.g., 8/1, 5.50, +450).</li>
            <li>If each-way: input place fraction (e.g., 1/5 or 1/4) and number of places in Settings.</li>
            <li>If Rule 4: input the announced deduction (e.g., 25%). The calculator reduces only the winnings.</li>
          </ul>

          <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
            <table className={tableCls}>
              <thead className={theadCls} style={{ background: 'var(--blue)' }}>
                <tr>
                  {['Each-way example (no Rule 4)', 'Win part', 'Place part (1/5)', 'Total if wins', 'Total if places'].map(h => (
                    <th key={h} className={thCls} style={{ color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: 'var(--bg-surface)' }}>
                  {['£10 EW at 8/1 (stake £20)', 'Profit £80; Return £90', 'Profit £16; Return £26', '£116', '£26'].map((cell, j) => (
                    <td key={j} className={tdCls} style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-col)' }}>{cell}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
            <table className={tableCls}>
              <thead className={theadCls} style={{ background: 'var(--blue)' }}>
                <tr>
                  {['Win single + Rule 4', 'Before', 'Deduction', 'After', 'Return'].map(h => (
                    <th key={h} className={thCls} style={{ color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: 'var(--bg-surface)' }}>
                  {['£10 at 4/1, 25p Rule 4', 'Profit £40', '£10', 'Profit £30', '£40'].map((cell, j) => (
                    <td key={j} className={tdCls} style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-col)' }}>{cell}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className={H3} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            Football, racing, tennis: can I calculate returns for any single?
          </h3>
          <ul className={UL} style={{ color: 'var(--text-muted)' }}>
            <li>Football: Works for 1X2, Over/Under, Both Teams to Score, Draw No Bet.</li>
            <li>Tennis: Moneyline prices often use American odds; voided matches return the stake.</li>
            <li>Horse racing: Supports win and each-way. Dead-heats proportionally reduce the effective stake.</li>
          </ul>

          <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
            <table className={tableCls}>
              <thead className={theadCls} style={{ background: 'var(--blue)' }}>
                <tr>
                  {['Sport', 'Market & odds', 'Stake', 'Profit', 'Return', 'Notes'].map(h => (
                    <th key={h} className={thCls} style={{ color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Football',     'Home win at 4/5 (1.80)',  '£20', '£16.00', '£36.00', 'Decimal includes stake.'],
                  ['Tennis',       'Player A -150',            '£15', '£10.00', '£25.00', 'Profit = stake × (100/150).'],
                  ['Horse racing', 'Win single at 5/1 (6.00)', '£10', '£50.00', '£60.00', 'Add Rule 4 if announced.'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)' }}>
                    {row.map((cell, j) => (
                      <td key={j} className={tdCls} style={{ color: 'var(--text-muted)', fontSize: j === 5 ? 11 : undefined, borderTop: '1px solid var(--border-col)' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* What is a single bet */}
        <section>
          <h2 className={H2} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            What Is a Single Bet?
          </h2>
          <p className={P} style={{ color: 'var(--text-muted)' }}>
            A single bet is the most straightforward wager in sports betting — one selection, one
            outcome, one result. If your selection wins, you collect your stake multiplied by the
            decimal odds. Unlike an accumulator, a single is not dependent on any other selection,
            so there is no risk of a chain of results going wrong.
          </p>
          <p className={P} style={{ color: 'var(--text-muted)' }}>
            Using a single bet calculator removes the need for mental arithmetic, particularly when
            dealing with fractional odds or applying Rule 4 deductions. The calculator also handles
            each-way versions, where your stake is doubled to cover both a win bet and a place bet
            on the same selection.
          </p>
        </section>

        {/* Example table */}
        <section>
          <h2 className={H2} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            Single Bet Calculator — Example
          </h2>
          <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
            <table className={tableCls}>
              <thead className={theadCls} style={{ background: 'var(--blue)' }}>
                <tr>
                  {['Odds (fractional)', 'Odds (decimal)', 'Stake', 'Return', 'Profit'].map(h => (
                    <th key={h} className={thCls} style={{ color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['2/1', '3.00', '£10', '£30.00', '£20.00'],
                  ['5/2', '3.50', '£20', '£70.00', '£50.00'],
                  ['1/2', '1.50', '£50', '£75.00', '£25.00'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)' }}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={tdCls}
                        style={{
                          color: j === 4 ? 'var(--green)' : j >= 3 ? 'var(--text-col)' : 'var(--text-muted)',
                          fontWeight: j >= 3 ? 500 : 400,
                          borderTop: '1px solid var(--border-col)',
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How returns work */}
        <section>
          <h2 className={H2} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            How are return, profit, and implied probability worked out?
          </h2>
          <p className={P} style={{ color: 'var(--text-muted)' }}>
            For a single bet, profit is the winnings excluding your original stake, return is profit
            plus stake, and implied probability is the probability the odds encode. Decimal odds
            already include the stake in the price, while fractional odds state the profit relative
            to the stake.
          </p>

          <h3 className={H3} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            Decimal vs fractional: what changes in the maths?
          </h3>
          <ul className={UL} style={{ color: 'var(--text-muted)' }}>
            <li>Decimal (D): Profit = stake × (D − 1); Return = stake × D; IP = 1 / D.</li>
            <li>Fractional (a/b): Profit = stake × (a/b); Return = stake + profit; IP = b / (a + b).</li>
            <li>Conversion: D = 1 + (a / b).</li>
          </ul>

          <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
            <table className={tableCls}>
              <thead className={theadCls} style={{ background: 'var(--blue)' }}>
                <tr>
                  {['Fractional', 'Decimal', 'Implied prob.', '£10 profit', '£10 return'].map(h => (
                    <th key={h} className={thCls} style={{ color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['1/2',        '1.50', '66.67%', '£5.00',  '£15.00'],
                  ['1/1 (Evens)','2.00', '50.00%', '£10.00', '£20.00'],
                  ['3/2',        '2.50', '40.00%', '£15.00', '£25.00'],
                  ['7/4',        '2.75', '36.36%', '£17.50', '£27.50'],
                  ['2/1',        '3.00', '33.33%', '£20.00', '£30.00'],
                  ['9/2',        '5.50', '18.18%', '£45.00', '£55.00'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)' }}>
                    {row.map((cell, j) => (
                      <td key={j} className={tdCls} style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-col)' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className={H3} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            Single bet example: £10 at 7/4 step-by-step
          </h3>
          <ul className={UL} style={{ color: 'var(--text-muted)' }}>
            <li>Convert: 7/4 in decimal is 1 + 7/4 = 2.75.</li>
            <li>Profit: £10 × (7 ÷ 4) = £17.50.</li>
            <li>Return: £17.50 + £10.00 = £27.50.</li>
            <li>Implied probability: 4 / 11 ≈ 36.36%.</li>
            <li>If wins: £27.50. If loses: £0.00. If void: £10.00 stake returned.</li>
          </ul>

          <h3 className={H3} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            Will my results match major UK bookmakers?
          </h3>
          <p className={P} style={{ color: 'var(--text-muted)' }}>
            Yes — provided you use the same odds, settlement rules, and deductions, your profit and
            return should match to the penny. Small discrepancies can occur when a bookmaker rounds
            at intermediate steps. Always check the official rules published by your bookmaker (e.g.,{' '}
            <a href="https://news.williamhill.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>
              William Hill
            </a>
            ).
          </p>
        </section>

        {/* Each way */}
        <section>
          <h2 className={H2} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            Single Bet Each Way — How It Works
          </h2>
          <p className={P} style={{ color: 'var(--text-muted)' }}>
            An each-way single is two bets at the same stake: a win bet and a place bet. If your
            selection wins, both parts return — the win bet at full odds, the place bet at a fraction
            of the win odds (typically 1/4 or 1/5). Toggle <strong style={{ color: 'var(--green)' }}>Each Way</strong> in
            the calculator above, then configure place fraction and number of places in Settings.
          </p>
        </section>

        {/* Single vs other bet types */}
        <section>
          <h2 className={H2} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            Single vs other bet types: doubles, forecasts, and accas
          </h2>
          <p className={P} style={{ color: 'var(--text-muted)' }}>
            A single bet settles on one selection, so your stake faces one outcome and one overround.
            Multiples like doubles and accumulators compound prices and risk across legs: the potential
            profit rises, but so does variance and exposure to bookmaker margin.
          </p>

          <h3 className={H3} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            When is a single better than a double?
          </h3>
          <ul className={UL} style={{ color: 'var(--text-muted)' }}>
            <li>Small edge, big variance: a double dilutes EV when one leg is fair value.</li>
            <li>Independent legs: combined true-win probability is p(A) × p(B) — both must win.</li>
            <li>Settlement friction: voids, Rule 4s on one leg can erode the headline double payout.</li>
            <li>Bankroll management: singles allow grading confidence by staking per selection.</li>
          </ul>

          <div
            className="rounded-xl p-4 text-sm space-y-1.5 mb-4"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-col)' }}
          >
            <p className="font-semibold text-sm mb-2" style={{ color: 'var(--text-col)', fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>
              Worked EV comparison:
            </p>
            <p style={{ color: 'var(--text-muted)' }}>Single on A at 6/4 (2.50), true p(A) = 0.45, stake £10 → <span style={{ color: 'var(--green)' }}>EV +£1.25</span></p>
            <p style={{ color: 'var(--text-muted)' }}>Double with B at 5/6 (1.83), true p(B) = 0.52, same stake → <span style={{ color: 'var(--amber)' }}>EV +£0.71</span></p>
          </div>

          <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
            <table className={tableCls}>
              <thead className={theadCls} style={{ background: 'var(--blue)' }}>
                <tr>
                  {['Bet type', 'Selections', 'Order?', 'Each-way?', 'Settlement'].map(h => (
                    <th key={h} className={thCls} style={{ color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Single',          '1',             'No',  'Yes', 'Fixed-odds at taken price'],
                  ['Double',          '2 (sep. events)','No', 'Yes', 'Product of leg prices; void = 1.00'],
                  ['Forecast (CSF)',  '2 (same race)', 'Yes', 'No',  'CSF algorithm'],
                  ['Reverse forecast','2 (same race)', 'Both','No',  'Two CSF settlements'],
                  ['Accumulator',     '3+',            'No',  'Yes', 'Product of all leg prices'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)' }}>
                    {row.map((cell, j) => (
                      <td key={j} className={tdCls} style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-col)' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* History */}
        <section>
          <h2 className={H2} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            From paper slips to live tools: the evolution of single bet calculation
          </h2>
          <p className={P} style={{ color: 'var(--text-muted)' }}>
            Single-bet maths hasn&apos;t changed — profit is the winnings excluding stake, return is
            profit plus stake — but the way bettors compute it has moved from ready-reckoner charts
            to live calculators that factor in Rule 4, each-way terms, and market overround.
          </p>

          <h3 className={H3} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            Modern UK specifics: overround and Rule 4
          </h3>
          <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
            <table className={tableCls}>
              <thead className={theadCls} style={{ background: 'var(--blue)' }}>
                <tr>
                  {['Market (1X2)', 'Decimal odds', 'Implied prob.', 'Notes'].map(h => (
                    <th key={h} className={thCls} style={{ color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Home (1)', '2.10', '47.62%', '1 / 2.10'],
                  ['Draw (X)', '3.40', '29.41%', '1 / 3.40'],
                  ['Away (2)', '3.60', '27.78%', '1 / 3.60'],
                  ['Total',    '—',    '104.81%','Overround = 4.81%'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)' }}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={tdCls}
                        style={{
                          color: i === 3 && j === 2 ? 'var(--amber)' : 'var(--text-muted)',
                          fontWeight: i === 3 ? 500 : 400,
                          borderTop: '1px solid var(--border-col)',
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={NOTE} style={{ color: 'var(--text-muted)' }}>
            For consumer protection see the{' '}
            <a href="https://www.gamblingcommission.gov.uk/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>UK Gambling Commission</a>
            {' '}and for racing rules the{' '}
            <a href="https://www.britishhorseracing.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>British Horseracing Authority</a>.
          </p>
        </section>

        {/* Do you need a calculator */}
        <section>
          <h2 className={H2} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            Do you even need a calculator for a single bet?
          </h2>
          <p className={P} style={{ color: 'var(--text-muted)' }}>
            For decimal odds with clean stakes, mental maths is fast. But Rule 4 deductions,
            each-way place fractions, dead-heats, or free-bet SNR terms can change the payout by
            pounds. A calculator standardises rounding, applies deductions correctly, and mirrors
            UK settlement rules.
          </p>

          <div className={tableWrap} style={{ borderColor: 'var(--border-col)' }}>
            <table className={tableCls}>
              <thead className={theadCls} style={{ background: 'var(--blue)' }}>
                <tr>
                  {['Stake', 'Decimal odds', 'Profit', 'Return'].map(h => (
                    <th key={h} className={thCls} style={{ color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['£10', '1.80', '£8.00',  '£18.00'],
                  ['£10', '2.10', '£11.00', '£21.00'],
                  ['£15', '2.50', '£22.50', '£37.50'],
                  ['£20', '3.00', '£40.00', '£60.00'],
                  ['£10', '5.50', '£45.00', '£55.00'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)' }}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={tdCls}
                        style={{
                          color: j >= 2 ? 'var(--text-col)' : 'var(--text-muted)',
                          fontWeight: j >= 2 ? 500 : 400,
                          borderTop: '1px solid var(--border-col)',
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className={H3} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            Edge cases where errors creep in
          </h3>
          <div className="space-y-3 mb-4">
            {[
              {
                title: 'Rule 4 (applies to winnings only)',
                body: '£10 at 7/2 (4.50). Winnings = £35.00. With 25p Rule 4: deduction £8.75; adjusted profit £26.25; return £36.25.',
              },
              {
                title: 'Each-way place terms',
                body: '£10 EW at 8/1, place 1/5. Win return £90. Place price = 8/5 (2.60), profit £16, return £26. Total if wins: £116.',
              },
              {
                title: 'Dead-heat',
                body: 'Two-way dead-heat, £10 at 6/1. Effective stake = £5. Profit £30; Return £35.',
              },
              {
                title: 'Free bet SNR',
                body: '£10 free bet at 2.75. Return = £17.50 (stake not included), not £27.50.',
              },
            ].map(item => (
              <div
                key={item.title}
                className="rounded-xl p-4"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-col)' }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-col)', fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>
                  {item.title}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <FAQSection faqs={HOME_FAQS} title="Frequently Asked Questions" />

        {/* Other calculators */}
        <section>
          <h2 className={H2} style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}>
            Other Bet Calculators
          </h2>
          <OtherCalculatorsGrid calcs={otherCalcs} />
        </section>

      </div>
    </>
  )
}
