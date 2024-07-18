const SET_QUERY = 'SET_QUERY';
const SET_TRANSLATED_TEXT = 'SET_TRANSLATED_TEXT';
const SET_SOURCE = 'SET_SOURCE';
const SET_TARGET = 'SET_TARGET';
const SWAP_LANGUAGES = 'SWAP_LANGUAGES';

export const initialState = {
  query: '',
  translatedText: '',
  source: 'en',
  target: 'ru',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERY:
      return { ...state, query: action.payload };
    case SET_TRANSLATED_TEXT:
      return { ...state, translatedText: action.payload };
    case SET_SOURCE:
      return { ...state, source: action.payload };
    case SET_TARGET:
      return { ...state, target: action.payload };
    case SWAP_LANGUAGES:
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

export const setQuery = query => ({ type: SET_QUERY, payload: query });
export const setSource = source => ({ type: SET_SOURCE, payload: source });
export const setTarget = target => ({ type: SET_TARGET, payload: target });
export const swapLanguages = () => ({ type: SWAP_LANGUAGES });
export const setTranslatedText = translatedText => ({
  type: SET_TRANSLATED_TEXT,
  payload: translatedText,
});
