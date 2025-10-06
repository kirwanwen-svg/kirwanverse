# 部署指南

## 方法一：通过 GitHub + Vercel 部署（推荐）

### 1. 安装必要的工具

由于系统缺少开发者工具，请按以下步骤操作：

#### 安装 Xcode 命令行工具
```bash
# 在终端中运行以下命令，会弹出安装对话框
xcode-select --install
```

#### 安装 Node.js
访问 [nodejs.org](https://nodejs.org/) 下载并安装 Node.js LTS 版本。

### 2. 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击 "New repository" 创建新仓库
3. 仓库名称建议：`fashion-inspiration-library`
4. 设置为 Public 仓库
5. 不要初始化 README（我们已经有了）

### 3. 推送代码到 GitHub

在项目目录中运行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Fashion Inspiration Library"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/fashion-inspiration-library.git

# 推送到 GitHub
git push -u origin main
```

### 4. 在 Vercel 上部署

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你刚创建的 GitHub 仓库
5. 点击 "Import"
6. Vercel 会自动检测到这是一个 Vite + React 项目
7. 保持默认设置，点击 "Deploy"
8. 等待部署完成（通常 1-2 分钟）

## 方法二：使用 Vercel CLI 部署

### 1. 安装 Vercel CLI
```bash
npm install -g vercel
```

### 2. 登录 Vercel
```bash
vercel login
```

### 3. 部署项目
```bash
# 在项目目录中运行
vercel

# 按照提示操作：
# - 选择项目名称
# - 选择团队（如果有）
# - 确认设置
```

## 方法三：手动上传到 Vercel

如果上述方法都不可行，可以：

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 选择 "Browse All Templates"
4. 选择 "Vite" 模板
5. 手动上传项目文件

## 部署后的配置

### 环境变量（如果需要）
在 Vercel 项目设置中添加环境变量：
- `NODE_ENV=production`

### 自定义域名（可选）
1. 在 Vercel 项目设置中
2. 点击 "Domains"
3. 添加你的自定义域名

## 常见问题

### 1. 构建失败
- 检查 `package.json` 中的依赖是否正确
- 确保所有 TypeScript 类型都正确定义

### 2. 图片不显示
- 确保图片 URL 是公开可访问的
- 检查 CORS 设置

### 3. 样式问题
- 确保 Tailwind CSS 配置正确
- 检查 `index.css` 中的导入

## 项目结构说明

```
fashion-inspiration-library/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React 组件
│   ├── data/              # 数据文件
│   ├── types/             # TypeScript 类型
│   ├── App.tsx            # 主应用
│   └── main.tsx           # 入口文件
├── package.json           # 项目配置
├── vite.config.ts         # Vite 配置
├── tailwind.config.js     # Tailwind 配置
└── tsconfig.json          # TypeScript 配置
```

## 部署成功后的访问

部署成功后，你会得到一个类似这样的 URL：
`https://fashion-inspiration-library.vercel.app`

你可以将这个 URL 分享给其他人访问你的服装灵感素材库！

