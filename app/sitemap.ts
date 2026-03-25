import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

const calculatorSlugs = [
  'single', 'double', 'treble', 'accumulator',
  'trixie', 'patent', 'yankee', 'super-yankee',
  'heinz', 'super-heinz', 'goliath',
  'lucky-15', 'lucky-31', 'lucky-63',
  'each-way', 'each-way-double',
  'rule-4', 'dead-heat', 'forecast', 'reverse-forecast',
  'arbitrage', 'matched-betting', 'dutch',
  'kelly-criterion', 'expected-value', 'no-vig',
  'odds-converter', 'implied-probability',
  'betting-margin', 'sharp-stakes',
]

const staticPages = [
  '', 'about', 'contact', 'faq',
  'privacy-policy', 'terms-of-service', 'cookie-policy',
  'responsible-gambling', 'disclaimer',
  'odds-explained', 'betting-glossary',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorUrls = calculatorSlugs.map(slug => ({
    url: `${SITE_URL}/bet-calculator/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: slug === 'single' ? 1.0 : 0.8,
  }))

  const staticUrls = staticPages.map(page => ({
    url: page ? `${SITE_URL}/${page}` : SITE_URL,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: page === '' ? 1.0 : page === 'about' ? 0.5 : 0.4,
  }))

  return [...staticUrls, ...calculatorUrls]
}
