'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
}

export function FAQSection({ faqs, title = 'Frequently Asked Questions' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section>
      <h2
        className="text-2xl font-bold mb-6"
        style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'var(--text-col)' }}
      >
        {title}
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: 'var(--border-col)', background: 'var(--bg-surface)' }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-150"
              style={{ background: openIndex === i ? 'var(--bg-surface2)' : 'transparent' }}
              onMouseEnter={e => {
                if (openIndex !== i)
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--hover-subtle)'
              }}
              onMouseLeave={e => {
                if (openIndex !== i)
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              }}
            >
              <span
                className="font-medium text-sm pr-4"
                style={{ color: openIndex === i ? 'var(--text-col)' : 'var(--text-muted)' }}
              >
                {faq.question}
              </span>
              <ChevronDown
                className="flex-shrink-0 transition-transform duration-150"
                style={{
                  width: 16,
                  height: 16,
                  color: openIndex === i ? 'var(--blue)' : 'var(--text-muted)',
                  transform: openIndex === i ? 'rotate(180deg)' : 'none',
                }}
              />
            </button>
            {openIndex === i && (
              <div
                className="px-5 py-4 text-sm leading-relaxed faq-answer"
                style={{
                  background: 'var(--bg-surface2)',
                  borderTop: '1px solid var(--border-col)',
                  color: 'var(--text-muted)',
                }}
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
