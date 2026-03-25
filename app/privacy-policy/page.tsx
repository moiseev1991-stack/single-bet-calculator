import type { Metadata } from 'next'
import { LegalPage, LH2, LP, LUL } from '@/components/layout/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy | Single Bet Calculator',
  description: 'Our privacy policy explains how we collect, use and protect your personal data when you use our free bet calculator.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="March 2026">
      <LH2>1. Who We Are</LH2>
      <LP>
        We operate Single Bet Calculator, a free online tool for calculating betting returns.
        This website is available at <strong>[PLACEHOLDER: yourdomain.com]</strong>.
        For privacy-related enquiries, contact us at <strong>[PLACEHOLDER: privacy@yourdomain.com]</strong>.
        Registered address: <strong>[PLACEHOLDER: company name and registered address]</strong>.
      </LP>

      <LH2>2. What Data We Collect</LH2>
      <LP>We may collect the following categories of data when you use this website:</LP>
      <LUL>
        <li>Usage data collected via analytics cookies (pages visited, time on site, referring URL)</li>
        <li>IP address — collected automatically by our hosting provider and CDN</li>
        <li>Messages submitted via the contact form (name, email address, message content)</li>
      </LUL>
      <LP>
        We do <strong>not</strong> collect payment information, betting stakes, financial data,
        or any data entered into the bet calculators. All calculator inputs remain in your browser only.
      </LP>

      <LH2>3. How We Use Your Data</LH2>
      <LUL>
        <li>To analyse site usage and improve the calculators and content (analytics)</li>
        <li>To respond to messages submitted via the contact form</li>
        <li>To monitor technical performance and security of the site</li>
      </LUL>

      <LH2>4. Cookies</LH2>
      <LP>
        We use cookies to understand how visitors use the site. For full details see our{' '}
        <a href="/cookie-policy" style={{ color: 'var(--blue)' }}>Cookie Policy</a>.
        We use analytics cookies and strictly necessary cookies only. You can manage
        your preferences via the cookie banner shown on your first visit.
      </LP>

      <LH2>5. Third-Party Services</LH2>
      <LUL>
        <li>
          <strong>Google Analytics</strong> — used for anonymised traffic analysis.{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
            Google Privacy Policy
          </a>
        </li>
        <li>
          <strong>Google Fonts</strong> — fonts loaded from Google servers.{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
            Google Privacy Policy
          </a>
        </li>
        <li>
          <strong>Hosting provider</strong> — our server infrastructure may log IP addresses
          for security and performance purposes. <strong>[PLACEHOLDER: hosting provider name and privacy policy link]</strong>
        </li>
      </LUL>

      <LH2>6. Data Retention</LH2>
      <LP>
        Google Analytics data is retained for 26 months by default. Contact form submissions
        are retained for up to 12 months. Server access logs are typically retained for 30 days.
      </LP>

      <LH2>7. Your Rights (GDPR)</LH2>
      <LP>If you are located in the UK or EEA, you have the following rights:</LP>
      <LUL>
        <li><strong>Right to access</strong> — request a copy of the data we hold about you</li>
        <li><strong>Right to deletion</strong> — request that we delete your personal data</li>
        <li><strong>Right to rectification</strong> — request correction of inaccurate data</li>
        <li><strong>Right to object</strong> — object to processing of your personal data</li>
        <li><strong>Right to portability</strong> — receive your data in a machine-readable format</li>
      </LUL>
      <LP>
        To exercise any of these rights, contact us at <strong>[PLACEHOLDER: privacy@yourdomain.com]</strong>.
        You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (UK)
        at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>ico.org.uk</a> or
        your local supervisory authority if you are in the EU.
      </LP>

      <LH2>8. Children&apos;s Privacy</LH2>
      <LP>
        This website is not intended for persons under the age of 18. We do not knowingly
        collect personal data from anyone under 18. If you believe a minor has submitted data
        to us, please contact us and we will delete it promptly.
      </LP>

      <LH2>9. Changes to This Policy</LH2>
      <LP>
        We may update this privacy policy from time to time. When we do, we will update the
        &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the site
        after changes constitutes acceptance of the updated policy.
      </LP>

      <LH2>10. Contact Us</LH2>
      <LP>
        For any privacy-related questions or requests, email us at:{' '}
        <strong>[PLACEHOLDER: privacy@yourdomain.com]</strong>
      </LP>
    </LegalPage>
  )
}
