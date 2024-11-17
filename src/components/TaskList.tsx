import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useTranslation } from 'react-i18next';
import { Plus, Check, Play, Settings, Trash2 } from 'lucide-react';
import TaskSettingsModal from './TaskSettingsModal';
import { Task, TaskSettings } from '../types';

const TaskList = () => {
  const { t } = useTranslation();
  const { tasks, addTask, updateTask, deleteTask, currentTask, selectTask, clearTasks } = useContext(TaskContext);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const handleTaskClick = (task: Task) => {
    selectTask(task.id === currentTask?.id ? null : task);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTaskSettings = (taskId: string, settings: TaskSettings) => {
    updateTask(taskId, { settings });
    setEditingTask(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>{t('tasks.title')}</span>
        </h2>
        {tasks.length > 0 && (
          <button
            onClick={clearTasks}
            className="px-3 py-1 text-sm text-rose-500 hover:text-rose-600 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('tasks.clearAll')}</span>
          </button>
        )}
      </div>
      
      <form onSubmit={handleAddTask} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder={t('tasks.placeholder')}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
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
              className={`flex items-center justify-between p-3 rounded-lg border ${
                task.id === currentTask?.id
                  ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => handleTaskClick(task)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <Play className={`w-4 h-4 ${
                    task.id === currentTask?.id ? 'text-rose-500' : 'text-gray-400'
                  }`} />
                </button>
                <span className="text-gray-800 dark:text-gray-200">{task.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditTask(task)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingTask && (
        <TaskSettingsModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleUpdateTaskSettings}
        />
      )}
    </div>
  );
};

export default TaskList;