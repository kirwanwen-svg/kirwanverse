# 🏠 本地部署指南

## ✅ 部署状态

你的 Fashion Inspiration Library 已经成功在本地部署！

## 🌐 访问网站

打开浏览器，访问：**http://localhost:3000**

## 🚀 启动方式

### 方法一：使用启动脚本（推荐）
```bash
./start.sh
```

### 方法二：手动启动
```bash
# 设置环境变量
export PATH=$PWD/node-v20.10.0-darwin-arm64/bin:$PATH

# 启动开发服务器
npm run dev
```

## 📱 网站功能

### 主要页面
- **首页**：动态英雄区域，展示网站特色
- **素材库**：不规则的图片网格，悬停效果
- **分类浏览**：按风格分类快速浏览

### 交互功能
- **搜索**：实时搜索标题、描述、标签
- **筛选**：按风格、季节、颜色筛选
- **详情查看**：点击图片查看详细信息
- **响应式设计**：完美适配手机和桌面

### 设计特色
- **黑色主题**：现代感十足的深色界面
- **动态效果**：流畅的悬停和点击动画
- **图片网格**：不规则的布局，创造视觉层次
- **渐变元素**：蓝色渐变主色调

## 🛠️ 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 代码检查
npm run lint
```

## 📁 项目结构

```
fashion-inspiration-library/
├── src/
│   ├── components/         # React 组件
│   │   ├── Header.tsx     # 顶部导航
│   │   ├── HeroSection.tsx # 首页英雄区域
│   │   ├── ImageGrid.tsx  # 图片网格
│   │   ├── FilterSidebar.tsx # 筛选侧边栏
│   │   └── ItemModal.tsx  # 详情模态框
│   ├── data/
│   │   └── mockData.ts    # 模拟数据
│   ├── types/
│   │   └── index.ts       # TypeScript 类型
│   ├── App.tsx            # 主应用组件
│   └── main.tsx           # 应用入口
├── node_modules/          # 依赖包
├── node-v20.10.0-darwin-arm64/ # Node.js 运行时
├── start.sh               # 启动脚本
└── package.json           # 项目配置
```

## 🔧 自定义配置

### 修改数据
编辑 `src/data/mockData.ts` 文件，添加你的真实服装素材数据。

### 修改样式
编辑 `tailwind.config.js` 文件，自定义颜色主题和样式。

### 添加新功能
在 `src/components/` 目录下创建新的 React 组件。

## 🎯 下一步

1. **查看效果**：访问 http://localhost:3000 查看网站
2. **自定义内容**：修改 `mockData.ts` 添加你的素材
3. **调整样式**：修改 `tailwind.config.js` 调整主题
4. **部署上线**：使用 `DEPLOYMENT.md` 中的指南部署到 Vercel

## ❓ 常见问题

### Q: 如何停止服务器？
A: 在终端中按 `Ctrl+C`

### Q: 如何重新启动？
A: 运行 `./start.sh` 或 `npm run dev`

### Q: 如何修改端口？
A: 在 `vite.config.ts` 中修改 `server.port` 配置

### Q: 如何添加新的图片？
A: 在 `src/data/mockData.ts` 中添加新的 `FashionItem` 对象

---

**🎉 恭喜！你的服装灵感素材库已经成功运行！**

现在可以打开浏览器访问 http://localhost:3000 查看效果了！

