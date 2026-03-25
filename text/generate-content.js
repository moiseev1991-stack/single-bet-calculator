const fs = require('fs')
const path = require('path')

const parsed = JSON.parse(
  fs.readFileSync(path.join('E:', 'cod', 'single-bet-calculator', 'text', 'parsed.json'), 'utf8')
)

const slugOrder = [
  'single', 'double', 'treble', 'accumulator',
  'trixie', 'patent', 'yankee', 'super-yankee',
  'heinz', 'super-heinz', 'goliath',
  'lucky-15', 'lucky-31', 'lucky-63',
  'each-way', 'each-way-double',
  'rule-4', 'dead-heat', 'forecast', 'reverse-forecast',
  'arbitrage', 'matched-betting', 'dutch',
  'kelly-criterion', 'expected-value', 'no-vig',
  'odds-converter', 'implied-probability', 'betting-margin', 'sharp-stakes',
]

let out = `import { FAQItem } from '@/components/ui/FAQSection'

export interface ExampleTable {
  headers: string[]
  rows: string[][]
}

export interface CalculatorContent {
  metaTitle?: string
  metaDescription?: string
  intro: string
  howItWorks: string
  articleHtml?: string
  faqs: FAQItem[]
  exampleTable?: ExampleTable
}

const DEFAULT_CONTENT: CalculatorContent = {
  intro: 'Use this free calculator to instantly work out your bet returns and profit.',
  howItWorks: 'Enter your selections, odds, and stake to calculate your total outlay, return, and profit.',
  faqs: [],
}

const CONTENT: Record<string, CalculatorContent> = {\n`

for (const slug of slugOrder) {
  const data = parsed[slug]
  if (!data) {
    console.warn(`No data for slug: ${slug}`)
    continue
  }

  out += `  ${JSON.stringify(slug)}: {\n`
  out += `    metaTitle: ${JSON.stringify(data.metaTitle || '')},\n`
  out += `    metaDescription: ${JSON.stringify(data.metaDescription || '')},\n`
  out += `    intro: ${JSON.stringify(data.intro || '')},\n`
  out += `    howItWorks: ${JSON.stringify(data.howItWorks || '')},\n`
  out += `    articleHtml: ${JSON.stringify(data.articleHtml || '')},\n`
  out += `    faqs: [],\n`
  out += `  },\n`
}

out += `}

export function getCalculatorContent(slug: string): CalculatorContent {
  return CONTENT[slug] ?? DEFAULT_CONTENT
}
`

fs.writeFileSync(
  path.join('E:', 'cod', 'single-bet-calculator', 'lib', 'calculators', 'content.ts'),
  out,
  'utf8'
)
console.log('Written: lib/calculators/content.ts')
