import { Reducer } from 'react';

export const SET_QUERY_ACTION_TYPE = 'SET_QUERY_ACTION_TYPE';
export const TRANSLATE_ACTION_TYPE = 'SET_TRANSLATED_TEXT_ACTION_TYPE';
export const SET_SOURCE_ACTION_TYPE = 'SET_SOURCE_ACTION_TYPE';
export const SET_TARGET_ACTION_TYPE = 'SET_TARGET_ACTION_TYPE';
export const SWAP_LANGUAGES_ACTION_TYPE = 'SWAP_LANGUAGES_ACTION_TYPE';
export const TEST_ACTION = 'TEST_ACTION';

export type InitialTranslationStateType = {
  query: string;
  translatedText: string;
  source: string;
  detectedSource: string;
  target: string;
};

export type TranslationActionType =
  | { type: typeof SET_QUERY_ACTION_TYPE; payload: string }
  | { type: typeof SET_SOURCE_ACTION_TYPE; payload: string }
  | { type: typeof SET_TARGET_ACTION_TYPE; payload: string }
  | { type: typeof SWAP_LANGUAGES_ACTION_TYPE }
  | { type: typeof SET_SOURCE_ACTION_TYPE; payload: string }
  | { type: typeof TRANSLATE_ACTION_TYPE; payload: { text: string; language: string } }
  | { type: typeof TEST_ACTION };

export const INITIAL_TRANSLATION_STATE: InitialTranslationStateType = {
  query: '',
  translatedText: '',
  source: 'auto',
  detectedSource: '',
  target: 'ru',
};

export const translationReducer: Reducer<InitialTranslationStateType, TranslationActionType> = (
  state = INITIAL_TRANSLATION_STATE,
  action,
) => {
  switch (action.type) {
    case SET_QUERY_ACTION_TYPE:
      return { ...state, query: action.payload };

    case TRANSLATE_ACTION_TYPE:
      return {
        ...state,
        translatedText: action.payload.text,
        detectedSource:
          state.source === 'auto' && action.payload.language
            ? action.payload.language
            : state.detectedSource,
      };

    case SET_SOURCE_ACTION_TYPE: {
      if (action.payload !== state.target) {
        return { ...state, source: action.payload };
      }

      const sourceLang = state.source === 'auto' ? 'en' : state.source;
      return {
        ...state,
        source: state.target,
        target: sourceLang,
        query: state.translatedText,
        translatedText: state.query,
      };
    }

    case SET_TARGET_ACTION_TYPE: {
      if (action.payload !== state.source) {
        return { ...state, target: action.payload };
      }
      return {
        ...state,
        source: state.target,
        target: state.source,
        query: state.translatedText,
        translatedText: state.query,
      };
    }

    case SWAP_LANGUAGES_ACTION_TYPE: {
      const sourceLang = state.source === 'auto' ? state.detectedSource : state.source;
      return {
        ...state,
        source: state.target,
        target: sourceLang,
        query: state.translatedText,
        translatedText: state.query,
      };
    }

    default:
      return state;
  }
};
