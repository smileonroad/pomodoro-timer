import React, { createContext, useState, useEffect } from 'react';
import { Task } from '../types';

interface TaskContextType {
  tasks: Task[];
  currentTask: Task | null;
  addTask: (title: string) => void;
  setTaskStatus: (id: string, status: Task['status']) => void;
  selectTask: (id: string) => void;
  incrementPomodoro: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('pomodoro-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status: 'pending',
      pomodoros: 0,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const setTaskStatus = (id: string, status: Task['status']) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          status,
          completedAt: status === 'completed' ? new Date() : undefined
        };
      }
      return task;
    }));
  };

  const selectTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setCurrentTask(task);
      if (task.status === 'pending') {
        setTaskStatus(id, 'inProgress');
      }
    }
  };

  const incrementPomodoro = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, pomodoros: task.pomodoros + 1 };
      }
      return task;
    }));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      currentTask,
      addTask,
      setTaskStatus,
      selectTask,
      incrementPomodoro
    }}>
      {children}
    </TaskContext.Provider>
  );
};