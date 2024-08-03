import { Button, Container, Grid, Textarea, Tooltip, ActionIcon } from '@mantine/core';
import { useCallback, useEffect, useReducer } from 'react';
import { translate } from 'google-translate-api-browser';
import { useMutation } from '@tanstack/react-query';
import { LangSelect } from '../LangSelect';
import { TbArrowsLeftRight, TbCopy, TbCopyCheckFilled, TbLanguage } from 'react-icons/tb';
import styles from './Translation.module.css';
import {
  INITIAL_TRANSLATION_STATE,
  translationReducer,
  SET_QUERY_ACTION_TYPE,
  SET_SOURCE_ACTION_TYPE,
  SWAP_LANGUAGES_ACTION_TYPE,
  SET_TARGET_ACTION_TYPE,
  TRANSLATE_ACTION_TYPE,
} from './reducer';
import { useClipboard } from '@mantine/hooks';
import { ErrorAlert } from './ErrorAlert';
import { readSessionStorageValue, writeSessionStorageValue } from '../../lib/storage/';

const SAVED_TRANSLATION_LANG = 'SAVED_TRANSLATION_LANG';
const createTranslationInitialState = initialState => ({
  ...initialState,
  ...readSessionStorageValue(SAVED_TRANSLATION_LANG),
});

export const Translation = () => {
  const [state, dispatch] = useReducer(
    translationReducer,
    INITIAL_TRANSLATION_STATE,
    createTranslationInitialState,
  );

  const trimmedQuery = state.query?.trim();
  const clipboard = useClipboard({ timeout: 1200 });

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: () =>
      translate(trimmedQuery, {
        to: state.target,
        from: state.source,
        corsUrl: 'http://cors-anywhere.herokuapp.com/',
      }),
    onSuccess: data => {
      dispatch({
        type: TRANSLATE_ACTION_TYPE,
        payload: {
          text: data.text,
          language: data.from.language.iso,
        },
      });
    },
  });

  const handleTranslate = useCallback(() => {
    if (trimmedQuery === '') {
      throw new Error(
        'There is no input value, please provide some meaningful data for translation',
      );
    }
    mutate();
  }, [trimmedQuery, mutate]);

  const handleInputChange = event => {
    dispatch({ type: SET_QUERY_ACTION_TYPE, payload: event.currentTarget.value });
  };

  const handleSourceChange = value => {
    dispatch({ type: SET_SOURCE_ACTION_TYPE, payload: value });
  };

  const handleTargetChange = value => {
    dispatch({ type: SET_TARGET_ACTION_TYPE, payload: value });
  };

  const handleLangsSwap = () => {
    dispatch({ type: SWAP_LANGUAGES_ACTION_TYPE });
  };

  useEffect(() => {
    writeSessionStorageValue(SAVED_TRANSLATION_LANG, {
      source: state.source,
      target: state.target,
    });
  }, [state.source, state.target]);

  return (
    <Container size="xl" className={styles.container}>
      <Grid className={styles.gridContainer}>
        <Grid.Col span={5}>
          <LangSelect
            detectedLang={state.detectedSource}
            withAuto
            value={state.source}
            onChange={handleSourceChange}
          />
          <Textarea
            placeholder="Text"
            className={styles.textarea}
            value={state.query}
            onChange={handleInputChange}
            autosize
            size="lg"
            minRows={8}
          />
        </Grid.Col>

        <Grid.Col className={styles.middleActions} span={2}>
          <Tooltip label="swap the languages" transitionProps={{ duration: 350 }} offset={10}>
            <Button
              disabled={state.source === 'auto' && !state.detectedSource}
              onClick={handleLangsSwap}
              className={styles.swapButton}
            >
              <TbArrowsLeftRight size="20px" />
            </Button>
          </Tooltip>

          <Tooltip label="Translate" transitionProps={{ duration: 350 }} offset={10}>
            <Button
              onClick={handleTranslate}
              size="md"
              disabled={!trimmedQuery}
              loading={isPending}
              className={styles.translateButton}
            >
              {<TbLanguage size="24px" />}
            </Button>
          </Tooltip>
        </Grid.Col>

        <Grid.Col span={5}>
          <LangSelect value={state.target} onChange={handleTargetChange} />
          <div className={styles.translationContainer}>
            <Textarea
              placeholder="Translation"
              className={styles.textarea}
              value={state.translatedText}
              autosize
              size="lg"
              minRows={8}
              readOnly
            />

            <Tooltip
              disabled={!state.translatedText}
              label={clipboard.copied ? 'Copied' : 'Copy'}
              position="right"
            >
              <ActionIcon
                className={styles.copyButton}
                disabled={!state.translatedText}
                color={clipboard.copied ? 'teal' : 'blue'}
                size="32px"
                variant="subtle"
                onClick={() => clipboard.copy(state.translatedText)}
              >
                {clipboard.copied ? <TbCopyCheckFilled size="24px" /> : <TbCopy size="24px" />}
              </ActionIcon>
            </Tooltip>
          </div>

          {isError && <ErrorAlert error={error} />}
          {clipboard.error && <ErrorAlert error={clipboard.error} />}
        </Grid.Col>
      </Grid>
    </Container>
  );
};
