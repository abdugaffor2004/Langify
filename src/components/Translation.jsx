import { Button, Container, Grid, Alert, Textarea } from '@mantine/core';
import { useState, useCallback } from 'react';
import { translate } from 'google-translate-api-browser';
import { useMutation } from '@tanstack/react-query';
import { LanguagesDropdown } from './LanguagesDropdown';
import styles from './Translation.module.css';

export const Translation = () => {
  const [query, setQuery] = useState('');
  const trimmedQuery = query.trim();

  let [translateFromLang, setTranslateFromLang] = useState('en');
  let [translateToLang, setTranslateToLang] = useState('ru');

  const { mutate, data, isError, isPending, error } = useMutation({
    mutationFn: () =>
      translate(trimmedQuery, {
        to: translateToLang,
        from: translateFromLang,
        corsUrl: 'http://cors-anywhere.herokuapp.com/',
      }),
  });

  const handleTranslate = useCallback(() => {
    if (trimmedQuery === '') {
      throw new Error(
        'There is no input value, please provide some meaningfull data for translation',
      );
    }
    mutate();
  }, [trimmedQuery, mutate]);

  const handleInputChange = event => {
    setQuery(event.currentTarget.value);
  };

  return (
    <Container size="xl" mt="lg">
      <Grid>
        <Grid.Col span={5}>
          <LanguagesDropdown
            currentLang={translateFromLang}
            setCurrentLang={setTranslateFromLang}
          />
          <Textarea
            className={styles.textarea}
            value={query}
            onChange={handleInputChange}
            autosize
            variant="filled"
            size="lg"
            aria-label="English"
            minRows={8}
          />
        </Grid.Col>

        <Grid.Col className={styles.middleActions} span={2}>
          <Button
            onClick={handleTranslate}
            size="md"
            disabled={!trimmedQuery}
            loading={isPending}
            className={styles.translateButton}
            variant="gradient"
          >
            {'Translate ->'}
          </Button>
        </Grid.Col>

        <Grid.Col span={5}>
          <LanguagesDropdown currentLang={translateToLang} setCurrentLang={setTranslateToLang} />
          <Textarea
            className={styles.textarea}
            value={data?.text ?? ''}
            autosize
            variant="filled"
            size="lg"
            aria-label="Russian"
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
