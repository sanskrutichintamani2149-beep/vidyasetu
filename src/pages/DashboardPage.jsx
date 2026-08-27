import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../data/languages';
import QuizGenerator from '../components/QuizGenerator';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Target, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Globe,
  UserPlus,
  LogIn,
  Flame,
  Zap,
  GraduationCap
} from 'lucide-react';

export default function DashboardPage() {
  const [activeLang, setActiveLang] = useState('hi');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const userSession = localStorage.getItem('vidyasetu_user');
    setIsAuthenticated(!!userSession);
  }, []);

  // Mock data rendered only for authenticated users with existing data
  const stats = [
    { label: "Lessons Completed", value: "24", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, change: "+4 this week", gradient: "from-emerald-500/10 to-teal-500/5 border-emerald-500/20" },
    { label: "Study Time", value: "18.5 hrs", icon: <Clock className="w-5 h-5 text-brand-500" />, change: "+2.5 hrs vs last week", gradient: "from-brand-500/10 to-blue-500/5 border-brand-500/20" },
    { label: "Vocabulary Growth", value: "320 Words", icon: <Target className="w-5 h-5 text-purple-500" />, change: "92% Accuracy", gradient: "from-purple-500/10 to-pink-500/5 border-purple-500/20" },
    { label: "Streak", value: "7 Days", icon: <Flame className="w-5 h-5 text-amber-500" />, change: "Personal Best!", gradient: "from-amber-500/10 to-orange-500/5 border-amber-500/20" },
  ];

  const recentLessons = [
    { id: 1, title: "Fundamentals of Physics: Motion", category: "Science", progress: 85, lang: "hi" },
    { id: 2, title: "Linear Equations & Algebra", category: "Mathematics", progress: 100, lang: "mr" },
    { id: 3, title: "Cellular Biology Concepts", category: "Biology", progress: 40, lang: "bn" },
  ];

  // ----------------------------------------------------
  // UNAUTHENTICATED / NEW USER STATE
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Aesthetic Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-700 text-white p-8 sm:p-12 shadow-2xl shadow-brand-500/20 border border-white/10">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" /> Welcome to VidyaSetu
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Bridge the Language Barrier in Education
            </h1>
            <p className="text-brand-100 text-sm sm:text-base leading-relaxed">
              Create an account or sign in to start tracking your personalized learning progress, save translated textbooks, and access interactive AI tutors.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-xl bg-white text-brand-700 font-bold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-sm"
              >
                <UserPlus className="w-4 h-4" /> Create Free Account
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all backdrop-blur-md flex items-center gap-2 text-sm"
              >
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Guest Access to AI Tools */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-500" /> Try Interactive AI Tools (Guest Mode)
            </h2>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl shadow-sm">
              <Globe className="w-4 h-4 text-brand-500" />
              <select
                value={activeLang}
                onChange={(e) => setActiveLang(e.target.value)}
                className="bg-transparent font-semibold text-xs text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="dark:bg-slate-900">
                    {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <QuizGenerator defaultTopic="Cellular Biology Concepts" defaultLang={activeLang} />
        </div>

      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED USER STATE
  // ----------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <GraduationCap className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Namaste, Student 👋
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm pl-10">
            Welcome back to your personalized regional learning portal.
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-xl shadow-sm">
          <Globe className="w-4 h-4 text-brand-600 dark:text-brand-400 ml-1" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Dialect:</span>
          <select
            value={activeLang}
            onChange={(e) => setActiveLang(e.target.value)}
            className="bg-transparent font-semibold text-sm focus:outline-none cursor-pointer text-slate-800 dark:text-slate-200"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code} className="dark:bg-slate-900">
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Styled Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className={`bg-gradient-to-br ${stat.gradient} bg-white dark:bg-slate-900 border p-5 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{stat.label}</span>
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">{stat.icon}</div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Active Modules */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" /> Active Learning Modules
            </h2>
            <span className="text-xs text-brand-600 dark:text-brand-400 font-bold cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="space-y-3">
            {recentLessons.map((lesson) => (
              <div 
                key={lesson.id} 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-brand-500/50 transition-all hover:shadow-md"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                      {lesson.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      • Translated to {getLanguageByCode(lesson.lang).name}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">{lesson.title}</h3>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="w-28 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-500 to-indigo-600 h-full rounded-full" style={{ width: `${lesson.progress}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 w-8 text-right">
                    {lesson.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Assistant CTA */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-500" /> AI Workbench
          </h2>

          <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 text-white p-6 rounded-3xl space-y-4 shadow-xl border border-white/10">
            <span className="text-[10px] uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-extrabold">
              Live Translation Engine
            </span>
            <h3 className="text-xl font-black">Ask AI Tutor in {getLanguageByCode(activeLang).nativeName}</h3>
            <p className="text-xs text-brand-100 leading-relaxed">
              Upload textbook pages or paste English notes to receive instant regional explanations with native terminology.
            </p>
            <Link 
              to="/translator"
              className="w-full py-3 bg-white text-brand-800 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              Open AI Assistant <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* AI Quiz Section */}
      <QuizGenerator defaultTopic="Cellular Biology Concepts" defaultLang={activeLang} />

    </div>
  );
}