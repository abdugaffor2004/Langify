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
  setQuery,
  setSource,
  setTarget,
  setTranslatedText,
  swapLanguages,
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
      dispatch(setTranslatedText(data.text));
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
    dispatch(setQuery(event.currentTarget.value));
  };

  const handleLangsSwap = () => {
    dispatch(swapLanguages());
  };

  return (
    <Container size="xl" mt="lg">
      <Grid>
        <Grid.Col span={5}>
          <LangSelect value={state.source} onChange={value => dispatch(setSource(value))} />
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
          <LangSelect value={state.target} onChange={value => dispatch(setTarget(value))} />
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
