import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Betting Glossary: A-Z of Betting Terms | Bet Calculator',
  description: 'Complete A-Z glossary of betting terms. Learn what accumulator, each way, trixie, yankee, void bet and 50+ other betting terms mean.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/betting-glossary' },
}

interface Term { term: string; definition: string; calcSlug?: string }

const TERMS: Record<string, Term[]> = {
  A: [
    { term: 'Accumulator', definition: 'A single bet combining 4 or more selections. All must win for the bet to pay out. Returns from each selection roll onto the next. Also called an "acca".', calcSlug: 'accumulator' },
    { term: 'Ante-post', definition: 'A bet placed well before an event, often at longer odds. Non-runners are usually settled as losers under ante-post rules.' },
    { term: 'Any-to-come (ATC)', definition: 'An instruction to place a further bet from the winnings of an earlier bet if it wins.' },
    { term: 'Arbitrage', definition: 'Placing bets on all outcomes of an event across different bookmakers to guarantee a profit regardless of result.', calcSlug: 'arbitrage' },
  ],
  B: [
    { term: 'Banker', definition: 'A selection you are highly confident in. In a Lucky 15 or Heinz, a banker is a near-certainty used as the foundation of the bet.' },
    { term: 'Both Teams to Score (BTTS)', definition: 'A football market where you bet on whether both teams will score at least one goal in the match.' },
  ],
  C: [
    { term: 'Cash Out', definition: 'A feature offered by bookmakers allowing you to settle a bet early for a guaranteed return before the event ends.' },
    { term: 'Correct Score', definition: 'A bet predicting the exact final score of a match.' },
  ],
  D: [
    { term: 'Dead Heat', definition: 'When two or more selections finish in a tied position. The stake is divided by the number of tied runners and settled at full odds.', calcSlug: 'dead-heat' },
    { term: 'Double', definition: 'A bet on two selections. Both must win for the bet to pay out. Returns from the first selection roll onto the second.', calcSlug: 'double' },
    { term: 'Draw No Bet', definition: 'A market that removes the draw outcome. If the match ends in a draw, your stake is returned.' },
    { term: 'Dutching', definition: 'Backing multiple selections in a race or event, staking on each to return the same profit if any wins.', calcSlug: 'dutch' },
  ],
  E: [
    { term: 'Each Way', definition: 'Two bets in one: a win bet and a place bet. The place part pays a fraction of the win odds if the selection finishes in the top 2, 3, or 4 places.', calcSlug: 'each-way' },
    { term: 'Evens', definition: '1/1 fractional odds (2.00 decimal, +100 American). You profit the same amount as your stake.' },
    { term: 'Expected Value (EV)', definition: 'The average return per bet calculated from the true probability and the offered odds. Positive EV bets are profitable long-term.', calcSlug: 'expected-value' },
  ],
  F: [
    { term: 'Fixed Odds', definition: 'Odds agreed at the time of placing the bet, which do not change regardless of market movement.' },
    { term: 'Forecast', definition: 'A bet on which selection will finish 1st and 2nd in the correct order.', calcSlug: 'forecast' },
  ],
  G: [
    { term: 'Goliath', definition: 'A full-cover bet on 8 selections comprising 247 bets (28 doubles, 56 trebles, 70 four-folds, 56 five-folds, 28 six-folds, 8 seven-folds, 1 eight-fold).', calcSlug: 'goliath' },
  ],
  H: [
    { term: 'Handicap', definition: 'A market where one selection is given a virtual head start or deficit to level the competition.' },
    { term: 'Heinz', definition: 'A full-cover bet on 6 selections comprising 57 bets — named after the 57 varieties. Includes all doubles, trebles, four-folds, five-folds, and a six-fold.', calcSlug: 'heinz' },
  ],
  I: [
    { term: 'In-Play', definition: 'Betting placed after an event has started, with odds updating in real time.' },
    { term: 'Implied Probability', definition: 'The probability of an outcome implied by the odds. Calculated as 1 ÷ decimal odds. A 2.00 shot has a 50% implied probability.', calcSlug: 'implied-probability' },
  ],
  K: [
    { term: 'Kelly Criterion', definition: 'A formula for calculating optimal bet size based on your edge and the available odds. Maximises long-term bankroll growth.', calcSlug: 'kelly-criterion' },
  ],
  L: [
    { term: 'Lay Bet', definition: 'On a betting exchange, a lay bet means you are acting as the bookmaker — you are betting against an outcome occurring.' },
    { term: 'Lucky 15', definition: 'A full-cover bet on 4 selections comprising 15 bets: 4 singles, 6 doubles, 4 trebles, and 1 four-fold accumulator.', calcSlug: 'lucky-15' },
    { term: 'Lucky 31', definition: 'A full-cover bet on 5 selections comprising 31 bets.', calcSlug: 'lucky-31' },
    { term: 'Lucky 63', definition: 'A full-cover bet on 6 selections comprising 63 bets.', calcSlug: 'lucky-63' },
  ],
  M: [
    { term: 'Matched Betting', definition: 'Using free bet promotions and lay bets to guarantee a profit regardless of outcome.', calcSlug: 'matched-betting' },
    { term: 'Moneyline', definition: 'The American odds format. +200 means profit £200 per £100 staked. −150 means stake £150 to profit £100.' },
  ],
  N: [
    { term: 'Non-Runner', definition: 'A selection that is withdrawn from an event after bets have been accepted. Usually results in stake returned; may trigger Rule 4 deductions on remaining selections.' },
    { term: 'No Vig', definition: 'Fair odds with the bookmaker margin removed. Useful for finding the true implied probability of an outcome.', calcSlug: 'no-vig' },
  ],
  O: [
    { term: 'Odds-On', definition: 'When the odds are shorter than evens — i.e. you risk more than you stand to profit. Example: 1/2 (1.50 decimal).' },
    { term: 'Over/Under', definition: 'A market on whether a statistic (goals, points, etc.) will be over or under a specified number.' },
  ],
  P: [
    { term: 'Patent', definition: 'A full-cover bet on 3 selections comprising 7 bets: 3 singles, 3 doubles, 1 treble. A single winner returns something.', calcSlug: 'patent' },
    { term: 'Place Bet', definition: 'A bet on a selection to finish in the top places (2nd, 3rd, etc.) without needing to win.' },
    { term: 'Price', definition: 'The odds offered on a selection.' },
  ],
  R: [
    { term: 'Rule 4', definition: 'A deduction applied to winnings when a horse is withdrawn from a race after bets are placed. The deduction percentage depends on the withdrawn horse\'s odds.', calcSlug: 'rule-4' },
    { term: 'Reverse Forecast', definition: 'Two forecast bets covering both orders of a 1st/2nd finish.', calcSlug: 'reverse-forecast' },
  ],
  S: [
    { term: 'Single', definition: 'A bet on one selection. The simplest form of bet.', calcSlug: 'single' },
    { term: 'Starting Price (SP)', definition: 'The official odds of a horse at the moment the race starts, determined by the on-course market.' },
    { term: 'Super Heinz', definition: 'A full-cover bet on 7 selections comprising 120 bets.', calcSlug: 'super-heinz' },
    { term: 'Super Yankee (Canadian)', definition: 'A full-cover bet on 5 selections comprising 26 bets.', calcSlug: 'super-yankee' },
  ],
  T: [
    { term: 'Treble', definition: 'A bet on three selections. All three must win for the bet to pay out.', calcSlug: 'treble' },
    { term: 'Trixie', definition: 'A bet on 3 selections comprising 4 bets: 3 doubles and 1 treble. Two winners required to see a return.', calcSlug: 'trixie' },
  ],
  V: [
    { term: 'Value Bet', definition: 'A bet where the true probability of an outcome is higher than the implied probability in the odds — giving you a positive expected value.' },
    { term: 'Void Bet', definition: 'A bet that is cancelled, with the stake returned. Common reasons include match abandonment, errors, or ante-post rule conditions.' },
  ],
  W: [
    { term: 'Win Bet', definition: 'A bet on a selection to win outright. Distinct from a place or each way bet.' },
    { term: 'Without Favourite', definition: 'A market that excludes the favourite, with remaining runners\' odds recalculated.' },
  ],
  Y: [
    { term: 'Yankee', definition: 'A full-cover bet on 4 selections comprising 11 bets: 6 doubles, 4 trebles, 1 four-fold. Two winners required for a return.', calcSlug: 'yankee' },
  ],
}

const definedTermSetSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Betting Glossary',
  description: 'A-Z glossary of common betting terms and definitions.',
  hasDefinedTerm: Object.values(TERMS).flat().map(t => ({
    '@type': 'DefinedTerm',
    name: t.term,
    description: t.definition,
  })),
}

const LETTERS = Object.keys(TERMS).sort()

export default function BettingGlossaryPage() {
  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-10" style={{ color: 'var(--text-col)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Betting Glossary' }]} />

      <h1
        className="text-3xl font-bold mt-5 mb-3"
        style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
      >
        Betting Glossary
      </h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
        A-Z definitions of common betting terms — from accumulator to yankee.
      </p>

      {/* Alphabet nav */}
      <div className="flex flex-wrap gap-1.5 mb-10">
        {LETTERS.map(letter => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-colors duration-150 border"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-col)', color: 'var(--blue)' }}
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Terms */}
      <div className="space-y-10">
        {LETTERS.map(letter => (
          <section key={letter} id={`letter-${letter}`}>
            <div
              className="text-2xl font-black mb-4 pb-2 border-b"
              style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--blue)', borderColor: 'var(--border-col)' }}
            >
              {letter}
            </div>
            <div className="space-y-5">
              {TERMS[letter].map(t => (
                <div key={t.term}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-col)' }}>{t.term}</h3>
                    {t.calcSlug && (
                      <Link
                        href={`/bet-calculator/${t.calcSlug}`}
                        className="text-[10px] px-2 py-0.5 rounded-full border transition-colors duration-150"
                        style={{ borderColor: 'var(--blue)', color: 'var(--blue)' }}
                      >
                        Calculator →
                      </Link>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t.definition}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
