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

  const [source, setSource] = useState('en');
  const [target, setTarget] = useState('ru');

  const { mutate, data, isError, isPending, error } = useMutation({
    mutationFn: () =>
      translate(trimmedQuery, {
        to: target,
        from: source,
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

  const swapLanguage = () => {
    setSource(target);
    setTarget(source);
  };

  return (
    <Container size="xl" mt="lg">
      <Grid>
        <Grid.Col span={5}>
          <LangSelect value={source} onChange={setSource} />
          <Textarea
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
            className={styles.textarea}
            value={data?.text ?? ''}
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
