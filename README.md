# 🎲 OddsKit

Your Complete Odds Toolkit - Professional odds conversion and betting calculators for prediction markets and sports betting.

![OddsKit](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🎯 Features

- **Odds Converter** - Convert between American, Decimal, Fractional odds and Implied Probability
- **Kelly Criterion Calculator** - Calculate optimal bet sizing for bankroll management
- **Weather Arbitrage Calculator** - Real-time arbitrage opportunities in weather prediction markets
- **Smart Recommendations** - Get YES/NO/HOLD signals based on probability analysis
- **Calculation History** - Track your calculations with local storage
- **Multi-language Support** - Available in EN, JA, FR, ES, ZH-CN, ZH-TW
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Dark Mode** - Easy on the eyes for extended use
- **CSV Export** - Export your calculation history

## 🚀 How to Use

### Odds Converter
Convert between different odds formats instantly. Enter any format and see all conversions.

### Kelly Criterion
1. Enter your bankroll
2. Enter odds and your estimated probability
3. Get optimal bet size recommendation

### Weather Arbitrage
1. **Enter Market YES Price** - Current market probability (e.g., 65%)
2. **Enter Market NO Price** - Inverse market probability (e.g., 35%)
3. **Enter Weather Forecast** - Meteorological forecast probability (e.g., 75%)
4. **Click Calculate** - Get instant arbitrage analysis

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **UI**: React 19 with Client Components
- **Storage**: Browser LocalStorage for history

## 💻 Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/calmspirit/weather-arbitrage-calculators.git
cd weather-arbitrage-calculators

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/calmspirit/weather-arbitrage-calculators)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📊 How It Works

### Weather Arbitrage Formulas

- **Edge** = Weather Forecast Probability - Market Implied Probability
- **Expected Value (EV)** = (Forecast × (1 - YES Price)) - ((1 - Forecast) × YES Price)
- **ROI** = (EV / YES Price) × 100

**Trading Signal Logic:**
- Edge > 10%: **BUY YES**
- Edge < -10%: **BUY NO**
- -10% ≤ Edge ≤ 10%: **NO ARBITRAGE**

### Kelly Criterion Formula

- **Kelly %** = (bp - q) / b
  - b = decimal odds - 1
  - p = probability of winning
  - q = probability of losing (1 - p)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🔗 Links

- **GitHub**: https://github.com/calmspirit/weather-arbitrage-calculators
- **Issues**: https://github.com/calmspirit/weather-arbitrage-calculators/issues

**Note**: Repository will be renamed to `oddskit` soon. URLs will be updated accordingly.

---

Built with ❤️ for prediction market traders and sports bettors
