import { getNextLanguage } from '../../helpers';

export const SET_QUERY_ACTION_TYPE = 'SET_QUERY_ACTION_TYPE';
export const SET_TRANSLATED_TEXT_ACTION_TYPE = 'SET_TRANSLATED_TEXT_ACTION_TYPE';
export const SET_SOURCE_ACTION_TYPE = 'SET_SOURCE_ACTION_TYPE';
export const SET_TARGET_ACTION_TYPE = 'SET_TARGET_ACTION_TYPE';
export const SWAP_LANGUAGES_ACTION_TYPE = 'SWAP_LANGUAGES_ACTION_TYPE';
export const SET_DETECTED_LANG_ACTION_TYPE = 'SET_DETECTED_TEXT_ACTION_TYPE';

export const INITIAL_TRANSLATION_STATE = {
  query: '',
  translatedText: '',
  source: 'auto',
  detectedSource: '',
  target: 'ru',
};

export const translationReducer = (state = INITIAL_TRANSLATION_STATE, action) => {
  switch (action.type) {
    case SET_QUERY_ACTION_TYPE:
      return { ...state, query: action.payload };

    case SET_TRANSLATED_TEXT_ACTION_TYPE:
      return { ...state, translatedText: action.payload };

    case SET_SOURCE_ACTION_TYPE: {
      const sourceLang = state.source === 'auto' ? getNextLanguage('ru') : state.source;
      if (action.payload !== state.target) {
        return { ...state, source: action.payload };
      }
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

    case SET_DETECTED_LANG_ACTION_TYPE:
      return {
        ...state,
        detectedSource: action.payload,
      };

    default:
      return state;
  }
};
