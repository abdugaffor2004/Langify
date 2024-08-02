export const SET_QUERY_ACTION_TYPE = 'SET_QUERY_ACTION_TYPE';
export const TRANSLATE_ACTION_TYPE = 'SET_TRANSLATED_TEXT_ACTION_TYPE';
export const SET_SOURCE_ACTION_TYPE = 'SET_SOURCE_ACTION_TYPE';
export const SET_TARGET_ACTION_TYPE = 'SET_TARGET_ACTION_TYPE';
export const SWAP_LANGUAGES_ACTION_TYPE = 'SWAP_LANGUAGES_ACTION_TYPE';
export const SET_DETECTED_LANG_ACTION_TYPE = 'SET_DETECTED_TEXT_ACTION_TYPE';
export const INIT_ACTION_TYPE = 'INIT_ACTION_TYPE';

const saveLanguagesToSessionStorage = state => {
  sessionStorage.setItem(
    'translationState',
    JSON.stringify({ source: state.source, target: state.target }),
  );
};

export const INITIAL_TRANSLATION_STATE = {
  query: '',
  translatedText: '',
  source: 'auto',
  detectedSource: '',
  target: 'ru',
};

export const translationReducer = (state = INITIAL_TRANSLATION_STATE, action) => {
  let newState;
  switch (action.type) {
    case INIT_ACTION_TYPE:
      return { ...state, ...action.payload };

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
        newState = { ...state, source: action.payload };
        saveLanguagesToSessionStorage(newState);
        return newState;
      }

      const sourceLang = state.source === 'auto' ? 'en' : state.source;
      newState = {
        ...state,
        source: state.target,
        target: sourceLang,
        query: state.translatedText,
        translatedText: state.query,
      };
      saveLanguagesToSessionStorage(newState);
      return newState;
    }

    case SET_TARGET_ACTION_TYPE: {
      if (action.payload !== state.source) {
        newState = { ...state, target: action.payload };
        saveLanguagesToSessionStorage(newState);
        return newState;
      }
      newState = {
        ...state,
        source: state.target,
        target: state.source,
        query: state.translatedText,
        translatedText: state.query,
      };
      saveLanguagesToSessionStorage(newState);
      return newState;
    }

    case SWAP_LANGUAGES_ACTION_TYPE: {
      const sourceLang = state.source === 'auto' ? state.detectedSource : state.source;
      newState = {
        ...state,
        source: state.target,
        target: sourceLang,
        query: state.translatedText,
        translatedText: state.query,
      };
      saveLanguagesToSessionStorage(newState);
      return newState;
    }

    default:
      return state;
  }
};
