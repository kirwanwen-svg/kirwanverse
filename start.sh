#!/bin/bash

echo "🚀 启动 Fashion Inspiration Library 开发服务器"
echo "================================================"

# 设置 Node.js 环境变量
export PATH=$PWD/node-v20.10.0-darwin-arm64/bin:$PATH

# 检查 Node.js 是否可用
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未找到，请确保 node-v20.10.0-darwin-arm64 目录存在"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"

# 检查依赖是否已安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装项目依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装成功"
fi

echo "🌐 启动开发服务器..."
echo "服务器将在 http://localhost:3000 启动"
echo "按 Ctrl+C 停止服务器"
echo ""

# 启动开发服务器
npm run dev

