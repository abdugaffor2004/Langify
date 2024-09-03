import { useLocalStorage } from '@mantine/hooks';

const LS_TRANSLATION = 'translations';

interface IHistoryEntry {
  query: string;
  translatedText: string;
  translatedAt: Date;
}

export const useTranslateHistoryStorage = () => {
  const [history, setHistory, clearHistory] = useLocalStorage<IHistoryEntry[]>({
    key: LS_TRANSLATION,
    defaultValue: [],
    deserialize: (rawHistory: string | undefined): Array<IHistoryEntry> => {
      if (!rawHistory) return [];

      try {
        return JSON.parse(rawHistory).map(
          (historyEntry: Omit<IHistoryEntry, 'translatedAt'> & { translatedAt: string }) => ({
            ...historyEntry,
            translatedAt: new Date(historyEntry.translatedAt),
          }),
        );
      } catch (error) {
        console.error('Error deserializing history:', error);
        return [];
      }
    },
  });

  return {
    history,
    clearHistory,
    setHistory,
  };
};
