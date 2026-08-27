import React, { useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../data/languages';
import { translateEducationalContent } from '../services/translationService';
import { 
  Languages, 
  Sparkles, 
  Copy, 
  Check, 
  Loader2, 
  BookOpenText, 
  AlertCircle,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function TranslatorPage() {
  const [inputText, setInputText] = useState('');
  const [targetLang, setTargetLang] = useState('hi');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Map app language codes to browser BCP-47 speech tags
  const speechLangMap = {
    hi: 'hi-IN',
    mr: 'mr-IN',
    bn: 'bn-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    kn: 'kn-IN',
    ml: 'ml-IN',
    gu: 'gu-IN',
    pa: 'pa-IN',
    or: 'or-IN',
    as: 'as-IN',
    ur: 'ur-IN'
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTranslate = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }

    setIsLoading(true);
    setError(null);
    setTranslatedText('');

    try {
      const selectedLanguageObj = getLanguageByCode(targetLang);
      const result = await translateEducationalContent(
        inputText,
        selectedLanguageObj ? selectedLanguageObj.name : 'Hindi'
      );
      setTranslatedText(result);
    } catch (err) {
      setError(err.message || 'An error occurred during translation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextToSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = speechLangMap[targetLang] || 'hi-IN';
    utterance.rate = 0.9; // Slightly slower speed for clearer educational delivery

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Context-Aware Dialect Translation
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          AI Educational Translator & Voice Assistant
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Translate textbooks or concepts into regional languages and listen to clear native audio pronunciations.
        </p>
      </div>

      {/* Main Translation Workbench */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Source Input Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <BookOpenText className="w-4 h-4 text-brand-600 dark:text-brand-400" /> English Source
              </span>
            </div>

            <textarea
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste English notes, questions, or educational concepts here..."
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-medium shadow-md shadow-brand-600/20 flex items-center justify-center gap-2 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Translating with Gemini...
                </>
              ) : (
                <>
                  <Languages className="w-4 h-4" /> Translate Concept
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Regional Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Target:</span>
                <select
                  value={targetLang}
                  onChange={(e) => {
                    setTargetLang(e.target.value);
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    setIsPlaying(false);
                  }}
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold outline-none cursor-pointer"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="dark:bg-slate-900">
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </select>
              </div>

              {translatedText && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleTextToSpeech}
                    className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium ${
                      isPlaying 
                        ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                    title={isPlaying ? "Stop Audio" : "Listen to Translation"}
                  >
                    {isPlaying ? <VolumeX className="w-4 h-4 text-amber-600 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
                    title="Copy Translation"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>

            <div className="min-h-[200px] bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm leading-relaxed overflow-y-auto">
              {error ? (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs mt-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                </div>
              ) : translatedText ? (
                <p className="whitespace-pre-wrap font-medium text-slate-800 dark:text-slate-100">{translatedText}</p>
              ) : (
                <span className="text-slate-400 text-xs italic">
                  Translated content will render here in {getLanguageByCode(targetLang)?.nativeName || 'your regional dialect'}...
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}