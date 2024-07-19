const SET_QUERY_ACTION_TYPE = 'SET_QUERY_ACTION_TYPE';
const SET_TRANSLATED_TEXT_ACTION_TYPE = 'SET_TRANSLATED_TEXT_ACTION_TYPE';
const SET_SOURCE_ACTION_TYPE = 'SET_SOURCE_ACTION_TYPE';
const SET_TARGET_ACTION_TYPE = 'SET_TARGET_ACTION_TYPE';
const SWAP_LANGUAGES_ACTION_TYPE = 'SWAP_LANGUAGES_ACTION_TYPE';

export const INITIAL_TRANSLATION_STATE = {
  query: '',
  translatedText: '',
  source: 'en',
  target: 'ru',
};

export const translationReducer = (state = INITIAL_TRANSLATION_STATE, action) => {
  switch (action.type) {
    case SET_QUERY_ACTION_TYPE:
      return { ...state, query: action.payload };
    case SET_TRANSLATED_TEXT_ACTION_TYPE:
      return { ...state, translatedText: action.payload };
    case SET_SOURCE_ACTION_TYPE:
      return { ...state, source: action.payload };
    case SET_TARGET_ACTION_TYPE:
      return { ...state, target: action.payload };
    case SWAP_LANGUAGES_ACTION_TYPE:
      return {
        ...state,
        source: state.target,
        target: state.source,
        query: state.translatedText,
        translatedText: state.query,
      };
    default:
      return state;
  }
};

export const setQuery = query => ({ type: SET_QUERY_ACTION_TYPE, payload: query });
export const setSource = source => ({ type: SET_SOURCE_ACTION_TYPE, payload: source });
export const setTarget = target => ({ type: SET_TARGET_ACTION_TYPE, payload: target });
export const swapLanguages = () => ({ type: SWAP_LANGUAGES_ACTION_TYPE });
export const setTranslatedText = translatedText => ({
  type: SET_TRANSLATED_TEXT_ACTION_TYPE,
  payload: translatedText,
});
