import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const CACHE_KEY_PREFIX = 'vidyasetu_trans_cache_v1_';

/**
 * Generates a normalized cache key for storage lookup
 */
function getCacheKey(text, targetLanguage) {
  const normalizedText = text.trim().toLowerCase();
  const normalizedLang = targetLanguage.trim().toLowerCase();
  return `${CACHE_KEY_PREFIX}${normalizedLang}_${normalizedText}`;
}

/**
 * Translates educational content into a specified regional language while preserving technical context.
 * Utilizes LocalStorage caching to minimize redundant API requests.
 * @param {string} text - The input text or concept to translate.
 * @param {string} targetLanguage - The full name of the target language (e.g., 'Hindi', 'Marathi').
 * @returns {Promise<string>} The translated content.
 */
export async function translateEducationalContent(text, targetLanguage) {
  if (!text || !text.trim()) return '';

  const cacheKey = getCacheKey(text, targetLanguage);

  // 1. Check LocalStorage Cache
  try {
    const cachedResponse = localStorage.getItem(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
  } catch (e) {
    console.warn('LocalStorage access warning:', e);
  }

  // 2. Fallback to Gemini API call if not cached
  try {
    const prompt = `You are an expert educational translator for Indian regional languages.
Translate the following academic content into ${targetLanguage}.
Guidelines:
1. Retain technical terms in English inside brackets alongside regional translation where helpful (e.g., "प्रकाश संश्लेषण (Photosynthesis)").
2. Keep the explanation natural, accurate, and suitable for students.

Content to translate:
"${text}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const translatedText = response.text;

    // 3. Save result to LocalStorage
    try {
      localStorage.setItem(cacheKey, translatedText);
    } catch (e) {
      console.warn('LocalStorage quota exceeded or unavailable:', e);
    }

    return translatedText;
  } catch (error) {
    console.error('Translation Service Error:', error);
    throw new Error('Failed to translate content. Please check your API key.');
  }
}

/**
 * Utility function to clear cached translations from browser storage
 */
export function clearTranslationCache() {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(CACHE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (e) {
    console.error('Error clearing translation cache:', e);
  }
}