import './globals.css'

export const metadata = {
  title: '天气套利计算器',
  description: 'Polymarket 天气套利机会计算',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
