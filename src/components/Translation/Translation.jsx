import { Button, Container, Grid, Alert, Textarea, Tooltip } from '@mantine/core';
import { useCallback, useReducer } from 'react';
import { translate } from 'google-translate-api-browser';
import { useMutation } from '@tanstack/react-query';
import { LangSelect } from '../LangSelect';
import { TbArrowsLeftRight, TbLanguage } from 'react-icons/tb';
import styles from './Translation.module.css';
import ISO6391 from 'iso-639-1';
import {
  INITIAL_TRANSLATION_STATE,
  translationReducer,
  SET_TRANSLATED_TEXT_ACTION_TYPE,
  SET_QUERY_ACTION_TYPE,
  SET_SOURCE_ACTION_TYPE,
  SWAP_LANGUAGES_ACTION_TYPE,
  SET_TARGET_ACTION_TYPE,
  SET_DETECTED_LANG_ACTION_TYPE,
} from './reducer';

export const Translation = () => {
  const [state, dispatch] = useReducer(translationReducer, INITIAL_TRANSLATION_STATE);
  const trimmedQuery = state.query?.trim();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: () =>
      translate(trimmedQuery, {
        to: state.target,
        from: state.source,
        corsUrl: 'http://cors-anywhere.herokuapp.com/',
      }),
    onSuccess: data => {
      dispatch({ type: SET_TRANSLATED_TEXT_ACTION_TYPE, payload: data.text });
      if (state.source === 'auto' && data.from.language.iso) {
        dispatch({
          type: SET_DETECTED_LANG_ACTION_TYPE,
          payload: {
            value: data.from.language.iso,
            label: `(${ISO6391.getName(data.from.language.iso)})`,
          },
        });
      }
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

  return (
    <Container size="xl" className={styles.container}>
      <Grid className={styles.gridContainer}>
        <Grid.Col span={5}>
          <LangSelect
            languages={state.languages}
            isDetecting={true}
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
              disabled={state.source === 'auto' && !state.detectedLang.label}
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
          <LangSelect
            languages={state.languages}
            value={state.target}
            onChange={handleTargetChange}
          />
          <Textarea
            placeholder="Translation"
            className={styles.textarea}
            value={state.translatedText}
            autosize
            size="lg"
            minRows={8}
            readOnly
          />

          {isError && (
            <Alert title="Error" color="red">
              {error?.message}
            </Alert>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
};
