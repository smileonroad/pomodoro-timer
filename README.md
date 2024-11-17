# Pomodoro Timer

[English](./README.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja.md)

A beautiful and feature-rich Pomodoro Timer web application built with React, TypeScript, and Tailwind CSS.

## Features

- 🎯 Focus Timer
  - Select task to start focus timer
  - Timer controls including start, pause, and reset
  - Auto-start next session option
  
- 🎯 Timer Settings
  - Customizable work duration (default: 25 minutes)
  - Short break duration (default: 5 minutes)
  - Long break duration (default: 15 minutes)

- 📝 Task Management
  - Create, edit and delete tasks
  - Configure pomodoro settings for each task
  
- 📊 Statistics
  - Daily/Weekly/Monthly/Per-task focus time tracking
  - Completed tasks history
  - Productivity trend analysis

- 🌍 Internationalization
  - English (en)
  - Chinese (zh)
  - Japanese (ja)

- 🎨 Beautiful UI with Dark Mode
  - Clean and modern interface design
  - Light/Dark theme switch
  - Smooth animations

- 📱 Responsive Design
  - Works on desktop, tablet and mobile
  - Progressive Web App (PWA) support

- 🔔 Notifications
  - Customizable sound alerts
  - Browser notifications
  - Session completion alerts

## Live Demo

Visit the application: [Pomodoro Timer](https://gleeful-marigold-65f08c.netlify.app)

## Tech Stack

- React 18
- TypeScript 5
- Tailwind CSS
- Vite
- Major libraries:
  - i18next - Internationalization
  - date-fns - Date formatting
  - Lucide Icons - Icon library
  - [Other major libraries]

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/smileonroad/pomodoro-timer.git
   cd pomodoro-timer
   npm install
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Code Structure and Technical Explanation

### Project Structure

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

### Key Files and Directories

- **App.tsx**: The main component of the application, responsible for rendering the overall structure, including the timer, task list, and statistics.
- **components/**: Contains all UI components, such as the timer, task list, and statistics.
- **context/**: Contains React contexts for managing application state, such as tasks and timer state.
- **i18n/**: Contains internationalization-related files to support multiple languages.
- **types/**: Defines TypeScript interfaces to ensure type safety.

### Key Technologies

#### React

React is a JavaScript library for building user interfaces. We use React's component-based architecture to break the application into reusable components.

- **Components**: Each component is responsible for rendering a specific part of the UI. For example, the `Timer` component displays the timer, while the `TaskList` component shows the list of tasks.

#### TypeScript

TypeScript is a superset of JavaScript that adds static types. We use TypeScript in the project to improve code maintainability and readability.

- **Type Definitions**: In `types/task.ts`, we define the `Task` and `TaskSettings` interfaces to ensure a consistent structure for task objects.

#### i18next

i18next is an internationalization framework that supports multiple languages. We use it to manage language switching in the application.

- **Language Files**: In the `i18n/locales/` directory, we have `en.json`, `ja.json`, and `zh.json` files that store text content in different languages.

### State Management

We use React's Context API to manage the application's state, particularly for tasks and timer states.

- **TaskContext**: Manages the state of tasks, including adding, updating, and deleting tasks.
- **TimerContext**: Manages the state of the timer, including starting, pausing, and resetting the timer.

### Component Example

Here is an example of the `Timer.tsx` component, demonstrating how to use context and internationalization:

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
