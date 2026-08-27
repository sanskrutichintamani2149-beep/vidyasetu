import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../data/languages';
import QuizGenerator from '../components/QuizGenerator';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Target, 
  Sparkles, 
  ArrowUpRight, 
  BarChart2, 
  CheckCircle2, 
  Globe 
} from 'lucide-react';

export default function DashboardPage() {
  const [activeLang, setActiveLang] = useState('hi');

  const stats = [
    { label: "Lessons Completed", value: "24", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, change: "+4 this week" },
    { label: "Study Time", value: "18.5 hrs", icon: <Clock className="w-5 h-5 text-brand-500" />, change: "+2.5 hrs vs last week" },
    { label: "Vocabulary Growth", value: "320 Words", icon: <Target className="w-5 h-5 text-purple-500" />, change: "92% Accuracy" },
    { label: "Streak", value: "7 Days", icon: <Trophy className="w-5 h-5 text-amber-500" />, change: "Personal Best!" },
  ];

  const recentLessons = [
    { id: 1, title: "Fundamentals of Physics: Motion", category: "Science", progress: 85, lang: "hi", status: "In Progress" },
    { id: 2, title: "Linear Equations & Algebra", category: "Mathematics", progress: 100, lang: "mr", status: "Completed" },
    { id: 3, title: "Cellular Biology Concepts", category: "Biology", progress: 40, lang: "bn", status: "In Progress" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Namaste, Sanskruti 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Welcome back to your personalized regional learning portal.
          </p>
        </div>

        {/* Active Learning Language Switcher */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-xl shadow-sm">
          <Globe className="w-4 h-4 text-brand-600 dark:text-brand-400 ml-1" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Dialect:</span>
          <select
            value={activeLang}
            onChange={(e) => setActiveLang(e.target.value)}
            className="bg-transparent font-medium text-sm focus:outline-none cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code} className="dark:bg-slate-900">
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</span>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">{stat.icon}</div>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Active Courses Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-500" />
              Active Learning Modules
            </h2>
            <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="space-y-3">
            {recentLessons.map((lesson) => (
              <div key={lesson.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-brand-500/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
                      {lesson.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      • Translated to {getLanguageByCode(lesson.lang).name}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">{lesson.title}</h3>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="w-28 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-brand-600 h-full rounded-full" style={{ width: `${lesson.progress}%` }}></div>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 w-8 text-right">
                    {lesson.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant Quick Launcher */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-500" />
            AI Language Tools
          </h2>

          <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white p-6 rounded-2xl space-y-4 shadow-lg">
            <span className="text-xs uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-md font-semibold">
              Live Translation Engine
            </span>
            <h3 className="text-xl font-bold">Ask AI Tutor in {getLanguageByCode(activeLang).nativeName}</h3>
            <p className="text-sm text-brand-100 leading-relaxed">
              Upload textbook pages or paste English notes to receive instant regional explanations with native terminology.
            </p>
            <button className="w-full py-2.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors shadow flex items-center justify-center gap-2 text-sm">
              Open AI Assistant <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* AI Regional Quiz Generator Section */}
      <QuizGenerator defaultTopic="Cellular Biology Concepts" defaultLang={activeLang} />

    </div>
  );
}