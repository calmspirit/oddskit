import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Expected Value Calculator - EV Calculator for Betting',
  description: 'Free EV calculator. Calculate expected value for betting, trading, and prediction markets. Make data-driven decisions with our easy-to-use tool.',
  keywords: ['ev calculator', 'expected value calculator', 'betting ev', 'positive ev', 'polymarket calculator', 'sports betting calculator'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
