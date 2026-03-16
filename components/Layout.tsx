import Sidebar from './Sidebar'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ⛅ OddsKit
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
            <Link href="/odds-converter" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Odds</Link>
            <Link href="/ev-calculator" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">EV</Link>
            <Link href="/kelly-calculator" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Kelly</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:flex-1">
            {children}
          </div>
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2026 OddsKit - Free Betting Calculators</p>
        </div>
      </footer>
    </div>
  )
}
