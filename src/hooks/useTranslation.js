import { useEffect, useReducer } from 'react';
import {
  INITIAL_TRANSLATION_STATE,
  SET_QUERY_ACTION_TYPE,
  SET_SOURCE_ACTION_TYPE,
  SET_TARGET_ACTION_TYPE,
  SWAP_LANGUAGES_ACTION_TYPE,
  TRANSLATE_ACTION_TYPE,
  translationReducer,
} from '../components/Translation/reducer';
import { readSessionStorageValue } from '@mantine/hooks';
import { writeSessionStorageValue } from '../lib/storage';

const SS_TRANSLATION = 'languages';
const createTranslationInitialState = initialState => ({
  ...initialState,
  ...readSessionStorageValue(SS_TRANSLATION),
});

export const useTranslation = () => {
  const [state, dispatch] = useReducer(
    translationReducer,
    INITIAL_TRANSLATION_STATE,
    createTranslationInitialState,
  );

  const handleTranslation = ({ text, iso }) => {
    dispatch({
      type: TRANSLATE_ACTION_TYPE,
      payload: {
        text,
        language: iso,
      },
    });
  };

  const handleInputChange = event => {
    dispatch({ type: SET_QUERY_ACTION_TYPE, payload: event.currentTarget.value });
  };

  const handleSourceChange = value => {
    dispatch({ type: SET_SOURCE_ACTION_TYPE, payload: value });
  };

  const handleTargetChange = value => {
    dispatch({ type: SET_TARGET_ACTION_TYPE, payload: value });
  };

  const handleLangsSwap = () => {
    dispatch({ type: SWAP_LANGUAGES_ACTION_TYPE });
  };

  useEffect(() => {
    writeSessionStorageValue(SS_TRANSLATION, {
      source: state.source,
      target: state.target,
    });
  }, [state.source, state.target]);

  return {
    state,
    handleTranslation,
    handleInputChange,
    handleSourceChange,
    handleTargetChange,
    handleLangsSwap,
  };
};
