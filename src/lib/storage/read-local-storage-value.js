export const readLocalStorageValue = key => {
  try {
    const history = localStorage.getItem(key);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to read history from localStorage', error);
    return [];
  }
};
