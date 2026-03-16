import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'OddsKit | Your Complete Odds Toolkit',
  description: 'Professional odds conversion and betting calculators. Real-time Edge, EV, ROI calculations, Kelly Criterion, and odds conversion tools for prediction markets and sports betting',
  keywords: 'odds converter, Kelly calculator, arbitrage calculator, betting odds, prediction market, EV calculator, ROI calculator, sports betting tools',
  openGraph: {
    title: 'OddsKit - Your Complete Odds Toolkit',
    description: 'Professional odds conversion and betting calculators for prediction markets',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⛅</text></svg>" />
        <script dangerouslySetInnerHTML={{__html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`}} />
      </head>
      <body>
        <Script src="https://api.a-ads.com/ads.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  )
}
