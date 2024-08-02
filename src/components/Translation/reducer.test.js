import { describe, it, expect, beforeEach } from 'vitest';
import {
  INIT_ACTION_TYPE,
  INITIAL_TRANSLATION_STATE,
  SET_QUERY_ACTION_TYPE,
  SET_SOURCE_ACTION_TYPE,
  SET_TARGET_ACTION_TYPE,
  SWAP_LANGUAGES_ACTION_TYPE,
  TRANSLATE_ACTION_TYPE,
  translationReducer,
} from './reducer';

const mockSessionStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value;
  },
  clear() {
    this.store = {};
  },
};
globalThis.sessionStorage = mockSessionStorage;

describe('translationReducer', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should return initial state', () => {
    expect(translationReducer(INITIAL_TRANSLATION_STATE, {})).toEqual(INITIAL_TRANSLATION_STATE);
  });

  it('should initialize state from sessionStorage', () => {
    sessionStorage.setItem('translationState', { source: 'en', target: 'ru' });
    const action = { type: INIT_ACTION_TYPE, payload: sessionStorage.getItem('translationState') };

    expect(translationReducer(undefined, action)).toEqual({
      ...INITIAL_TRANSLATION_STATE,
      ...action.payload,
    });
  });

  it('should handle set query action', () => {
    const action = { type: SET_QUERY_ACTION_TYPE, payload: 'Hello' };
    const expectedState = {
      ...INITIAL_TRANSLATION_STATE,
      query: action.payload,
      translatedText: '',
    };

    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
  });

  it('should handle translate action when source !== auto ', () => {
    const action = {
      type: TRANSLATE_ACTION_TYPE,
      payload: { text: 'Привет', language: INITIAL_TRANSLATION_STATE.detectedSource },
    };
    const expectedState = {
      ...INITIAL_TRANSLATION_STATE,
      translatedText: action.payload.text,
    };

    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
  });

  it('should handle translate action when source === auto ', () => {
    const action = {
      type: TRANSLATE_ACTION_TYPE,
      payload: { text: 'Привет', language: 'en' },
    };
    const expectedState = {
      ...INITIAL_TRANSLATION_STATE,
      translatedText: action.payload.text,
      detectedSource: action.payload.language,
    };

    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
  });

  it('should handle set source action', () => {
    const action = { type: SET_SOURCE_ACTION_TYPE, payload: 'en' };
    const expectedState = { ...INITIAL_TRANSLATION_STATE, source: action.payload };

    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
    expect(JSON.parse(sessionStorage.getItem('translationState'))).toEqual({
      source: expectedState.source,
      target: expectedState.target,
    });
  });

  it('should handle set target action', () => {
    const action = { type: SET_TARGET_ACTION_TYPE, payload: 'zh' };
    const expectedState = { ...INITIAL_TRANSLATION_STATE, target: action.payload };

    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
    expect(JSON.parse(sessionStorage.getItem('translationState'))).toEqual({
      source: expectedState.source,
      target: expectedState.target,
    });
  });

  it('should swap languages and queries when set source action is dispatched and new source equals target', () => {
    const action = { type: SET_SOURCE_ACTION_TYPE, payload: 'ru' };
    const initialState = {
      ...INITIAL_TRANSLATION_STATE,
      source: 'en',
      target: 'ru',
      query: 'Hello',
      translatedText: 'Привет',
    };
    const expectedState = {
      ...INITIAL_TRANSLATION_STATE,
      source: 'ru',
      target: 'en',
      query: 'Привет',
      translatedText: 'Hello',
    };

    expect(translationReducer(initialState, action)).toEqual(expectedState);
    expect(JSON.parse(sessionStorage.getItem('translationState'))).toEqual({
      source: expectedState.source,
      target: expectedState.target,
    });
  });

  it('should swap languages and queries when set target action is dispatched and new target equals source', () => {
    const action = { type: SET_TARGET_ACTION_TYPE, payload: 'en' };
    const initialState = {
      ...INITIAL_TRANSLATION_STATE,
      source: 'en',
      target: 'ru',
      query: 'Hello',
      translatedText: 'Привет',
    };
    const expectedState = {
      ...INITIAL_TRANSLATION_STATE,
      source: 'ru',
      target: 'en',
      query: 'Привет',
      translatedText: 'Hello',
    };

    expect(translationReducer(initialState, action)).toEqual(expectedState);
    expect(JSON.parse(sessionStorage.getItem('translationState'))).toEqual({
      source: expectedState.source,
      target: expectedState.target,
    });
  });

  it('should handle set swap action', () => {
    const action = { type: SWAP_LANGUAGES_ACTION_TYPE };
    const initialState = {
      ...INITIAL_TRANSLATION_STATE,
      source: 'en',
      target: 'ru',
      query: 'Hello',
      translatedText: 'Привет',
    };
    const expectedState = {
      ...INITIAL_TRANSLATION_STATE,
      source: 'ru',
      target: 'en',
      query: 'Привет',
      translatedText: 'Hello',
    };

    expect(translationReducer(initialState, action)).toEqual(expectedState);
    expect(JSON.parse(sessionStorage.getItem('translationState'))).toEqual({
      source: expectedState.source,
      target: expectedState.target,
    });
  });

  it('should handle set swap action with detected language', () => {
    const action = { type: SWAP_LANGUAGES_ACTION_TYPE };

    const initialState = {
      ...INITIAL_TRANSLATION_STATE,
      source: 'auto',
      target: 'ru',
      query: 'Halo',
      translatedText: 'Привет',
      detectedSource: 'es',
    };

    const expectedState = {
      ...initialState,
      source: 'ru',
      target: 'es',
      query: 'Привет',
      translatedText: 'Halo',
    };

    expect(translationReducer(initialState, action)).toEqual(expectedState);
    expect(JSON.parse(sessionStorage.getItem('translationState'))).toEqual({
      source: expectedState.source,
      target: expectedState.target,
    });
  });

  it('should handle swap action when the detected language hasnt been chosen, set source action is dispatched and new source equals target ', () => {
    const action = { type: SET_SOURCE_ACTION_TYPE, payload: 'ru' };

    const initialState = {
      ...INITIAL_TRANSLATION_STATE,
      source: 'auto',
      target: 'ru',
      detectedSource: '',
    };

    const expectedState = {
      ...INITIAL_TRANSLATION_STATE,
      source: 'ru',
      target: 'en',
      detectedSource: '',
    };

    expect(translationReducer(initialState, action)).toEqual(expectedState);
    expect(JSON.parse(sessionStorage.getItem('translationState'))).toEqual({
      source: expectedState.source,
      target: expectedState.target,
    });
  });
});
