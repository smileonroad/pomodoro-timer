import React, { useEffect, useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Timer = () => {
  const {
    timeLeft,
    isActive,
    isPaused,
    currentMode,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useContext(TimerContext);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  const getProgressPercentage = () => {
    const { workTime, breakTime } = useContext(TimerContext);
    const totalTime = currentMode === 'work' ? workTime * 60 : breakTime * 60;
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
              {currentMode} Time
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {!isActive || isPaused ? (
            <button
              onClick={startTimer}
              className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
            >
              <Play className="w-5 h-5" />
              {isPaused ? 'Resume' : 'Start'}
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
            >
              <Pause className="w-5 h-5" />
              Pause
            </button>
          )}
          <button
            onClick={resetTimer}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;