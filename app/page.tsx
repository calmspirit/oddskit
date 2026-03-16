'use client'
import { useState, useEffect } from 'react'
import { Cloud, Calculator, TrendingUp, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Home() {
  const [yesPrice, setYesPrice] = useState('')
  const [noPrice, setNoPrice] = useState('')
  const [forecast, setForecast] = useState('')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const yes = parseFloat(yesPrice) / 100
    const no = parseFloat(noPrice) / 100
    const prob = parseFloat(forecast) / 100
    
    if (isNaN(yes) || isNaN(no) || isNaN(prob)) return

    const edge = prob - yes
    const ev = (prob * (1 - yes)) - ((1 - prob) * yes)
    const roi = (ev / yes) * 100

    setResult({
      edge: (edge * 100).toFixed(2),
      ev: (ev * 100).toFixed(2),
      roi: roi.toFixed(2),
      recommend: edge > 0.1 ? 'BET YES' : edge < -0.1 ? 'BET NO' : 'NO EDGE'
    })
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Weather Arbitrage Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find profitable edges in weather prediction markets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/odds-converter" className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <Calculator className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-bold text-gray-900 dark:text-white">Odds Converter</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Convert odds formats</p>
          </Link>
          <Link href="/ev-calculator" className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-bold text-gray-900 dark:text-white">EV Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Calculate expected value</p>
          </Link>
          <Link href="/kelly-calculator" className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-bold text-gray-900 dark:text-white">Kelly Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Optimize bet sizing</p>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Cloud className="w-6 h-6 text-blue-600" />
            Calculate Weather Edge
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                YES Price (%)
              </label>
              <input
                type="number"
                value={yesPrice}
                onChange={(e) => setYesPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                NO Price (%)
              </label>
              <input
                type="number"
                value={noPrice}
                onChange={(e) => setNoPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weather Forecast (%)
              </label>
              <input
                type="number"
                value={forecast}
                onChange={(e) => setForecast(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="60"
              />
            </div>

            <button
              onClick={calculate}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Calculate Edge
            </button>

            {result && (
              <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Edge:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{result.edge}%</span>
                </div>
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
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
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
