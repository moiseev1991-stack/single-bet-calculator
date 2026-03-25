'use client'

import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

interface LegalPageProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

const LEGAL_LINKS = [
  { label: 'Privacy Policy',       href: '/privacy-policy' },
  { label: 'Terms of Service',     href: '/terms-of-service' },
  { label: 'Cookie Policy',        href: '/cookie-policy' },
  { label: 'Responsible Gambling', href: '/responsible-gambling' },
  { label: 'Disclaimer',           href: '/disclaimer' },
]

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-10">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: title }]} />

      <h1
        className="text-3xl font-bold mt-5 mb-2"
        style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}
      >
        {title}
      </h1>
      <p className="text-xs mb-10" style={{ color: 'var(--text-muted)' }}>
        Last updated: {lastUpdated}
      </p>

      {/* Prose content */}
      <div
        className="legal-prose"
        style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-muted)' }}
      >
        {children}
      </div>

      {/* Related legal pages */}
      <div
        className="mt-14 pt-8 border-t"
        style={{ borderColor: 'var(--border-col)' }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
          Legal pages
        </p>
        <div className="flex flex-wrap gap-2">
          {LEGAL_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs px-3 py-1.5 rounded-lg border transition-colors duration-150"
              style={{ borderColor: 'var(--border-col)', color: 'var(--text-muted)' }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--blue)'
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--blue)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-col)'
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Shared prose element helpers — use inside LegalPage children
export function LH2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-lg font-bold mt-8 mb-3"
      style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}
    >
      {children}
    </h2>
  )
}

export function LH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold mt-5 mb-2" style={{ color: 'var(--text-col)' }}>
      {children}
    </h3>
  )
}

export function LP({ children }: { children: React.ReactNode }) {
  return <p className="mb-3">{children}</p>
}

export function LUL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-5 space-y-1 mb-4 text-sm">{children}</ul>
}
