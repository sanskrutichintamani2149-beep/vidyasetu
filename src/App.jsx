import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import TranslatorPage from './pages/TranslatorPage';
import { Sun, Moon, Monitor, BookOpen, Languages } from 'lucide-react';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-brand-600 dark:text-brand-500">
          <BookOpen className="w-6 h-6" />
          <span>VidyaSetu</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-500 transition-colors">Home</Link>
          <Link to="/translator" className="flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">
            <Languages className="w-4 h-4" /> AI Translator
          </Link>
          <Link to="/login" className="hover:text-brand-600 dark:hover:text-brand-500 transition-colors">Login</Link>
          <Link to="/signup" className="hover:text-brand-600 dark:hover:text-brand-500 transition-colors">Sign Up</Link>
          <Link to="/dashboard" className="px-3 py-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors">Dashboard</Link>
          
          <div className="flex items-center space-x-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg">
            <button onClick={() => setTheme('light')} className={`p-1.5 rounded ${theme === 'light' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}><Sun className="w-4 h-4" /></button>
            <button onClick={() => setTheme('dark')} className={`p-1.5 rounded ${theme === 'dark' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}><Moon className="w-4 h-4" /></button>
            <button onClick={() => setTheme('system')} className={`p-1.5 rounded ${theme === 'system' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}><Monitor className="w-4 h-4" /></button>
          </div>
        </nav>

      </div>
    </header>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/translator" element={<TranslatorPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}