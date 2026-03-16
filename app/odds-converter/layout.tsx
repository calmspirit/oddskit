import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Odds Converter - Convert Betting Odds | Free Calculator',
  description: 'Free odds converter. Convert between decimal, fractional, American odds and implied probability instantly. Perfect for sports betting and prediction markets.',
  keywords: ['odds converter', 'betting odds calculator', 'decimal to fractional', 'american odds', 'implied probability', 'sports betting', 'prediction markets'],
  openGraph: {
    title: 'Odds Converter - Convert Betting Odds | Free Calculator',
    description: 'Free odds converter. Convert between decimal, fractional, American odds and implied probability instantly.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Odds Converter - Convert Betting Odds | Free Calculator',
    description: 'Free odds converter. Convert between decimal, fractional, American odds and implied probability instantly.',
  }
}

export default function OddsConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
