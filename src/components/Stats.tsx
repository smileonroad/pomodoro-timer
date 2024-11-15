import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useTranslation } from 'react-i18next';
import { Clock, Calendar, BarChart2 } from 'lucide-react';

const Stats = () => {
  const { t } = useTranslation();
  const { tasks } = useContext(TaskContext);

  const stats = {
    totalPomodoros: tasks.reduce((acc, task) => acc + task.pomodoros, 0),
    totalTime: tasks.reduce((acc, task) => acc + task.pomodoros * 25, 0),
    todayPomodoros: tasks.filter(task => {
      const today = new Date().toDateString();
      return new Date(task.createdAt).toDateString() === today;
    }).reduce((acc, task) => acc + task.pomodoros, 0)
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-3">
        <div className="p-2 bg-rose-100 dark:bg-rose-900 rounded-lg">
          <BarChart2 className="w-6 h-6 text-rose-500" />
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('stats.totalPomodoros')}
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {stats.totalPomodoros}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Clock className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('stats.totalTime')}
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {Math.round(stats.totalTime / 60)}h {stats.totalTime % 60}m
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-3">
        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
          <Calendar className="w-6 h-6 text-green-500" />
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('stats.todayPomodoros')}
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {stats.todayPomodoros}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;