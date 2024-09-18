import { LangKey } from 'google-translate-api-browser/types/LangKey';
import { Reducer } from 'react';

export type TranslationState = {
  query: string;
  translatedText: string;
  source: LangKey;
  detectedSource: string;
  target: LangKey;
};

export interface SetQueryAction {
  type: 'SET_QUERY_ACTION_TYPE';
  payload: string;
}

export interface SetSourceAction {
  type: 'SET_SOURCE_ACTION_TYPE';
  payload: string;
}

export interface SetTargetAction {
  type: 'SET_TARGET_ACTION_TYPE';
  payload: string;
}

export interface SwapLanguagesAction {
  type: 'SWAP_LANGUAGES_ACTION_TYPE';
}

export interface TranslateAction {
  type: 'TRANSLATE_ACTION_TYPE';
  payload: { text: string; language: string };
}

export type TranslationAction =
  | SetQueryAction
  | SetSourceAction
  | SetTargetAction
  | SwapLanguagesAction
  | TranslateAction;

export const INITIAL_TRANSLATION_STATE: TranslationState = {
  query: '',
  translatedText: '',
  source: 'auto',
  detectedSource: '',
  target: 'ru',
};

export const translationReducer: Reducer<TranslationState, TranslationAction> = (
  state = INITIAL_TRANSLATION_STATE,
  action,
) => {
  switch (action.type) {
    case 'SET_QUERY_ACTION_TYPE':
      return { ...state, query: action.payload };

    case 'TRANSLATE_ACTION_TYPE':
      return {
        ...state,
        translatedText: action.payload.text,
        detectedSource:
          state.source === 'auto' && action.payload.language
            ? (action.payload.language as LangKey)
            : state.detectedSource,
      };

    case 'SET_SOURCE_ACTION_TYPE': {
      if (action.payload !== state.target) {
        return { ...state, source: action.payload as LangKey };
      }

      const sourceLang: LangKey = state.source === 'auto' ? 'en' : state.source;
      return {
        ...state,
        source: state.target,
        target: sourceLang,
        query: state.translatedText,
        translatedText: state.query,
      };
    }

    case 'SET_TARGET_ACTION_TYPE': {
      if (action.payload !== state.source) {
        return { ...state, target: action.payload as LangKey };
      }
      return {
        ...state,
        source: state.target,
        target: state.source,
        query: state.translatedText,
        translatedText: state.query,
      };
    }

    case 'SWAP_LANGUAGES_ACTION_TYPE': {
      const sourceLang: LangKey =
        state.source === 'auto' ? (state.detectedSource as LangKey) : state.source;
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
