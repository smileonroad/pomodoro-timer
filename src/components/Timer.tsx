import React, { useEffect, useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import { Play, Pause, RotateCcw } from 'lucide-react';
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

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  const getProgressPercentage = () => {
    if (!currentTask) return 0;
    
    const totalTime = currentMode === 'work' 
      ? currentTask.settings.workTime * 60 
      : currentMode === 'break' 
        ? currentTask.settings.breakTime * 60 
        : currentTask.settings.longBreakTime * 60;
        
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64 mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              className="stroke-current text-gray-200 dark:text-gray-700"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              className="stroke-current text-rose-500"
              strokeWidth="8"
              fill="none"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - getProgressPercentage() / 100)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-5xl font-bold text-gray-800 dark:text-white">
              {formatTime(minutes)}:{formatTime(seconds)}
            </div>
            <div className="text-gray-500 dark:text-gray-400 capitalize mt-2">
              {t(`timer.${currentMode}`)}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {!isActive || isPaused ? (
            <button
              onClick={startTimer}
              className="flex items-center gap-2 px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
            >
              <Play className="w-5 h-5" />
              <span>{t('timer.start')}</span>
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="flex items-center gap-2 px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
            >
              <Pause className="w-5 h-5" />
              <span>{t('timer.pause')}</span>
            </button>
          )}
          
          <button
            onClick={resetTimer}
            className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{t('timer.reset')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;