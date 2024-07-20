import { describe, it, expect } from 'vitest';
import {
  INITIAL_TRANSLATION_STATE,
  SET_QUERY_ACTION_TYPE,
  SET_SOURCE_ACTION_TYPE,
  SET_TARGET_ACTION_TYPE,
  SET_TRANSLATED_TEXT_ACTION_TYPE,
  SWAP_LANGUAGES_ACTION_TYPE,
  translationReducer,
} from './reducer';

describe('translationReducer', () => {
  it('should return initial state', () => {
    expect(translationReducer(undefined, {})).toEqual(INITIAL_TRANSLATION_STATE);
  });

  it('should handle SET_QUERY_ACTION_TYPE', () => {
    const action = { type: SET_QUERY_ACTION_TYPE, payload: 'Hello' };
    const expectedState = {
      ...INITIAL_TRANSLATION_STATE,
      query: action.payload,
      translatedText: '',
    };
    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
  });

  it('should handle SET_TRANSLATED_TEXT_ACTION_TYPE', () => {
    const action = { type: SET_TRANSLATED_TEXT_ACTION_TYPE, payload: 'Привет' };
    const expectedState = { ...INITIAL_TRANSLATION_STATE, translatedText: action.payload };
    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
  });

  it('should handle SET_SOURCE_ACTION_TYPE', () => {
    const action = { type: SET_SOURCE_ACTION_TYPE, payload: 'en' };
    const expectedState = { ...INITIAL_TRANSLATION_STATE, source: action.payload };
    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
  });

  it('should handle SET_TARGET_ACTION_TYPE', () => {
    const action = { type: SET_TARGET_ACTION_TYPE, payload: 'ru' };
    const expectedState = { ...INITIAL_TRANSLATION_STATE, target: action.payload };
    expect(translationReducer(INITIAL_TRANSLATION_STATE, action)).toEqual(expectedState);
  });

  it('should handle SET_SWAP_ACTION_TYPE', () => {
    const action = { type: SWAP_LANGUAGES_ACTION_TYPE };
    const currentState = {
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
    expect(translationReducer(currentState, action)).toEqual(expectedState);
  });


});
