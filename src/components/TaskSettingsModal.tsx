import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Task, TaskSettings } from '../types';

interface Props {
  task: Task;
  onClose: () => void;
  onSave: (taskId: string, settings: TaskSettings) => void;
}

const TaskSettingsModal: React.FC<Props> = ({ task, onClose, onSave }) => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<TaskSettings>(task.settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(task.id, settings);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          {t('tasks.settings')}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('settings.workDuration')}
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={settings.workTime}
              onChange={(e) => setSettings({ ...settings, workTime: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('settings.breakDuration')}
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={settings.breakTime}
              onChange={(e) => setSettings({ ...settings, breakTime: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('settings.longBreakDuration')}
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={settings.longBreakTime}
              onChange={(e) => setSettings({ ...settings, longBreakTime: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoStart"
              checked={settings.autoStartNext}
              onChange={(e) => setSettings({ ...settings, autoStartNext: e.target.checked })}
              className="h-4 w-4 text-rose-500 focus:ring-rose-500 border-gray-300 rounded"
            />
            <label htmlFor="autoStart" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {t('settings.autoStartNext')}
            </label>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskSettingsModal;
