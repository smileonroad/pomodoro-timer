import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  const { workTime, breakTime, setWorkTime, setBreakTime } = useContext(TimerContext);

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <SettingsIcon className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Settings</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Work Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={workTime}
            onChange={(e) => setWorkTime(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Break Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={breakTime}
            onChange={(e) => setBreakTime(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;