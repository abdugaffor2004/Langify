import { useLocalStorage } from '@mantine/hooks';

const LS_TRANSLATION = 'translations';

export interface HistoryEntry {
  query: string;
  translatedText: string;
  translatedAt: Date;
}

export const useTranslateHistoryStorage = () => {
  const [history, setHistory, clearHistory] = useLocalStorage<HistoryEntry[]>({
    key: LS_TRANSLATION,
    defaultValue: [],
    deserialize: (rawHistory: string | undefined): HistoryEntry[] => {
      if (!rawHistory) return [];

      try {
        return JSON.parse(rawHistory).map((historyEntry: HistoryEntry) => ({
          ...historyEntry,
          translatedAt: new Date(historyEntry.translatedAt),
        }));
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
