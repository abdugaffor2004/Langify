import { describe, it, expect } from 'vitest';
import { INITIAL_TRANSLATION_STATE, translationReducer } from './reducer';

interface SetQueryAction {
  type: 'SET_QUERY_ACTION_TYPE';
  payload: string;
}

interface SetSourceAction {
  type: 'SET_SOURCE_ACTION_TYPE';
  payload: string;
}

interface SetTargetAction {
  type: 'SET_TARGET_ACTION_TYPE';
  payload: string;
}

interface SwapLanguagesAction {
  type: 'SWAP_LANGUAGES_ACTION_TYPE';
}

interface TranslateAction {
  type: 'TRANSLATE_ACTION_TYPE';
  payload: { text: string; language: string };
}

describe('translationReducer', () => {
  it('should handle set query action', () => {
    const action: SetQueryAction = { type: 'SET_QUERY_ACTION_TYPE', payload: 'Hello' };
    const expectedState = {
      ...INITIAL_TRANSLATION_STATE,
      query: action.payload,
      translatedText: '',
    };

    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
  });

  it('should handle translate action when source !== auto ', () => {
    const action: TranslateAction = {
      type: 'TRANSLATE_ACTION_TYPE',
      payload: { text: 'Привет', language: INITIAL_TRANSLATION_STATE.detectedSource },
    };
    const expectedState = {
      ...INITIAL_TRANSLATION_STATE,
      translatedText: action.payload.text,
    };

    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
  });

  it('should handle translate action when source === auto ', () => {
    const action: TranslateAction = {
      type: 'TRANSLATE_ACTION_TYPE',
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
    const action: SetSourceAction = { type: 'SET_SOURCE_ACTION_TYPE', payload: 'en' };
    const expectedState = { ...INITIAL_TRANSLATION_STATE, source: action.payload };

    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
  });

  it('should handle set target action', () => {
    const action: SetTargetAction = { type: 'SET_TARGET_ACTION_TYPE', payload: 'ru' };
    const expectedState = { ...INITIAL_TRANSLATION_STATE, target: action.payload };

    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
  });

  it('should swap languages and queries when set source action is dispatched and new source equals target', () => {
    const action: SetSourceAction = { type: 'SET_SOURCE_ACTION_TYPE', payload: 'ru' };
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
  });

  it('should swap languages and queries when set target action is dispatched and new target equals source', () => {
    const action: SetTargetAction = { type: 'SET_TARGET_ACTION_TYPE', payload: 'en' };
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
  });

  it('should handle set swap action', () => {
    const action: SwapLanguagesAction = { type: 'SWAP_LANGUAGES_ACTION_TYPE' };
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
  });

  it('should handle set swap action with detected language', () => {
    const action: SwapLanguagesAction = { type: 'SWAP_LANGUAGES_ACTION_TYPE' };

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
  });

  it('should handle swap action when the detected language hasnt been chosen, set source action is dispatched and new source equals target ', () => {
    const action: SetSourceAction = { type: 'SET_SOURCE_ACTION_TYPE', payload: 'ru' };

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
  });
});
