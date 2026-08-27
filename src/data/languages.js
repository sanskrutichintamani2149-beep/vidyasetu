/**
 * Centralized Language Configuration for VidyaSetu
 * Serves as the single source of truth for all application components.
 */

export const SUPPORTED_LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    region: 'Global',
    enabled: true,
    supportsSpeech: true,
    supportsTTS: true,
    supportsTranslation: true,
    direction: 'ltr',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    region: 'India',
    enabled: true,
    supportsSpeech: true,
    supportsTTS: true,
    supportsTranslation: true,
    direction: 'ltr',
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    region: 'India (Maharashtra)',
    enabled: true,
    supportsSpeech: true,
    supportsTTS: true,
    supportsTranslation: true,
    direction: 'ltr',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    region: 'India (West Bengal)',
    enabled: true,
    supportsSpeech: true,
    supportsTTS: true,
    supportsTranslation: true,
    direction: 'ltr',
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    region: 'India (Tamil Nadu)',
    enabled: true,
    supportsSpeech: true,
    supportsTTS: true,
    supportsTranslation: true,
    direction: 'ltr',
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    region: 'India (Andhra Pradesh / Telangana)',
    enabled: true,
    supportsSpeech: true,
    supportsTTS: true,
    supportsTranslation: true,
    direction: 'ltr',
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    region: 'India (Karnataka)',
    enabled: true,
    supportsSpeech: true,
    supportsTTS: true,
    supportsTranslation: true,
    direction: 'ltr',
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    region: 'India (Gujarat)',
    enabled: true,
    supportsSpeech: true,
    supportsTTS: true,
    supportsTranslation: true,
    direction: 'ltr',
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    region: 'India (Kerala)',
    enabled: true,
    supportsSpeech: true,
    supportsTTS: true,
    supportsTranslation: true,
    direction: 'ltr',
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    region: 'India (Punjab)',
    enabled: true,
    supportsSpeech: true,
    supportsTTS: true,
    supportsTranslation: true,
    direction: 'ltr',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    region: 'Global',
    enabled: true,
    supportsSpeech: true,
    supportsTTS: true,
    supportsTranslation: true,
    direction: 'ltr',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    region: 'Global',
    enabled: true,
    supportsSpeech: true,
    supportsTTS: true,
    supportsTranslation: true,
    direction: 'ltr',
  },
];

export const DEFAULT_LANGUAGE = 'en';
export const DEFAULT_MOTHER_TONGUE = 'hi';

/**
 * Helper utilities for language lookups
 */
export const getLanguageByCode = (code) => {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code) || SUPPORTED_LANGUAGES[0];
};

export const getEnabledLanguages = () => {
  return SUPPORTED_LANGUAGES.filter((lang) => lang.enabled);
};