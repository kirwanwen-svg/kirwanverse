# 🚀 快速开始指南

## 立即部署到 Vercel

### 方法一：一键部署（推荐）

1. **安装 Node.js**
   - 访问 [nodejs.org](https://nodejs.org/)
   - 下载并安装 LTS 版本

2. **运行部署脚本**
   ```bash
   ./deploy.sh
   ```

3. **创建 GitHub 仓库**
   - 访问 [GitHub](https://github.com)
   - 创建新仓库：`fashion-inspiration-library`
   - 设置为 Public

4. **推送代码**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/fashion-inspiration-library.git
   git push -u origin main
   ```

5. **在 Vercel 部署**
   - 访问 [vercel.com](https://vercel.com)
   - 用 GitHub 登录
   - 点击 "New Project"
   - 选择你的仓库
   - 点击 "Deploy"

### 方法二：手动步骤

如果脚本运行有问题，可以手动执行：

```bash
# 1. 安装依赖
npm install

# 2. 测试构建
npm run build

# 3. 初始化 Git
git init
git add .
git commit -m "Initial commit"

# 4. 推送到 GitHub（需要先创建仓库）
git remote add origin https://github.com/YOUR_USERNAME/fashion-inspiration-library.git
git push -u origin main
```

## 🎯 部署后你将得到

- ✅ 一个完全功能的服装灵感素材库网站
- ✅ 响应式设计，支持手机和桌面
- ✅ 动态图片网格布局
- ✅ 智能搜索和筛选功能
- ✅ 流畅的动画效果
- ✅ 现代化的黑色主题设计

## 🌐 访问你的网站

部署成功后，你会得到一个类似这样的 URL：
`https://fashion-inspiration-library.vercel.app`

## 📱 功能预览

- **首页**：动态英雄区域，展示网站特色
- **素材库**：不规则的图片网格，悬停效果
- **搜索**：实时搜索标题、描述、标签
- **筛选**：按风格、季节、颜色筛选
- **详情**：点击图片查看详细信息
- **响应式**：完美适配各种设备

## 🔧 自定义

部署成功后，你可以：
- 修改 `src/data/mockData.ts` 添加你的真实数据
- 调整 `tailwind.config.js` 中的颜色主题
- 在 `src/types/index.ts` 中添加新的分类

## ❓ 需要帮助？

如果遇到问题，请查看：
- `DEPLOYMENT.md` - 详细部署说明
- `README.md` - 项目技术文档

---

**开始你的时尚灵感之旅吧！** 🎨✨

