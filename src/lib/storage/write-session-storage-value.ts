import { SessionEntry } from "./read-session-storage-value";

export const writeSessionStorageValue = (key: string, value: SessionEntry): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing sessionStorage:', error);
  }
};
