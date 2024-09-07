export const readSessionStorageValue = <T>(key: string): Partial<T> | null => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as Partial<T>) : null;
  } catch (error) {
    console.error('Error reading sessionStorage:', error);
    return null;
  }
};
