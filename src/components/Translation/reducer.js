export const SET_QUERY_ACTION_TYPE = 'SET_QUERY_ACTION_TYPE';
export const SET_TRANSLATED_TEXT_ACTION_TYPE = 'SET_TRANSLATED_TEXT_ACTION_TYPE';
export const SET_SOURCE_ACTION_TYPE = 'SET_SOURCE_ACTION_TYPE';
export const SET_TARGET_ACTION_TYPE = 'SET_TARGET_ACTION_TYPE';
export const SWAP_LANGUAGES_ACTION_TYPE = 'SWAP_LANGUAGES_ACTION_TYPE';

export const INITIAL_TRANSLATION_STATE = {
  query: '',
  translatedText: '',
  source: 'en',
  target: 'ru',
};

const swapLanguages = state => ({
  ...state,
  source: state.target,
  target: state.source,
  query: state.translatedText,
  translatedText: state.query,
});

export const translationReducer = (state = INITIAL_TRANSLATION_STATE, action) => {
  switch (action.type) {
    case SET_QUERY_ACTION_TYPE:
      return { ...state, query: action.payload };

    case SET_TRANSLATED_TEXT_ACTION_TYPE:
      return { ...state, translatedText: action.payload };

    case SET_SOURCE_ACTION_TYPE:
      if (action.payload === state.target) {
        return swapLanguages(state);
      }
      return { ...state, source: action.payload };

    case SET_TARGET_ACTION_TYPE:
      if (action.payload === state.source) {
        return swapLanguages(state);
      }
      return { ...state, target: action.payload };

    case SWAP_LANGUAGES_ACTION_TYPE:
      return swapLanguages(state);

    default:
      return state;
  }
};
