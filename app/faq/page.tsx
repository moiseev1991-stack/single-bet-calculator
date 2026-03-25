import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { FAQSection, FAQItem } from '@/components/ui/FAQSection'

export const metadata: Metadata = {
  title: 'Betting Calculator FAQ | Single Bet Calculator',
  description: 'Answers to the most common questions about bet calculators, betting odds and how to calculate bet returns.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/faq' },
}

const FAQS: FAQItem[] = [
  {
    question: 'What is a bet calculator?',
    answer: 'A bet calculator is a free tool that works out your returns and profit for any type of bet. Enter your stake and odds and the calculator shows your total return, profit, and outlay instantly — no manual maths required.',
  },
  {
    question: 'How do I calculate a single bet return?',
    answer: 'For a single bet, total return = stake × decimal odds. For example, £10 at 5/1 (6.00 decimal) returns £60 — that is £50 profit plus your £10 stake. Use our single bet calculator to do this instantly for any odds format.',
  },
  {
    question: 'What is an each way bet?',
    answer: 'An each way bet is two bets in one: a win bet and a place bet, each for the same stake. The place part pays a fraction of the win odds (typically 1/4 or 1/5) if your selection finishes in the top 2, 3, or 4 places depending on the race size.',
  },
  {
    question: 'What is Rule 4 deduction?',
    answer: 'Rule 4 is a percentage deduction applied to winnings when a horse is withdrawn from a race after bets have been placed. The deduction depends on the withdrawn horse\'s odds at the time of withdrawal — shorter odds mean a larger deduction.',
  },
  {
    question: 'What happens to my bet if a selection is a non-runner?',
    answer: 'If your selection is declared a non-runner, your stake is returned in full and the bet is void. In a multiple bet (double, treble, accumulator), the bet reverts to the next level down — a treble becomes a double, for example.',
  },
  {
    question: 'What is a void bet?',
    answer: 'A void bet is one that is cancelled, with your stake returned. Common reasons include match abandonment, a betting error, or specific ante-post conditions. Set the outcome to "Void" in our calculator to see the correct return.',
  },
  {
    question: 'What is the difference between fractional and decimal odds?',
    answer: 'Fractional odds (e.g. 5/1) show your profit relative to your stake — 5/1 means £5 profit per £1 staked. Decimal odds (e.g. 6.00) show the total return including your stake — £6 back per £1 staked. American odds use a +/− system based on £100 units.',
  },
  {
    question: 'What is an accumulator?',
    answer: 'An accumulator (or acca) combines 4 or more selections into a single bet. All selections must win for the bet to pay out. The returns from each winning selection are automatically staked on the next, multiplying the potential payout significantly.',
  },
  {
    question: 'How many bets are in a Lucky 15?',
    answer: 'A Lucky 15 consists of 15 bets on 4 selections: 4 singles, 6 doubles, 4 trebles, and 1 four-fold accumulator. Even if only one selection wins, you get a return from the 4 singles portion.',
  },
  {
    question: 'What is matched betting?',
    answer: 'Matched betting uses free bets from bookmakers combined with lay bets on a betting exchange to guarantee a profit regardless of the outcome. Our matched betting calculator works out the correct lay stake and expected profit or qualifying loss.',
  },
  {
    question: 'What is the Kelly Criterion?',
    answer: 'The Kelly Criterion is a formula that calculates the optimal percentage of your bankroll to stake on a bet, based on your estimated edge and the available odds. It maximises long-term bankroll growth while minimising risk of ruin.',
  },
  {
    question: 'How do I use the each way calculator?',
    answer: 'Enter your stake per part (the calculator will double it for the two bets), select your odds, then set the each way fraction (e.g. 1/5) and number of places in Settings. The calculator shows win-only return, place-only return, and combined each way return.',
  },
  {
    question: 'Can I use the calculator on mobile?',
    answer: 'Yes — all calculators are fully responsive and work on any device including smartphones and tablets. No app download required.',
  },
  {
    question: 'Are the calculators free?',
    answer: 'Yes, all 30+ calculators on this site are completely free to use with no sign-up, no subscription, and no hidden fees.',
  },
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

export default function FAQPage() {
  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-10" style={{ color: 'var(--text-col)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />

      <h1
        className="text-3xl font-bold mt-5 mb-3"
        style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
      >
        Betting Calculator FAQ
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        Common questions about our bet calculators, betting odds formats, and how returns are calculated.
      </p>

      <FAQSection faqs={FAQS} title="" />
    </div>
  )
}
