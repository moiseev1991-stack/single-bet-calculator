import type { Metadata } from 'next'
import { LegalPage, LH2, LP, LUL } from '@/components/layout/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service | Single Bet Calculator',
  description: 'Terms of service for using our free bet calculator tools.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/terms-of-service' },
}

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="March 2026">
      <LH2>1. Acceptance of Terms</LH2>
      <LP>
        By accessing and using Single Bet Calculator (&ldquo;the Site&rdquo;), you accept and agree
        to be bound by these Terms of Service. If you do not agree, please do not use the Site.
      </LP>

      <LH2>2. Description of Service</LH2>
      <LP>
        Single Bet Calculator provides free online tools for calculating betting returns, profits,
        and stakes across a range of bet types including singles, accumulators, each way bets,
        and various full-cover bets.
      </LP>
      <LP>
        We are <strong>not</strong> a bookmaker. We do <strong>not</strong> accept bets, process
        payments, or provide gambling services of any kind. All results produced by the calculators
        are for informational and educational purposes only.
      </LP>

      <LH2>3. Accuracy of Calculations</LH2>
      <LP>
        We take care to ensure our calculators produce accurate results, but we make no warranty
        as to the accuracy, completeness, or fitness for purpose of any calculation.
      </LP>
      <LUL>
        <li>You are responsible for verifying any calculation with your bookmaker before placing a bet</li>
        <li>Bookmakers may apply their own rounding rules which may differ from our output</li>
        <li>Rule 4 deductions, dead heat rules, and each way terms vary between bookmakers</li>
      </LUL>

      <LH2>4. No Gambling Services</LH2>
      <LP>
        This Site is not a licensed gambling operator. We do not hold a gambling licence.
        We do not accept deposits, wagers, or make any payments to users. Nothing on this
        Site should be construed as an invitation to gamble.
      </LP>

      <LH2>5. Age Restriction</LH2>
      <LP>
        You must be 18 years of age or older (or the legal gambling age in your jurisdiction,
        whichever is higher) to use this Site. By using the Site, you confirm that you meet
        this age requirement.
      </LP>

      <LH2>6. Intellectual Property</LH2>
      <LP>
        All content on this Site — including text, code, design, and calculators — is the
        property of Single Bet Calculator and is protected by copyright law. You may not
        reproduce, redistribute, or republish any part of the Site without express written permission.
      </LP>

      <LH2>7. Disclaimer of Warranties</LH2>
      <LP>
        The Site and all its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
        without warranties of any kind, either express or implied, including but not limited to
        implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
      </LP>

      <LH2>8. Limitation of Liability</LH2>
      <LP>
        To the maximum extent permitted by law, Single Bet Calculator shall not be liable for
        any direct, indirect, incidental, special, or consequential damages arising from your
        use of the Site or reliance on any calculation result, including financial losses
        resulting from betting decisions.
      </LP>

      <LH2>9. Governing Law</LH2>
      <LP>
        These Terms are governed by the laws of <strong>[PLACEHOLDER: England and Wales]</strong>.
        Any disputes shall be subject to the exclusive jurisdiction of the courts of that territory.
      </LP>

      <LH2>10. Changes to Terms</LH2>
      <LP>
        We reserve the right to update these Terms at any time. Changes will be posted on this page
        with an updated &ldquo;Last updated&rdquo; date. Continued use of the Site after any changes
        constitutes your acceptance of the revised Terms.
      </LP>

      <LH2>11. Contact</LH2>
      <LP>
        For any questions regarding these Terms, contact us at:{' '}
        <strong>[PLACEHOLDER: legal@yourdomain.com]</strong>
      </LP>
    </LegalPage>
  )
}
