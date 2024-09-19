import { useEffect, useReducer } from 'react';
import { INITIAL_TRANSLATION_STATE, translationReducer, TranslationState } from './reducer.ts';
import { readSessionStorageValue, writeSessionStorageValue } from '../../lib/storage';
import { LanguageKey } from 'src/data/languages.ts';

interface SessionEntry {
  source: LanguageKey;
  target: LanguageKey;
}

const SS_TRANSLATION = 'languages';
const createTranslationInitialState = (initialState: TranslationState): TranslationState => ({
  ...initialState,
  ...readSessionStorageValue<SessionEntry>(SS_TRANSLATION),
});

export const useTranslation = () => {
  const [{ query, translatedText, target, source, detectedSource }, dispatch] = useReducer(
    translationReducer,
    INITIAL_TRANSLATION_STATE,
    createTranslationInitialState,
  );

  const trimmedQuery = query?.trim();
  const translate = (text: string, iso: string) => {
    dispatch({
      type: 'TRANSLATE_ACTION_TYPE',
      payload: {
        text,
        language: iso,
      },
    });
  };

  const setQuery = (value: string) => {
    dispatch({ type: 'SET_QUERY_ACTION_TYPE', payload: value });
  };

  const setSource = (value: string | null) => {
    dispatch({ type: 'SET_SOURCE_ACTION_TYPE', payload: value! });
  };

  const setTarget = (value: string | null) => {
    dispatch({ type: 'SET_TARGET_ACTION_TYPE', payload: value! });
  };

  const swapLanguages = () => {
    dispatch({ type: 'SWAP_LANGUAGES_ACTION_TYPE' });
  };

  useEffect(() => {
    writeSessionStorageValue<SessionEntry>(SS_TRANSLATION, {
      source,
      target,
    });
  }, [source, target]);

  return {
    query,
    trimmedQuery,
    translatedText,
    target,
    source,
    detectedSource,
    translate,
    setQuery,
    setSource,
    setTarget,
    swapLanguages,
  };
};
