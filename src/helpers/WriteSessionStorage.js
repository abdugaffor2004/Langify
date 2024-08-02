export const writeSessionStorages = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing sessionStorage:', error);
  }
};
