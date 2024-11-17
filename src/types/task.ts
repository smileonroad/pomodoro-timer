export interface TaskSettings {
  workTime: number;
  breakTime: number;
  longBreakTime: number;
  autoStartNext: boolean;
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'inProgress' | 'completed';
  settings: TaskSettings;
  pomodorosCompleted: number;
  totalTimeSpent: number;
} 