export default function Sidebar() {
  return (
    <aside className="w-full lg:w-[30%] space-y-4">
      <div className="sticky top-20 space-y-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">Advertisement</div>
          <div className="flex justify-center">
            <iframe 
              data-aa='2430615' 
              src='//acceptable.a-ads.com/2430615/?size=Adaptive' 
              style={{border: 0, padding: 0, width: '100%', height: 'auto', overflow: 'hidden', display: 'block'}} 
            />
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg shadow">
          <div className="text-xs text-gray-600 dark:text-gray-400 text-center mb-2">💡 Support this tool</div>
          <a 
            href="https://www.bsmkweb.cc/activity/referral-entry/CPA?ref=CPA_00M8R3UI0N" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block transition-transform hover:scale-105"
          >
            <img src="/binance-logo.svg" alt="Binance" className="mx-auto h-10 w-auto" />
          </a>
        </div>
      </div>
    </aside>
  )
}
