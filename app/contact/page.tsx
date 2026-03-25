'use client'

import { useState } from 'react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Check } from 'lucide-react'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || ''

const SUBJECTS = [
  'Bug report',
  'Suggestion',
  'Partnership',
  'Other',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!FORMSPREE_ID) return

    setSending(true)
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSubmitted(true)
        form.reset()
      }
    } finally {
      setSending(false)
    }
  }

  const inputCls = 'w-full border rounded-xl px-4 py-2.5 text-sm transition-colors duration-150 focus:outline-none bg-[var(--bg-surface2)] border-[var(--border-col)] text-[var(--text-col)] focus:border-[var(--blue)] placeholder-[var(--text-muted)]'

  return (
    <div className="max-w-[600px] mx-auto px-4 sm:px-6 py-10" style={{ color: 'var(--text-col)' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <h1
        className="text-3xl font-bold mt-5 mb-3"
        style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
      >
        Contact Us
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        Found a bug in a calculator? Have a suggestion or want to discuss a partnership?
        We read every message and aim to reply within 2 business days.
      </p>

      {submitted ? (
        <div
          className="rounded-2xl p-8 text-center border"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-col)' }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(5,150,105,0.1)' }}
          >
            <Check className="h-6 w-6" style={{ color: 'var(--green)' }} />
          </div>
          <p className="font-semibold mb-1" style={{ color: 'var(--text-col)' }}>Message sent</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Thanks for getting in touch — we&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border p-6 space-y-4"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-col)' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>
                Name
              </label>
              <input name="name" type="text" required placeholder="Your name" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs mb-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>
                Email
              </label>
              <input name="email" type="email" required placeholder="you@example.com" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>
              Subject
            </label>
            <div className="relative">
              <select name="subject" className={inputCls + ' appearance-none pr-8 cursor-pointer'}>
                {SUBJECTS.map(s => (
                  <option key={s} value={s} style={{ background: 'var(--bg-surface2)' }}>{s}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us what's on your mind..."
              className={inputCls + ' resize-none'}
            />
          </div>

          <button
            type="submit"
            disabled={sending || !FORMSPREE_ID}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #0e7490 100%)' }}
          >
            {sending ? 'Sending…' : 'Send message'}
          </button>

          {!FORMSPREE_ID && (
            <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
              Set <code className="text-[11px]">NEXT_PUBLIC_FORMSPREE_ID</code> in your environment to enable form submission.
            </p>
          )}
        </form>
      )}

      <p className="text-xs mt-6 text-center" style={{ color: 'var(--text-muted)' }}>
        Prefer email? Write directly to{' '}
        <a href="mailto:[PLACEHOLDER:hello@yourdomain.com]" style={{ color: 'var(--blue)' }}>
          [PLACEHOLDER: hello@yourdomain.com]
        </a>
      </p>
    </div>
  )
}
