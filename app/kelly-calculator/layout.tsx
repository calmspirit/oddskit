import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kelly Criterion Calculator - Optimal Bet Sizing Tool',
  description: 'Free Kelly Criterion calculator. Calculate optimal bet size for sports betting, trading, and prediction markets. Maximize long-term growth with proper bankroll management.',
  keywords: ['kelly criterion calculator', 'kelly formula', 'optimal bet size', 'bankroll management', 'betting calculator', 'sports betting', 'prediction markets'],
  openGraph: {
    title: 'Kelly Criterion Calculator - Optimal Bet Sizing Tool',
    description: 'Calculate optimal bet size using the Kelly Criterion formula for maximum long-term growth',
    type: 'website',
  },
}

export default function KellyCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
