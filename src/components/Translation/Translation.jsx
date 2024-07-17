import { Button, Container, Grid, Alert, Textarea } from '@mantine/core';
import { useState, useCallback } from 'react';
import { translate } from 'google-translate-api-browser';
import { useMutation } from '@tanstack/react-query';
import { LangSelect } from '../LangSelect';
import { TbArrowsLeftRight } from 'react-icons/tb';
import styles from './Translation.module.css';

export const Translation = () => {
  const [query, setQuery] = useState('');
  const trimmedQuery = query.trim();
  const [translatedText, setTranslatedText] = useState('');

  const [source, setSource] = useState('en');
  const [target, setTarget] = useState('ru');

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: () =>
      translate(trimmedQuery, {
        to: target,
        from: source,
        corsUrl: 'http://cors-anywhere.herokuapp.com/',
      }),
    onSuccess: data => {
      setTranslatedText(data.text);
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
    setQuery(event.currentTarget.value);
  };

  const swapLanguage = () => {
    setSource(target);
    setTarget(source);
    setQuery(translatedText);
    setTranslatedText(query);
  };

  return (
    <Container size="xl" mt="lg">
      <Grid>
        <Grid.Col span={5}>
          <LangSelect value={source} onChange={setSource} />
          <Textarea
            placeholder="Text"
            className={styles.textarea}
            value={query}
            onChange={handleInputChange}
            autosize
            variant="filled"
            size="lg"
            minRows={8}
          />
        </Grid.Col>

        <Grid.Col className={styles.middleActions} span={2}>
          <Button onClick={swapLanguage} className={styles.swapButton}>
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
          <LangSelect value={target} onChange={setTarget} />
          <Textarea
            placeholder="Translation"
            className={styles.textarea}
            value={translatedText}
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
