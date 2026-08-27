import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

/**
 * Translates educational content into a specified regional language while preserving technical context.
 * @param {string} text - The input text or concept to translate.
 * @param {string} targetLanguage - The full name of the target language (e.g., 'Hindi', 'Marathi').
 * @returns {Promise<string>} The translated context text.
 */
export async function translateEducationalContent(text, targetLanguage) {
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

    return response.text;
  } catch (error) {
    console.error('Translation Service Error:', error);
    throw new Error('Failed to translate content. Please check your API key.');
  }
}