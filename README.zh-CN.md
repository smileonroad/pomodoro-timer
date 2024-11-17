# 番茄钟计时器

[English](./README.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja.md)

一个使用 React、TypeScript 和 Tailwind CSS 构建的精美且功能丰富的番茄钟计时器应用。

## 功能特点

- 🎯 专注计时器
  - 选择任务开启专注计时
  - 计时功能包括开始、暂停和重置
  - 自动开始下一个环节选项
  
- 🎯 计时器配置
  - 可自定义工作时长（默认：25分钟）
  - 短休息时间（默认：5分钟）
  - 长休息时间（默认：15分钟）

- 📝 任务管理
  - 创建、编辑和删除任务
  - 设置任务的番茄计时配置
  
- 📊 数据统计
  - 每日/每周/每月/每任务/统计专注时间
  - 已完成任务历史
  - 生产力趋势分析

- 🌍 多语言支持
  - 英语 (en)
  - 简体中文 (zh)
  - 日语 (ja)

- 🎨 精美界面与暗黑模式
  - 简洁现代的界面设计
  - 明暗主题切换
  - 流畅的动画效果

- 📱 响应式设计
  - 适配桌面端、平板和移动设备
  - 支持渐进式网页应用（PWA）

- 🔔 提醒通知
  - 自定义提示音
  - 浏览器通知
  - 环节完成提醒

## 在线演示

访问应用：[番茄钟计时器](https://gleeful-marigold-65f08c.netlify.app)

## 技术栈

- React 18
- TypeScript 5
- Tailwind CSS
- Vite
- 主要依赖库：
  - i18next - 国际化支持
  - date-fns - 日期格式化
  - Lucide Icons - 图标库
  - [其他主要依赖库]

## 快速开始

### 环境要求

- Node.js (v16.0.0 或更高版本)
- npm 或 yarn

### 安装步骤

1. 克隆仓库：
   ```bash
   git clone https://github.com/smileonroad/pomodoro-timer.git
   cd pomodoro-timer
   npm install
   npm run dev
   ```

2. 打开浏览器并访问 `http://localhost:3000` 查看应用程序的运行情况。

## 代码结构和技术讲解

### 项目结构

```
src/
├── App.tsx
├── components/
│   ├── Stats.tsx
│   ├── TaskList.tsx
│   ├── Timer.tsx
│   └── LanguageSelector.tsx
├── context/
│   ├── TaskContext.tsx
│   └── TimerContext.tsx
├── i18n/
│   └── locales/
│       ├── en.json
│       ├── ja.json
│       └── zh.json
├── types/
│   └── task.ts
└── index.tsx
```

### 主要文件和目录

- **App.tsx**: 应用的主组件，负责渲染整个应用的结构，包括定时器、任务列表和统计信息。
- **components/**: 包含所有的 UI 组件，如定时器、任务列表和统计信息等。
- **context/**: 包含 React 上下文，用于管理应用的状态，如任务和计时器的状态。
- **i18n/**: 包含国际化相关的文件，支持多语言功能。
- **types/**: 定义 TypeScript 接口，确保类型安全。

### 关键技术

#### React

React 是一个用于构建用户界面的 JavaScript 库。我们使用 React 的组件化思想，将应用拆分为多个可重用的组件。

- **组件**: 每个组件负责渲染特定的 UI 部分。例如，`Timer` 组件负责显示计时器，`TaskList` 组件负责显示任务列表。

#### TypeScript

TypeScript 是 JavaScript 的超集，添加了静态类型。我们在项目中使用 TypeScript 来提高代码的可维护性和可读性。

- **类型定义**: 在 `types/task.ts` 中定义了 `Task` 和 `TaskSettings` 接口，确保任务对象的结构一致。

#### i18next

i18next 是一个国际化框架，支持多语言功能。我们使用它来管理应用的语言切换。

- **语言文件**: 在 `i18n/locales/` 目录下，分别有 `en.json`、`ja.json` 和 `zh.json` 文件，存储不同语言的文本内容。

### 状态管理

我们使用 React 的上下文 API 来管理应用的状态，特别是任务和计时器的状态。

- **TaskContext**: 管理任务的状态，包括添加、更新和删除任务。
- **TimerContext**: 管理计时器的状态，包括开始、暂停和重置计时器。

### 组件示例

以下是 `Timer.tsx` 组件的示例，展示了如何使用上下文和国际化：

```typescript
import React, { useEffect, useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import { useTranslation } from 'react-i18next';
import { TaskContext } from '../context/TaskContext';

const Timer = () => {
  const { t } = useTranslation();
  const { currentTask } = useContext(TaskContext);
  const {
    timeLeft,
    isActive,
    isPaused,
    currentMode,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useContext(TimerContext);

  if (!currentTask) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 dark:text-gray-400">
          {t('timer.selectTask')}
        </p>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64 mb-8">
          {/* SVG for timer display */}
        </div>
        <div className="text-5xl font-bold text-gray-800 dark:text-white">
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>
        <div className="text-gray-500 dark:text-gray-400 capitalize mt-2">
          {t(`timer.${currentMode}`)}
        </div>
      </div>
    </div>
  );
};

export default Timer;
```