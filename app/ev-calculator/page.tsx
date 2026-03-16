'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { TrendingUp } from 'lucide-react'

export default function EVCalculator() {
  const [odds, setOdds] = useState('')
  const [probability, setProbability] = useState('')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const dec = parseFloat(odds)
    const prob = parseFloat(probability) / 100
    if (isNaN(dec) || isNaN(prob)) return

    const ev = (prob * (dec - 1)) - (1 - prob)
    const roi = (ev / 1) * 100

    setResult({
      ev: (ev * 100).toFixed(2),
      roi: roi.toFixed(2),
      recommend: ev > 0 ? 'POSITIVE EV - BET' : 'NEGATIVE EV - SKIP'
    })
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Expected Value Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate if a bet has positive expected value
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

            <button
              onClick={calculate}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Calculate EV
            </button>

            {result && (
              <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Expected Value:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{result.ev}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">ROI:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{result.roi}%</span>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <span className={`text-lg font-bold ${result.ev > 0 ? 'text-green-600' : 'text-red-600'}`}>
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
