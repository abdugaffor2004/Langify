import { useEffect, useReducer } from 'react';
import {
  INITIAL_TRANSLATION_STATE,
  SET_QUERY_ACTION_TYPE,
  SET_SOURCE_ACTION_TYPE,
  SET_TARGET_ACTION_TYPE,
  SWAP_LANGUAGES_ACTION_TYPE,
  TRANSLATE_ACTION_TYPE,
  translationReducer,
} from './reducer';
import { readSessionStorageValue, writeSessionStorageValue } from '../../lib/storage';

const SS_TRANSLATION = 'languages';
const createTranslationInitialState = initialState => ({
  ...initialState,
  ...readSessionStorageValue(SS_TRANSLATION),
});

export const useTranslation = () => {
  const [{ query, translatedText, target, source, detectedSource }, dispatch] = useReducer(
    translationReducer,
    INITIAL_TRANSLATION_STATE,
    createTranslationInitialState,
  );

  const translate = (text, iso) => {
    dispatch({
      type: TRANSLATE_ACTION_TYPE,
      payload: {
        text,
        language: iso,
      },
    });
  };

  const setInput = event => {
    dispatch({ type: SET_QUERY_ACTION_TYPE, payload: event.currentTarget.value });
  };

  const setSource = value => {
    dispatch({ type: SET_SOURCE_ACTION_TYPE, payload: value });
  };

  const setTarget = value => {
    dispatch({ type: SET_TARGET_ACTION_TYPE, payload: value });
  };

  const swapLanguages = () => {
    dispatch({ type: SWAP_LANGUAGES_ACTION_TYPE });
  };

  useEffect(() => {
    writeSessionStorageValue(SS_TRANSLATION, {
      source,
      target,
    });
  }, [source, target]);

  return {
    query,
    translatedText,
    target,
    source,
    detectedSource,
    translate,
    setInput,
    setSource,
    setTarget,
    swapLanguages,
  };
};
