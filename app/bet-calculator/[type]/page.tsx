import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CALCULATORS, CALCULATOR_GROUPS, SITE_URL, getCalculator, getRelatedCalculators } from '@/lib/constants'
import { getCalculatorContent } from '@/lib/calculators/content'
import { BetCalculator } from '@/components/calculator/BetCalculator'
import { SpecializedCalculator, SPECIALIZED_TYPES } from '@/components/calculator/SpecializedCalculator'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RelatedCalculators } from '@/components/ui/RelatedCalculators'

interface PageProps {
  params: Promise<{ type: string }>
}

export async function generateStaticParams() {
  return CALCULATORS.map(c => ({ type: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params
  const calc = getCalculator(type)
  if (!calc) return {}

  const content = getCalculatorContent(type)
  const title = content.metaTitle || `${calc.name} | Free Bet Calculator`
  const description = content.metaDescription || `${calc.description} Free, instant results with full support for each way, Rule 4, and non-runners.`
  const url = `${SITE_URL}/bet-calculator/${calc.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: calc.name,
      description,
      url,
    },
  }
}

// Calculators with full interactive implementation (BetCalculator component)
const IMPLEMENTED = new Set([
  'single', 'double', 'treble', 'accumulator',
  'trixie', 'patent', 'yankee', 'super-yankee',
  'heinz', 'super-heinz', 'goliath',
  'lucky-15', 'lucky-31', 'lucky-63',
  'each-way', 'each-way-double',
])

export default async function CalculatorPage({ params }: PageProps) {
  const { type } = await params
  const calc = getCalculator(type)
  if (!calc) notFound()

  const content = getCalculatorContent(type)
  const related = getRelatedCalculators(type, 4)
  const isImplemented = IMPLEMENTED.has(type)

  const isAccumulatorType = ['accumulator', 'double', 'treble'].includes(type)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calc.name,
    url: `${SITE_URL}/bet-calculator/${calc.slug}`,
    description: calc.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'GBP',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Bet Calculators', href: '/' },
            { label: calc.name },
          ]}
        />

        {/* H1 + intro */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{calc.name}</h1>
          <p className="text-gray-600 leading-relaxed">{content.intro}</p>
        </div>

        {/* Calculator widget */}
        {isImplemented ? (
          <BetCalculator
            betType={isAccumulatorType ? 'accumulator' : type}
            title={calc.name}
            fixedSelections={calc.numSelectionsFixed}
          />
        ) : SPECIALIZED_TYPES.has(type) ? (
          <SpecializedCalculator type={type} />
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">🚧</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon</h2>
            <p className="text-gray-500">
              The {calc.name} is currently being built. Check back soon!
            </p>
          </div>
        )}

        {/* Article content */}
        {content.articleHtml && (
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: content.articleHtml }}
          />
        )}

        {/* Related calculators */}
        {related.length > 0 && (
          <RelatedCalculators calculators={related} />
        )}

        {/* Also See — other groups */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Also See</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CALCULATOR_GROUPS.filter(g => g.id !== calc.group).map(group => (
              <div key={group.id}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{group.name}</h3>
                <ul className="space-y-1">
                  {CALCULATORS.filter(c => c.group === group.id).slice(0, 4).map(c => (
                    <li key={c.slug}>
                      <Link
                        href={`/bet-calculator/${c.slug}`}
                        className="text-sm text-[#1b4fd8] hover:underline"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
