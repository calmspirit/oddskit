'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { Calculator } from 'lucide-react'

export default function OddsConverter() {
  const [american, setAmerican] = useState('')
  const [decimal, setDecimal] = useState('')
  const [fractional, setFractional] = useState('')

  const fromAmerican = (val: string) => {
    const num = parseFloat(val)
    if (isNaN(num)) return
    const dec = num > 0 ? (num / 100) + 1 : (100 / Math.abs(num)) + 1
    setDecimal(dec.toFixed(2))
    setFractional(`${num > 0 ? num : Math.abs(num)}/100`)
  }

  const fromDecimal = (val: string) => {
    const num = parseFloat(val)
    if (isNaN(num)) return
    const am = num >= 2 ? ((num - 1) * 100) : (-100 / (num - 1))
    setAmerican(am.toFixed(0))
    setFractional(`${((num - 1) * 100).toFixed(0)}/100`)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Odds Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Convert between American, Decimal, and Fractional odds
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                American Odds
              </label>
              <input
                type="number"
                value={american}
                onChange={(e) => { setAmerican(e.target.value); fromAmerican(e.target.value) }}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="-110"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Decimal Odds
              </label>
              <input
                type="number"
                value={decimal}
                onChange={(e) => { setDecimal(e.target.value); fromDecimal(e.target.value) }}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="1.91"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fractional Odds
              </label>
              <input
                type="text"
                value={fractional}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="10/11"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
