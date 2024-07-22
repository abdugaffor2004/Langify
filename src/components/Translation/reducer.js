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
  target: 'ru',
  detectedLang: { value: '', label: '' },
  languages: {
    auto: 'Detect language',
    en: 'English',
    ru: 'Russian',
    zh: 'Chinese',
    es: 'Spanish',
  },
};
const getNextLanguage = (currentLang, languages) => {
  const languageKeys = Object.keys(languages).filter(key => key !== 'auto');
  const currentIndex = languageKeys.indexOf(currentLang);
  const nextIndex = currentIndex === 0 ? languageKeys.length - 1 : currentIndex - 1;
  return { value: languageKeys[nextIndex], label: languages[languageKeys[nextIndex]] };
};

export const translationReducer = (state = INITIAL_TRANSLATION_STATE, action) => {
  switch (action.type) {
    case SET_QUERY_ACTION_TYPE:
      return { ...state, query: action.payload };

    case SET_TRANSLATED_TEXT_ACTION_TYPE:
      return { ...state, translatedText: action.payload };

    case SET_SOURCE_ACTION_TYPE: {
      const sourceLang =
        state.source === 'auto'
          ? state.detectedLang.value || getNextLanguage('ru', state.languages).value
          : state.source;
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
      const sourceLang = state.source === 'auto' ? state.detectedLang.value : state.source;
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
        detectedLang: { ...state.detectedLang, ...action.payload },
        languages: {
          ...state.languages,
          auto: `Detect language (${action.payload.label})`,
        },
      };

    default:
      return state;
  }
};
