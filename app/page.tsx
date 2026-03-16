'use client'
import { useState } from 'react'

export default function Home() {
  const [yesPrice, setYesPrice] = useState('')
  const [noPrice, setNoPrice] = useState('')
  const [forecast, setForecast] = useState('')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const yes = parseFloat(yesPrice) / 100
    const no = parseFloat(noPrice) / 100
    const prob = parseFloat(forecast) / 100
    
    if (!yes || !no || !prob) return

    const impliedProb = yes
    const edge = prob - impliedProb
    const expectedValue = (prob * (1 - yes)) - ((1 - prob) * yes)
    const roi = (expectedValue / yes) * 100

    setResult({
      edge: (edge * 100).toFixed(2),
      ev: (expectedValue * 100).toFixed(2),
      roi: roi.toFixed(2),
      recommend: edge > 0.1 ? 'YES' : edge < -0.1 ? 'NO' : '无套利'
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">⛅ 天气套利计算器</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">市场 YES 价格 (%)</label>
            <input
              type="number"
              value={yesPrice}
              onChange={(e) => setYesPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="例: 65"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">市场 NO 价格 (%)</label>
            <input
              type="number"
              value={noPrice}
              onChange={(e) => setNoPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="例: 35"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">天气预报概率 (%)</label>
            <input
              type="number"
              value={forecast}
              onChange={(e) => setForecast(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="例: 75"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            计算套利机会
          </button>

          {result && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">优势 (Edge):</span>
                <span className="font-bold">{result.edge}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">期望值 (EV):</span>
                <span className="font-bold">{result.ev}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ROI:</span>
                <span className="font-bold">{result.roi}%</span>
              </div>
              <div className="pt-3 border-t">
                <div className="text-center">
                  <span className="text-gray-600">建议操作: </span>
                  <span className={`font-bold text-lg ${
                    result.recommend === 'YES' ? 'text-green-600' : 
                    result.recommend === 'NO' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {result.recommend}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
