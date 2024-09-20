export type Language = 'en' | 'ru' | 'zh' | 'es' | 'auto';

export const LANGUAGES: Record<Exclude<Language, 'auto'>, string> = {
  en: 'English',
  ru: 'Russian',
  zh: 'Chinese',
  es: 'Spanish',
};
