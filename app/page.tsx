'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [yesPrice, setYesPrice] = useState('')
  const [noPrice, setNoPrice] = useState('')
  const [forecast, setForecast] = useState('')
  const [result, setResult] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('calcHistory')
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  const fetchWeather = async (city: string = 'Beijing') => {
    setLoading(true)
    try {
      const coords: any = { Beijing: [39.9, 116.4], Shanghai: [31.2, 121.5], Shenzhen: [22.5, 114.1] }
      const [lat, lon] = coords[city] || coords.Beijing
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,weather_code&daily=precipitation_probability_max&timezone=Asia/Shanghai`)
      const data = await res.json()
      setWeather({
        temp: data.current.temperature_2m,
        precip: data.current.precipitation,
        prob: data.daily.precipitation_probability_max[0],
        city
      })
      setForecast(data.daily.precipitation_probability_max[0].toString())
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const calculate = () => {
    const yes = parseFloat(yesPrice) / 100
    const no = parseFloat(noPrice) / 100
    const prob = parseFloat(forecast) / 100
    
    if (!yes || !no || !prob) return

    const impliedProb = yes
    const edge = prob - impliedProb
    const expectedValue = (prob * (1 - yes)) - ((1 - prob) * yes)
    const roi = (expectedValue / yes) * 100

    const newResult = {
      edge: (edge * 100).toFixed(2),
      ev: (expectedValue * 100).toFixed(2),
      roi: roi.toFixed(2),
      recommend: edge > 0.1 ? 'YES' : edge < -0.1 ? 'NO' : '无套利',
      time: new Date().toLocaleString('zh-CN')
    }

    setResult(newResult)
    
    const newHistory = [{ yesPrice, noPrice, forecast, ...newResult }, ...history].slice(0, 10)
    setHistory(newHistory)
    localStorage.setItem('calcHistory', JSON.stringify(newHistory))
  }

  const exportCSV = () => {
    const csv = ['时间,YES价格,NO价格,预报概率,优势,期望值,ROI,建议', 
      ...history.map(h => `${h.time},${h.yesPrice},${h.noPrice},${h.forecast},${h.edge},${h.ev},${h.roi},${h.recommend}`)
    ].join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `weather-arbitrage-${Date.now()}.csv`
    link.click()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6">
      <div className={`max-w-3xl mx-auto pt-6 sm:pt-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl mb-4 shadow-lg shadow-blue-500/50 animate-pulse">
            <span className="text-3xl">⛅</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">天气套利计算器</h1>
          <p className="text-blue-200 text-sm sm:text-base">Weather Arbitrage Calculator</p>
        </div>

        {/* Weather Widget */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
              <span className="mr-2">🌤️</span> 实时天气数据
            </h2>
            <select onChange={(e) => fetchWeather(e.target.value)} className="px-3 py-1 bg-white/20 text-white rounded-lg text-sm border border-white/30 focus:ring-2 focus:ring-cyan-400">
              <option value="Beijing">北京</option>
              <option value="Shanghai">上海</option>
              <option value="Shenzhen">深圳</option>
            </select>
          </div>
          {!weather && !loading && (
            <button onClick={() => fetchWeather()} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium hover:from-cyan-600 hover:to-blue-600 transition">
              获取天气预报
            </button>
          )}
          {loading && <div className="text-center text-blue-200 py-3">加载中...</div>}
          {weather && (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs text-blue-200 mb-1">温度</div>
                <div className="text-xl font-bold text-white">{weather.temp}°C</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs text-blue-200 mb-1">降水</div>
                <div className="text-xl font-bold text-white">{weather.precip}mm</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs text-blue-200 mb-1">降雨概率</div>
                <div className="text-xl font-bold text-white">{weather.prob}%</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Calculator Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 mb-6">
          <div className="space-y-5">
            <div>
              <label className="flex items-center text-sm font-medium mb-2 text-blue-100">
                <span className="mr-2">📈</span> 市场 YES 价格
              </label>
              <input
                type="number"
                value={yesPrice}
                onChange={(e) => setYesPrice(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 border-2 border-transparent rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-gray-900 text-lg font-medium transition"
                placeholder="65"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium mb-2 text-blue-100">
                <span className="mr-2">📉</span> 市场 NO 价格
              </label>
              <input
                type="number"
                value={noPrice}
                onChange={(e) => setNoPrice(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 border-2 border-transparent rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-gray-900 text-lg font-medium transition"
                placeholder="35"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium mb-2 text-blue-100">
                <span className="mr-2">🌤️</span> 天气预报概率
              </label>
              <input
                type="number"
                value={forecast}
                onChange={(e) => setForecast(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 border-2 border-transparent rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-gray-900 text-lg font-medium transition"
                placeholder="75"
              />
            </div>

            <button
              onClick={calculate}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105 active:scale-95"
            >
              🎯 计算套利机会
            </button>

            {result && (
              <div className="mt-6 p-5 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur rounded-xl border border-white/30 space-y-4 animate-fadeIn">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
                    <div className="text-xs text-blue-200 mb-1">优势</div>
                    <div className="text-xl font-bold text-white">{result.edge}%</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
                    <div className="text-xs text-blue-200 mb-1">期望值</div>
                    <div className="text-xl font-bold text-white">{result.ev}%</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
                    <div className="text-xs text-blue-200 mb-1">ROI</div>
                    <div className="text-xl font-bold text-white">{result.roi}%</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-sm text-blue-200 mb-2">建议操作</div>
                    <div className={`inline-block px-6 py-2 rounded-full font-bold text-xl transition-all duration-300 ${
                      result.recommend === 'YES' ? 'bg-green-500 text-white shadow-lg shadow-green-500/50 animate-pulse' : 
                      result.recommend === 'NO' ? 'bg-red-500 text-white shadow-lg shadow-red-500/50 animate-pulse' : 
                      'bg-gray-500 text-white'
                    }`}>
                      {result.recommend}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="flex items-center text-xl font-bold text-white">
                <span className="mr-2">📊</span> 计算历史
              </h2>
              <button onClick={exportCSV} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
                📥 导出CSV
              </button>
            </div>
            <div className="space-y-3">
              {history.map((item, i) => (
                <div key={i} className="p-4 bg-white/10 backdrop-blur rounded-xl border border-white/20 hover:bg-white/15 transition">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-blue-200">{item.time}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.recommend === 'YES' ? 'bg-green-500/80 text-white' : 
                      item.recommend === 'NO' ? 'bg-red-500/80 text-white' : 
                      'bg-gray-500/80 text-white'
                    }`}>
                      {item.recommend}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm text-white mb-2">
                    <div>YES: <span className="font-bold">{item.yesPrice}%</span></div>
                    <div>NO: <span className="font-bold">{item.noPrice}%</span></div>
                    <div>预报: <span className="font-bold">{item.forecast}%</span></div>
                  </div>
                  <div className="text-xs text-blue-200">
                    Edge: {item.edge}% | ROI: {item.roi}%
                  </div>
                </div>
              ))}
            </div>

            {/* Simple ROI Chart */}
            {history.length > 2 && (
              <div className="mt-6 p-4 bg-white/5 rounded-xl">
                <h3 className="text-sm font-bold text-white mb-3">ROI 趋势</h3>
                <div className="flex items-end justify-between h-32 gap-2">
                  {history.slice(0, 10).reverse().map((item, i) => {
                    const height = Math.min(Math.abs(parseFloat(item.roi)), 100)
                    const isPositive = parseFloat(item.roi) > 0
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div className={`w-full rounded-t transition-all duration-500 ${isPositive ? 'bg-green-400' : 'bg-red-400'}`} 
                             style={{ height: `${height}%` }}
                             title={`ROI: ${item.roi}%`}>
                        </div>
                        <div className="text-xs text-blue-200 mt-1">{i+1}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-blue-200 text-sm pb-8">
          <div className="mb-3">
            <a href="https://github.com/calmspirit/weather-arbitrage-calculators" 
               target="_blank" 
               className="inline-flex items-center hover:text-white transition">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
          <div className="text-xs">
            Built with Next.js & Tailwind CSS
          </div>
        </footer>
      </div>
    </main>
  )
}
