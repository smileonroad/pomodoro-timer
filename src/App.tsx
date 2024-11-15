import React from 'react';
import { useTranslation } from 'react-i18next';
import Timer from './components/Timer';
import Settings from './components/Settings';
import TaskList from './components/TaskList';
import Stats from './components/Stats';
import LanguageSelector from './components/LanguageSelector';
import { TimerProvider } from './context/TimerContext';
import { TaskProvider } from './context/TaskContext';
import { Bell } from 'lucide-react';
import './i18n';

function App() {
  const { t } = useTranslation();

  return (
    <TimerProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 p-4">
          <LanguageSelector />
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 pt-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bell className="w-8 h-8 text-rose-500" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {t('title')}
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <Timer />
                  <Settings />
                </div>
                <Stats />
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </TaskProvider>
    </TimerProvider>
  );
}

export default App;