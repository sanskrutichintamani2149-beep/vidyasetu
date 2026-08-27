import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../data/languages';
import { 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Loader2, 
  Award,
  BookOpen
} from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export default function QuizGenerator({ defaultTopic = '', defaultLang = 'hi' }) {
  const [topic, setTopic] = useState(defaultTopic);
  const [lang, setLang] = useState(defaultLang);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const generateQuiz = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setQuestions([]);
    setUserAnswers({});
    setSubmitted(false);

    const selectedLangObj = getLanguageByCode(lang);
    const targetLanguageName = selectedLangObj ? selectedLangObj.name : 'Hindi';

    try {
      const prompt = `Generate a 3-question multiple-choice quiz based on the following topic: "${topic}".
Write the questions, options, and explanations in ${targetLanguageName}. Keep technical terms in brackets alongside translations where applicable.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            description: 'List of quiz questions',
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING, description: 'The question in target language' },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Four multiple choice options'
                },
                correctIndex: { type: Type.INTEGER, description: 'Index of correct answer (0-3)' },
                explanation: { type: Type.STRING, description: 'Brief explanation of correct answer' }
              },
              required: ['question', 'options', 'correctIndex', 'explanation']
            }
          }
        }
      });

      const parsedQuestions = JSON.parse(response.text);
      setQuestions(parsedQuestions);
    } catch (err) {
      console.error('Quiz Generation Error:', err);
      setError('Failed to generate quiz. Please verify your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qIdx, optionIdx) => {
    if (submitted) return;
    setUserAnswers({ ...userAnswers, [qIdx]: optionIdx });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 rounded-xl">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">AI Regional Quiz Generator</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Test comprehension with localized assessments</p>
          </div>
        </div>
      </div>

      {/* Generator Controls */}
      <form onSubmit={generateQuiz} className="grid md:grid-cols-3 gap-3">
        <div className="md:col-span-2 relative">
          <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic (e.g., Photosynthesis, Newton's Laws)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-1/2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} className="dark:bg-slate-900">
                {l.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="w-1/2 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-brand-600/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Generate
          </button>
        </div>
      </form>

      {error && (
        <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 p-3 rounded-xl border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      {/* Quiz Content */}
      {questions.length > 0 && (
        <div className="space-y-6 pt-2">
          {questions.map((q, qIdx) => (
            <div key={qIdx} className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl space-y-3 border border-slate-200/60 dark:border-slate-800">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                {qIdx + 1}. {q.question}
              </h3>

              <div className="grid sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[qIdx] === optIdx;
                  const isCorrect = q.correctIndex === optIdx;

                  let style = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300";
                  if (isSelected) style = "border-brand-600 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold";
                  
                  if (submitted) {
                    if (isCorrect) style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold";
                    else if (isSelected && !isCorrect) style = "border-red-500 bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`p-3 rounded-xl border text-xs text-left transition-all flex items-start justify-between gap-2 ${style}`}
                    >
                      <span>{opt}</span>
                      {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 mt-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Explanation:</span> {q.explanation}
                </p>
              )}
            </div>
          ))}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            {!submitted ? (
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(userAnswers).length < questions.length}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold rounded-xl text-xs transition-all shadow-sm"
              >
                Submit Answers
              </button>
            ) : (
              <div className="w-full flex items-center justify-between bg-brand-50 dark:bg-brand-950/50 p-3 rounded-xl border border-brand-200 dark:border-brand-800">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-700 dark:text-brand-300">
                  <Award className="w-4 h-4" /> Score: {calculateScore()} / {questions.length}
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setUserAnswers({});
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}