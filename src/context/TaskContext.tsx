import React, { createContext, useState, useEffect } from 'react';
import { Task } from '../types';

const TASKS_STORAGE_KEY = 'pomodoro_tasks';
const CURRENT_TASK_STORAGE_KEY = 'pomodoro_current_task';

interface TaskSettings {
  workTime: number;
  breakTime: number;
  longBreakTime: number;
  autoStartNext: boolean;
}

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'inProgress' | 'completed';
  settings: TaskSettings;
  pomodorosCompleted: number;
  totalTimeSpent: number;
}

interface TaskContextType {
  tasks: Task[];
  currentTask: Task | null;
  addTask: (title: string, settings: TaskSettings) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  selectTask: (task: Task | null) => void;
  clearTasks: () => void;
}

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [currentTask, setCurrentTask] = useState<Task | null>(() => {
    const savedCurrentTask = localStorage.getItem(CURRENT_TASK_STORAGE_KEY);
    return savedCurrentTask ? JSON.parse(savedCurrentTask) : null;
  });

  // 保存任务到 localStorage
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // 保存当前任务到 localStorage
  useEffect(() => {
    localStorage.setItem(CURRENT_TASK_STORAGE_KEY, JSON.stringify(currentTask));
  }, [currentTask]);

  const defaultSettings: TaskSettings = {
    workTime: 25,
    breakTime: 5,
    longBreakTime: 15,
    autoStartNext: false
  };

  const addTask = (title: string, settings: TaskSettings = defaultSettings) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status: 'pending',
      settings,
      pomodorosCompleted: 0,
      totalTimeSpent: 0
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, ...updates };
        // 如果更新的是当前任务，同时更新 currentTask
        if (currentTask?.id === id) {
          setCurrentTask(updatedTask);
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (currentTask?.id === id) {
      setCurrentTask(null);
    }
  };

  const selectTask = (task: Task | null) => {
    setCurrentTask(task);
  };

  const clearTasks = () => {
    setTasks([]);
    setCurrentTask(null);
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      currentTask,
      addTask,
      updateTask,
      deleteTask,
      selectTask,
      clearTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};