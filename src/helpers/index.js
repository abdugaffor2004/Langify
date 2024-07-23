import { LANGUAGES } from '../data/languages';

export const getNextLanguage = currentLang => {
  const languageKeys = Object.keys(LANGUAGES);
  const currentIndex = languageKeys.indexOf(currentLang);
  const nextIndex = currentIndex === 0 ? languageKeys.length - 1 : currentIndex - 1;
  return languageKeys[nextIndex];
};
