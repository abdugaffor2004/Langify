export interface SessionEntry {
  source: string;
  target: string;
}

export const readSessionStorageValue = (key: string): SessionEntry | null => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading sessionStorage:', error);
    return null;
  }
};
