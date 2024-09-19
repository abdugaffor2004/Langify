export const LANGUAGES = {
  en: 'English',
  ru: 'Russian',
  zh: 'Chinese',
  es: 'Spanish',
} as const;

export type LanguageKey = keyof typeof LANGUAGES | 'auto';
