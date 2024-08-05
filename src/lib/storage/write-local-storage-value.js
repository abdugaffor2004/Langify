import { readLocalStorageValue } from './read-local-storage-value';

export const writeLocalStorageValue = (key, value) => {
  try {
    const history = readLocalStorageValue(key);
    const isDuplicate = history.some(
      item => item.query === value.query && item.translatedText === value.translatedText,
    );

    if (!isDuplicate) {
      history.push(value);
      localStorage.setItem(key, JSON.stringify(history));
    }
  } catch (error) {
    console.error('Failed to write history to localStorage', error);
  }
};
