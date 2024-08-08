import { useDisclosure, useLocalStorage } from '@mantine/hooks';

const LS_TRANSLATION = 'translations';

export const useTranslateHistoryStorage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [history, setHistory, clearHistory] = useLocalStorage({
    key: LS_TRANSLATION,
    defaultValue: [],
    deserialize: rawHistory => {
      try {
        return JSON.parse(rawHistory).map(historyEntry => ({
          ...historyEntry,
          tranlatedAt: new Date(historyEntry.tranlatedAt),
        }));
      } catch (error) {
        console.error('Error deserializing history:', error);
        return [];
      }
    },
  });

  return {
    opened,
    history,
    open,
    close,
    clearHistory,
    setHistory,
  };
};
