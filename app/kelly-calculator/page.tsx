'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { BarChart3 } from 'lucide-react'

export default function KellyCalculator() {
  const [odds, setOdds] = useState('')
  const [probability, setProbability] = useState('')
  const [bankroll, setBankroll] = useState('')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const dec = parseFloat(odds)
    const prob = parseFloat(probability) / 100
    const bank = parseFloat(bankroll)
    if (isNaN(dec) || isNaN(prob) || isNaN(bank)) return

    const q = 1 - prob
    const b = dec - 1
    const kelly = (b * prob - q) / b
    const kellyPercent = Math.max(0, kelly * 100)
    const betAmount = (kellyPercent / 100) * bank

    setResult({
      kelly: kellyPercent.toFixed(2),
      betAmount: betAmount.toFixed(2),
      recommend: kellyPercent > 0 ? 'BET' : 'NO BET'
    })
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Kelly Criterion Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Optimize your bet sizing for maximum growth
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Decimal Odds
              </label>
              <input
                type="number"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="2.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Win Probability (%)
              </label>
              <input
                type="number"
                value={probability}
                onChange={(e) => setProbability(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="55"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bankroll ($)
              </label>
              <input
                type="number"
                value={bankroll}
                onChange={(e) => setBankroll(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="1000"
              />
            </div>

            <button
              onClick={calculate}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Calculate Kelly
            </button>

            {result && (
              <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Kelly %:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{result.kelly}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Bet Amount:</span>
                  <span className="font-bold text-gray-900 dark:text-white">${result.betAmount}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {result.recommend}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
