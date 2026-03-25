'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const CONSENT_KEY = 'cookie_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY)
      if (saved === null) setVisible(true)
    } catch {}
  }, [])

  function setConsent(value: 'accepted' | 'rejected') {
    try {
      localStorage.setItem(CONSENT_KEY, value)
      // Set a cookie that expires in 1 year
      const expires = new Date()
      expires.setFullYear(expires.getFullYear() + 1)
      document.cookie = `${CONSENT_KEY}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
    } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-col)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Text */}
        <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--text-muted)' }}>
          We use cookies to improve your experience and analyse site traffic.
          See our{' '}
          <Link href="/cookie-policy" className="underline" style={{ color: 'var(--blue)' }}>
            Cookie Policy
          </Link>{' '}
          for details.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setConsent('rejected')}
            className="px-4 py-2 rounded-lg text-xs font-medium border transition-colors duration-150"
            style={{ borderColor: 'var(--border-col)', color: 'var(--text-muted)' }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-hover)'
              ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-col)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-col)'
              ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'
            }}
          >
            Reject Non-Essential
          </button>

          <button
            onClick={() => setConsent('accepted')}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)' }}
          >
            Accept All
          </button>

          <button
            onClick={() => setVisible(false)}
            className="p-1.5 rounded-lg transition-colors duration-150"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Dismiss"
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-col)')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
