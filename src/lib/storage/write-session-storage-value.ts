export const writeSessionStorageValue = <T>(key: string, value: Partial<T>): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing sessionStorage:', error);
  }
};
