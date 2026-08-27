import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { 
  BookOpen, 
  Globe2, 
  Sparkles, 
  BarChart3, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Languages 
} from 'lucide-react';

export default function LandingPage() {
  const [selectedLang, setSelectedLang] = useState('hi');

  const features = [
    {
      icon: <Globe2 className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: "12+ Regional Languages",
      description: "Learn in Hindi, Marathi, Bengali, Tamil, Telugu, and more with instant localized interface context."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: "AI-Powered Translation",
      description: "Real-time context-aware translations that preserve technical meaning for complex educational concepts."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: "Personalized Analytics",
      description: "Track progress, accuracy metrics, and vocabulary growth across subjects tailored to your learning pace."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: "Inclusive Access",
      description: "Designed for students in remote regions with low-bandwidth optimization and offline-first capabilities."
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="pt-12 md:pt-20 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Bridging the Educational Language Divide
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Empowering Education in <span className="text-brand-600 dark:text-brand-500">Every Native Language</span>
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          VidyaSetu seamlessly translates, adapts, and delivers personalized academic learning modules in regional Indian languages.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2 transition-all"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Interactive Language Selector Preview */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Languages className="w-5 h-5 text-brand-600 dark:text-brand-500" />
                Select Your Native Language
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Preview how VidyaSetu customizes learning content per region.
              </p>
            </div>

            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full md:w-auto bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-brand-500 outline-none"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800/80">
            <span className="text-xs uppercase tracking-wider text-brand-600 dark:text-brand-500 font-semibold">
              Live Preview Mode
            </span>
            <p className="text-lg font-medium mt-2">
              {SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang)?.nativeName} Interface Active
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              All courses, quizzes, and AI tutor assistance will render in this preferred dialect.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose VidyaSetu?</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Designed specifically for regional medium students across India.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl space-y-3">
              <div className="p-2.5 bg-brand-50 dark:bg-brand-950/50 w-fit rounded-lg">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-brand-600 dark:bg-brand-700 text-white rounded-2xl p-8 md:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to start learning without language barriers?</h2>
          <p className="text-brand-100 max-w-xl mx-auto">
            Join thousands of students learning science, math, and technology in their mother tongue today.
          </p>
          <div>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors shadow-md"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}