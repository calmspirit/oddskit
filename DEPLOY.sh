#!/bin/bash
# 天气套利计算器部署脚本

echo "🚀 开始部署天气套利计算器"

# 1. 创建 GitHub 仓库（需要手动在 GitHub 上创建）
echo "📝 步骤 1: 在 GitHub 创建新仓库"
echo "   仓库名: weather-arbitrage-calculator"
echo "   设置为 Public"
echo ""

# 2. 推送代码
echo "📤 步骤 2: 推送代码到 GitHub"
echo "   运行以下命令（替换 YOUR_USERNAME）:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/weather-arbitrage-calculator.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""

# 3. Vercel 部署
echo "🌐 步骤 3: Vercel 部署"
echo "   1. 访问 https://vercel.com"
echo "   2. 点击 'Import Project'"
echo "   3. 选择你的 GitHub 仓库"
echo "   4. 点击 'Deploy'"
echo ""

echo "✅ 完成后你的网站将在 https://weather-arbitrage-calculator.vercel.app 上线！"
