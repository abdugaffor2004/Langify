export const readSessionStorageValue = key => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading sessionStorage:', error);
    return null;
  }
};
