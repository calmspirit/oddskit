#!/bin/bash
# GitHub 推送脚本

echo "请输入你的 GitHub Personal Access Token:"
read -s TOKEN

cd /home/george/.openclaw/workspace/weather-arbitrage
git push https://$TOKEN@github.com/calmspirit/weather-arbitrage-calculator.git master

echo "✅ 推送完成！"
