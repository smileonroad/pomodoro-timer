export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'inProgress' | 'completed';
  pomodoros: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface TimerStats {
  totalPomodoros: number;
  totalMinutes: number;
  todayPomodoros: number;
}