import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useTranslation } from 'react-i18next';
import { Plus, Check, Play } from 'lucide-react';

const TaskList = () => {
  const { t } = useTranslation();
  const { tasks, addTask, selectTask, setTaskStatus } = useContext(TaskContext);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        {t('tasks.title')}
      </h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder={t('tasks.placeholder')}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            {t('tasks.noTasks')}
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTaskStatus(task.id, 'completed')}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${task.status === 'completed'
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-600'
                    }`}
                >
                  {task.status === 'completed' && <Check className="w-3 h-3" />}
                </button>
                <span className={`${
                  task.status === 'completed' ? 'line-through text-gray-500' : ''
                }`}>
                  {task.title}
                </span>
              </div>
              {task.status !== 'completed' && (
                <button
                  onClick={() => selectTask(task.id)}
                  className="text-rose-500 hover:text-rose-600"
                >
                  <Play className="w-5 h-5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;