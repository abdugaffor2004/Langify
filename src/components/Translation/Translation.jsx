import { Button, Container, Grid, Alert, Textarea } from '@mantine/core';
import { useCallback, useReducer } from 'react';
import { translate } from 'google-translate-api-browser';
import { useMutation } from '@tanstack/react-query';
import { LangSelect } from '../LangSelect';
import { TbArrowsLeftRight } from 'react-icons/tb';
import styles from './Translation.module.css';
import {
  INITIAL_TRANSLATION_STATE,
  translationReducer,
  SET_TRANSLATED_TEXT_ACTION_TYPE,
  SET_QUERY_ACTION_TYPE,
  SET_SOURCE_ACTION_TYPE,
  SWAP_LANGUAGES_ACTION_TYPE,
  SET_TARGET_ACTION_TYPE,
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

  const handleSelectChange = (newLang, opossiteLang, actionType) => {
    if (newLang === opossiteLang) {
      handleLangsSwap();
    } else {
      dispatch({ type: actionType, payload: newLang });
    }
  };

  const handleLangsSwap = () => {
    dispatch({ type: SWAP_LANGUAGES_ACTION_TYPE });
  };

  return (
    <Container size="xl" mt="lg">
      <Grid>
        <Grid.Col span={5}>
          <LangSelect
            value={state.source}
            onChange={value => handleSelectChange(value, state.target, SET_SOURCE_ACTION_TYPE)}
          />
          <Textarea
            placeholder="Text"
            className={styles.textarea}
            value={state.query}
            onChange={handleInputChange}
            autosize
            variant="filled"
            size="lg"
            minRows={8}
          />
        </Grid.Col>

        <Grid.Col className={styles.middleActions} span={2}>
          <Button onClick={handleLangsSwap} className={styles.swapButton}>
            <TbArrowsLeftRight />
          </Button>
          <Button
            onClick={handleTranslate}
            size="md"
            disabled={!trimmedQuery}
            loading={isPending}
            className={styles.translateButton}
          >
            {'Translate ->'}
          </Button>
        </Grid.Col>

        <Grid.Col span={5}>
          <LangSelect
            value={state.target}
            onChange={value => handleSelectChange(value, state.source, SET_TARGET_ACTION_TYPE)}
          />
          <Textarea
            placeholder="Translation"
            className={styles.textarea}
            value={state.translatedText}
            autosize
            variant="filled"
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
