import { useEffect, useReducer } from 'react';
import {
  INITIAL_TRANSLATION_STATE,
  SET_QUERY_ACTION_TYPE,
  SET_SOURCE_ACTION_TYPE,
  SET_TARGET_ACTION_TYPE,
  SWAP_LANGUAGES_ACTION_TYPE,
  TRANSLATE_ACTION_TYPE,
  translationReducer,
} from './reducer.ts';
import { readSessionStorageValue, writeSessionStorageValue } from '../../lib/storage';
import { InitialTranslationStateType } from './reducer.ts';

const SS_TRANSLATION = 'languages';
const createTranslationInitialState = (
  initialState: InitialTranslationStateType,
): InitialTranslationStateType => {
  return {
    ...initialState,
    ...readSessionStorageValue<InitialTranslationStateType>(SS_TRANSLATION),
  };
};

export const useTranslation = () => {
  const [{ query, translatedText, target, source, detectedSource }, dispatch] = useReducer(
    translationReducer,
    INITIAL_TRANSLATION_STATE,
    createTranslationInitialState,
  );

  const trimmedQuery = query?.trim();
  const translate = (text: string, iso: string) => {
    dispatch({
      type: TRANSLATE_ACTION_TYPE,
      payload: {
        text,
        language: iso,
      },
    });
  };

  const setQuery = (value: string) => {
    dispatch({ type: SET_QUERY_ACTION_TYPE, payload: value });
  };

  const setSource = (value: string | null) => {
    dispatch({ type: SET_SOURCE_ACTION_TYPE, payload: value! });
  };

  const setTarget = (value: string | null) => {
    dispatch({ type: SET_TARGET_ACTION_TYPE, payload: value! });
  };

  const swapLanguages = () => {
    dispatch({ type: SWAP_LANGUAGES_ACTION_TYPE });
  };

  useEffect(() => {
    writeSessionStorageValue<InitialTranslationStateType>(SS_TRANSLATION, {
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
