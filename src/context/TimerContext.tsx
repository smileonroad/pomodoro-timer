import React, { createContext, useState, useEffect, useCallback } from 'react';

interface TimerContextType {
  timeLeft: number;
  isActive: boolean;
  isPaused: boolean;
  currentMode: 'work' | 'break';
  workTime: number;
  breakTime: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setWorkTime: (time: number) => void;
  setBreakTime: (time: number) => void;
}

export const TimerContext = createContext<TimerContextType>({} as TimerContextType);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentMode, setCurrentMode] = useState<'work' | 'break'>('work');
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const resetTimer = useCallback(() => {
    setTimeLeft(workTime * 60);
    setIsActive(false);
    setIsPaused(false);
    setCurrentMode('work');
  }, [workTime]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  useEffect(() => {
    resetTimer();
  }, [workTime, resetTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time === 0) {
            // Play notification sound
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play();

            // Switch modes
            if (currentMode === 'work') {
              setCurrentMode('break');
              return breakTime * 60;
            } else {
              setCurrentMode('work');
              return workTime * 60;
            }
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, currentMode, workTime, breakTime]);

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        isActive,
        isPaused,
        currentMode,
        workTime,
        breakTime,
        startTimer,
        pauseTimer,
        resetTimer,
        setWorkTime,
        setBreakTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};