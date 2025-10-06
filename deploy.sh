#!/bin/bash

echo "🚀 开始部署 Fashion Inspiration Library 到 Vercel"
echo "================================================"

# 检查是否安装了 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到 Node.js，请先安装 Node.js"
    echo "请访问 https://nodejs.org/ 下载并安装 Node.js LTS 版本"
    exit 1
fi

# 检查是否安装了 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 未检测到 npm，请确保 Node.js 安装完整"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

echo "✅ 依赖安装成功"

# 测试构建
echo "🔨 测试项目构建..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 项目构建失败"
    exit 1
fi

echo "✅ 项目构建成功"

# 检查 Git 状态
if [ ! -d ".git" ]; then
    echo "📝 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: Fashion Inspiration Library"
    echo "✅ Git 仓库初始化完成"
else
    echo "✅ Git 仓库已存在"
fi

echo ""
echo "🎉 项目准备完成！"
echo ""
echo "接下来的步骤："
echo "1. 在 GitHub 上创建一个新仓库"
echo "2. 将代码推送到 GitHub："
echo "   git remote add origin https://github.com/YOUR_USERNAME/fashion-inspiration-library.git"
echo "   git push -u origin main"
echo "3. 在 Vercel 上导入 GitHub 仓库进行部署"
echo ""
echo "详细说明请查看 DEPLOYMENT.md 文件"

