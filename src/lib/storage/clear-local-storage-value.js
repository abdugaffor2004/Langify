export const clearLocalStorageValue = key => {
    try {
      localStorage.removeItem(key);
      return true
    } catch (error) {
      console.error('Failed to clear localStorage', error);
    }
  };