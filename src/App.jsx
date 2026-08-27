import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SUPPORTED_LANGUAGES } from './data/languages';
import { Sun, Moon, Monitor, Globe, CheckCircle2 } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2 bg-slate-200 dark:bg-slate-800 p-1.5 rounded-lg w-fit">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md transition-all ${
          theme === 'light' ? 'bg-white dark:bg-slate-700 text-brand-600 shadow-sm' : 'text-slate-500'
        }`}
        title="Light Mode"
      >
        <Sun className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md transition-all ${
          theme === 'dark' ? 'bg-white dark:bg-slate-700 text-brand-500 shadow-sm' : 'text-slate-500'
        }`}
        title="Dark Mode"
      >
        <Moon className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-md transition-all ${
          theme === 'system' ? 'bg-white dark:bg-slate-700 text-brand-600 shadow-sm' : 'text-slate-500'
        }`}
        title="System Preference"
      >
        <Monitor className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-8 transition-colors duration-200">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-brand-600 dark:text-brand-500 flex items-center gap-2">
                VidyaSetu <span className="text-xs bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-500 px-2.5 py-0.5 rounded-full">Phase 3</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                UI Foundation & Dark/Light Mode System
              </p>
            </div>
            <ThemeToggle />
          </div>

          {/* Verification Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Tailwind CSS Working</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Custom brand colors, borders, dark mode classes, and responsive grids are actively functioning.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-500 font-semibold">
                <Globe className="w-5 h-5" />
                <span>Language System Loaded</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {SUPPORTED_LANGUAGES.length} supported languages initialized from single source configuration.
              </p>
            </div>
          </div>

          {/* Language Grid Preview */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Supported Languages Registry</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <div
                  key={lang.code}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center"
                >
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{lang.nativeName}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </ThemeProvider>
  );
}