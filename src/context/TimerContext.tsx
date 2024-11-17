import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { TaskContext } from './TaskContext';

interface TimerContextType {
  timeLeft: number;
  isActive: boolean;
  isPaused: boolean;
  currentMode: 'work' | 'break' | 'longBreak';
  workTime: number;
  breakTime: number;
  longBreakTime: number;
  autoStartNext: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setWorkTime: (time: number) => void;
  setBreakTime: (time: number) => void;
  setLongBreakTime: (time: number) => void;
  setAutoStartNext: (auto: boolean) => void;
}

export const TimerContext = createContext<TimerContextType>({} as TimerContextType);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTask, updateTask } = useContext(TaskContext);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentMode, setCurrentMode] = useState<'work' | 'break' | 'longBreak'>('work');
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [autoStartNext, setAutoStartNext] = useState(false);
  const [workSessionCount, setWorkSessionCount] = useState(0);

  useEffect(() => {
    if (currentTask) {
      setTimeLeft(currentTask.settings.workTime * 60);
    }
  }, [currentTask]);

  const resetTimer = useCallback(() => {
    if (!currentTask) return;
    setTimeLeft(currentTask.settings.workTime * 60);
    setIsActive(false);
    setIsPaused(false);
    setCurrentMode('work');
  }, [currentTask]);

  const startTimer = useCallback(() => {
    if (!currentTask) return;
    
    setIsActive(true);
    setIsPaused(false);
  }, [currentTask]);

  const pauseTimer = () => {
    setIsPaused(true);
  };

  useEffect(() => {
    resetTimer();
  }, [workTime, resetTimer]);

  useEffect(() => {
    if (!currentTask) return;

    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused && updateTask) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time === 0) {
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play();

            if (currentMode === 'work') {
              const timeSpent = currentTask.settings.workTime * 60;
              updateTask(currentTask.id, {
                pomodorosCompleted: currentTask.pomodorosCompleted + 1,
                totalTimeSpent: currentTask.totalTimeSpent + timeSpent
              });

              setWorkSessionCount(prev => prev + 1);
              if (workSessionCount >= 3) {
                setWorkSessionCount(0);
                setCurrentMode('longBreak');
                return currentTask.settings.longBreakTime * 60;
              } else {
                setCurrentMode('break');
                return currentTask.settings.breakTime * 60;
              }
            } else {
              setCurrentMode('work');
              if (autoStartNext) {
                return currentTask.settings.workTime * 60;
              } else {
                setIsActive(false);
                return currentTask.settings.workTime * 60;
              }
            }
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, currentMode, currentTask, updateTask, workSessionCount, autoStartNext]);

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        isActive,
        isPaused,
        currentMode,
        workTime,
        breakTime,
        longBreakTime,
        autoStartNext,
        startTimer,
        pauseTimer,
        resetTimer,
        setWorkTime,
        setBreakTime,
        setLongBreakTime,
        setAutoStartNext,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};