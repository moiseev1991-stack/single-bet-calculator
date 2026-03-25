export const SITE_URL = 'https://single-bet-calculator.com'

export interface CalculatorInfo {
  slug: string
  name: string
  shortName: string
  group: number
  description: string
  numSelectionsFixed?: number
  numSelectionsRange?: [number, number]
  numBets?: number
}

export const CALCULATORS: CalculatorInfo[] = [
  // Group 1: Main bet calculators
  {
    slug: 'single',
    name: 'Single Bet Calculator',
    shortName: 'Single',
    group: 1,
    description: 'Calculate returns for single bets on one or more selections.',
    numSelectionsRange: [1, 20],
  },
  {
    slug: 'double',
    name: 'Double Bet Calculator',
    shortName: 'Double',
    group: 1,
    description: 'Calculate returns for a double bet — 2 selections, 1 bet.',
    numSelectionsFixed: 2,
    numBets: 1,
  },
  {
    slug: 'treble',
    name: 'Treble Bet Calculator',
    shortName: 'Treble',
    group: 1,
    description: 'Calculate returns for a treble bet — 3 selections, 1 bet.',
    numSelectionsFixed: 3,
    numBets: 1,
  },
  {
    slug: 'accumulator',
    name: 'Accumulator Bet Calculator',
    shortName: 'Accumulator',
    group: 1,
    description: 'Calculate returns for an accumulator (acca) bet with 2–20 selections.',
    numSelectionsRange: [2, 20],
  },
  {
    slug: 'trixie',
    name: 'Trixie Bet Calculator',
    shortName: 'Trixie',
    group: 1,
    description: 'Calculate returns for a Trixie — 3 selections, 4 bets (3 doubles + 1 treble).',
    numSelectionsFixed: 3,
    numBets: 4,
  },
  {
    slug: 'patent',
    name: 'Patent Bet Calculator',
    shortName: 'Patent',
    group: 1,
    description: 'Calculate returns for a Patent — 3 selections, 7 bets.',
    numSelectionsFixed: 3,
    numBets: 7,
  },
  {
    slug: 'yankee',
    name: 'Yankee Bet Calculator',
    shortName: 'Yankee',
    group: 1,
    description: 'Calculate returns for a Yankee — 4 selections, 11 bets.',
    numSelectionsFixed: 4,
    numBets: 11,
  },
  {
    slug: 'super-yankee',
    name: 'Super Yankee (Canadian) Calculator',
    shortName: 'Super Yankee',
    group: 1,
    description: 'Calculate returns for a Super Yankee / Canadian — 5 selections, 26 bets.',
    numSelectionsFixed: 5,
    numBets: 26,
  },
  {
    slug: 'heinz',
    name: 'Heinz Bet Calculator',
    shortName: 'Heinz',
    group: 1,
    description: 'Calculate returns for a Heinz — 6 selections, 57 bets.',
    numSelectionsFixed: 6,
    numBets: 57,
  },
  {
    slug: 'super-heinz',
    name: 'Super Heinz Calculator',
    shortName: 'Super Heinz',
    group: 1,
    description: 'Calculate returns for a Super Heinz — 7 selections, 120 bets.',
    numSelectionsFixed: 7,
    numBets: 120,
  },
  {
    slug: 'goliath',
    name: 'Goliath Bet Calculator',
    shortName: 'Goliath',
    group: 1,
    description: 'Calculate returns for a Goliath — 8 selections, 247 bets.',
    numSelectionsFixed: 8,
    numBets: 247,
  },
  {
    slug: 'lucky-15',
    name: 'Lucky 15 Calculator',
    shortName: 'Lucky 15',
    group: 1,
    description: 'Calculate returns for a Lucky 15 — 4 selections, 15 bets.',
    numSelectionsFixed: 4,
    numBets: 15,
  },
  {
    slug: 'lucky-31',
    name: 'Lucky 31 Calculator',
    shortName: 'Lucky 31',
    group: 1,
    description: 'Calculate returns for a Lucky 31 — 5 selections, 31 bets.',
    numSelectionsFixed: 5,
    numBets: 31,
  },
  {
    slug: 'lucky-63',
    name: 'Lucky 63 Calculator',
    shortName: 'Lucky 63',
    group: 1,
    description: 'Calculate returns for a Lucky 63 — 6 selections, 63 bets.',
    numSelectionsFixed: 6,
    numBets: 63,
  },
  // Group 2: Special calculators
  {
    slug: 'each-way',
    name: 'Each Way Bet Calculator',
    shortName: 'Each Way',
    group: 2,
    description: 'Calculate returns for each way bets across multiple selections.',
    numSelectionsRange: [1, 20],
  },
  {
    slug: 'each-way-double',
    name: 'Each Way Double Calculator',
    shortName: 'Each Way Double',
    group: 2,
    description: 'Calculate returns for an each way double — 2 selections, 4 bets.',
    numSelectionsFixed: 2,
    numBets: 4,
  },
  {
    slug: 'rule-4',
    name: 'Rule 4 Deduction Calculator',
    shortName: 'Rule 4',
    group: 2,
    description: 'Calculate Rule 4 deductions when a horse is withdrawn from a race.',
  },
  {
    slug: 'dead-heat',
    name: 'Dead Heat Calculator',
    shortName: 'Dead Heat',
    group: 2,
    description: 'Calculate returns when two or more selections finish in a dead heat.',
  },
  {
    slug: 'forecast',
    name: 'Forecast Bet Calculator',
    shortName: 'Forecast',
    group: 2,
    description: 'Calculate returns for a forecast bet — predicting 1st and 2nd.',
  },
  {
    slug: 'reverse-forecast',
    name: 'Reverse Forecast Calculator',
    shortName: 'Reverse Forecast',
    group: 2,
    description: 'Calculate returns for a reverse forecast — 2 bets covering both orders.',
  },
  // Group 3: Arbitrage & value
  {
    slug: 'arbitrage',
    name: 'Arbitrage Calculator',
    shortName: 'Arbitrage',
    group: 3,
    description: 'Find arbitrage opportunities and calculate guaranteed profit stakes.',
  },
  {
    slug: 'matched-betting',
    name: 'Matched Betting Calculator',
    shortName: 'Matched Betting',
    group: 3,
    description: 'Calculate lay stakes for matched betting and free bet conversions.',
  },
  {
    slug: 'dutch',
    name: 'Dutching Calculator',
    shortName: 'Dutching',
    group: 3,
    description: 'Calculate stakes for dutching — backing multiple selections for equal profit.',
  },
  {
    slug: 'kelly-criterion',
    name: 'Kelly Criterion Calculator',
    shortName: 'Kelly Criterion',
    group: 3,
    description: 'Calculate optimal bet sizing using the Kelly Criterion formula.',
  },
  {
    slug: 'expected-value',
    name: 'Expected Value (EV) Calculator',
    shortName: 'Expected Value',
    group: 3,
    description: 'Calculate the expected value of a bet to find positive EV opportunities.',
  },
  {
    slug: 'no-vig',
    name: 'No Vig / Fair Odds Calculator',
    shortName: 'No Vig',
    group: 3,
    description: 'Remove the bookmaker margin to find the true fair odds.',
  },
  // Group 4: Odds converters
  {
    slug: 'odds-converter',
    name: 'Odds Converter',
    shortName: 'Odds Converter',
    group: 4,
    description: 'Convert between fractional, decimal, and American odds formats.',
  },
  {
    slug: 'implied-probability',
    name: 'Implied Probability Calculator',
    shortName: 'Implied Probability',
    group: 4,
    description: 'Convert odds to implied probability and find overround.',
  },
  {
    slug: 'betting-margin',
    name: 'Betting Margin Calculator',
    shortName: 'Betting Margin',
    group: 4,
    description: 'Calculate the bookmaker margin (juice/vig) built into the odds.',
  },
  {
    slug: 'sharp-stakes',
    name: 'Sharp Stakes Calculator',
    shortName: 'Sharp Stakes',
    group: 4,
    description: 'Calculate optimal stakes based on sharp line movement.',
  },
]

export const CALCULATOR_GROUPS = [
  { id: 1, name: 'Bet Calculators' },
  { id: 2, name: 'Special Bets' },
  { id: 3, name: 'Arbitrage & Value' },
  { id: 4, name: 'Odds Converters' },
]

export const FEATURED_CALCULATORS = ['single', 'accumulator', 'each-way', 'lucky-15', 'arbitrage', 'odds-converter']

export function getCalculator(slug: string): CalculatorInfo | undefined {
  return CALCULATORS.find(c => c.slug === slug)
}

export function getRelatedCalculators(slug: string, count = 4): CalculatorInfo[] {
  const current = getCalculator(slug)
  if (!current) return CALCULATORS.slice(0, count)
  return CALCULATORS.filter(c => c.slug !== slug && c.group === current.group).slice(0, count)
}
