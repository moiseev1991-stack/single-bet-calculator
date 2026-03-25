import type { Metadata } from 'next'
import { LegalPage, LH2, LP } from '@/components/layout/LegalPage'

export const metadata: Metadata = {
  title: 'Disclaimer | Single Bet Calculator',
  description: 'Disclaimer for Single Bet Calculator — calculator accuracy, no gambling services, age restrictions, and affiliate disclosure.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/disclaimer' },
}

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" lastUpdated="March 2026">
      <LH2>Calculator Accuracy</LH2>
      <LP>
        The calculators on this site are provided for informational and educational purposes only.
        While we strive to ensure that all calculations are accurate, we make no representation
        or warranty, express or implied, as to the accuracy, completeness, or reliability of
        any result produced.
      </LP>
      <LP>
        Always verify any calculation directly with your bookmaker before placing a bet.
        Bookmakers may apply different rounding conventions, Rule 4 deductions, each way terms,
        or settlement rules that may result in different payouts to those shown by our calculators.
      </LP>

      <LH2>Not a Gambling Operator</LH2>
      <LP>
        Single Bet Calculator is not a licensed gambling operator. We do not hold a gambling
        licence issued by the UK Gambling Commission or any other regulatory body. We do not
        accept deposits, wagers, or make payouts of any kind.
      </LP>
      <LP>
        We accept no responsibility for any financial decisions made on the basis of results
        shown by our calculators. Betting involves risk and you may lose money.
      </LP>

      <LH2>Age Restriction</LH2>
      <LP>
        This site is intended for adults aged 18 and over only. Gambling is illegal for those
        under 18 in the United Kingdom. By using this site, you confirm that you are 18 years
        of age or older (or the legal gambling age in your jurisdiction, whichever is higher).
      </LP>

      <LH2>Jurisdiction</LH2>
      <LP>
        This site is primarily intended for users in the United Kingdom and Ireland. It is not
        intended for use in jurisdictions where online gambling tools or gambling itself is
        prohibited or restricted. Users are solely responsible for ensuring that their use
        of this site complies with local laws and regulations.
      </LP>

      <LH2>Affiliate Disclosure</LH2>
      <LP>
        <strong>[PLACEHOLDER: If you use affiliate links, disclose here.]</strong>
      </LP>
      <LP>
        Example: &ldquo;Some links on this site may be affiliate links. This means we may earn
        a small commission if you click through and sign up to a bookmaker. This does not
        affect the price you pay or the quality of our calculators. We only link to licensed,
        reputable operators.&rdquo;
      </LP>
      <LP>
        If this site does not use affiliate links, you may remove this section.
      </LP>

      <LH2>No Financial Advice</LH2>
      <LP>
        Nothing on this site constitutes financial advice, investment advice, or any other
        form of advice. The Kelly Criterion, Expected Value, and other analytical calculators
        are provided as mathematical tools only. Use them at your own risk.
      </LP>
    </LegalPage>
  )
}
