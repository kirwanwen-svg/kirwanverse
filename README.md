# Fashion Inspiration Library

一个现代化的服装灵感素材库网站，参考 Death to Stock Photo 的设计风格，提供交互式的图片浏览体验。

## 功能特点

- 🎨 **动态图片网格** - 不规则的图片排列，创造视觉层次感
- 🔍 **智能搜索** - 支持标题、描述、标签搜索
- 🏷️ **多维度筛选** - 按风格、季节、颜色筛选
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ✨ **流畅动画** - 使用 Framer Motion 实现丝滑交互
- 🎯 **模态框详情** - 点击图片查看详细信息

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **路由**: React Router DOM

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # React 组件
│   ├── Header.tsx      # 顶部导航栏
│   ├── HeroSection.tsx # 首页英雄区域
│   ├── ImageGrid.tsx   # 图片网格组件
│   ├── FilterSidebar.tsx # 筛选侧边栏
│   └── ItemModal.tsx   # 详情模态框
├── data/               # 数据文件
│   └── mockData.ts     # 模拟数据
├── types/              # TypeScript 类型定义
│   └── index.ts        # 类型接口
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 设计特点

### 1. 动态图片布局
- 使用 CSS Grid 实现不规则的图片排列
- 每个图片项都有不同的尺寸，创造视觉层次
- 悬停时有缩放和阴影效果

### 2. 交互体验
- 图片悬停显示详细信息
- 点击图片打开详情模态框
- 流畅的页面切换动画

### 3. 筛选系统
- 多维度筛选：风格、季节、颜色
- 实时搜索和筛选
- 移动端友好的筛选界面

### 4. 响应式设计
- 桌面端：侧边栏 + 主内容区
- 移动端：全屏筛选 + 堆叠布局
- 自适应图片网格

## 自定义配置

### 添加新的服装分类

在 `src/types/index.ts` 中修改 `FashionCategory` 类型：

```typescript
export type FashionCategory = 
  | 'streetwear'
  | 'formal'
  | 'casual'
  | 'your-new-category'; // 添加新分类
```

### 修改颜色主题

在 `tailwind.config.js` 中自定义颜色：

```javascript
colors: {
  primary: {
    500: '#your-color', // 修改主色调
  }
}
```

### 添加新的筛选选项

在 `src/components/FilterSidebar.tsx` 中添加新的筛选逻辑。

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### Netlify 部署

1. 运行 `npm run build`
2. 将 `dist` 文件夹上传到 Netlify
3. 配置重定向规则

## 许可证

MIT License

