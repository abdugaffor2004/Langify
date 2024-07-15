import { Button, Container, Grid, Textarea, Alert } from '@mantine/core';
import { useState, useCallback } from 'react';
import { translate } from 'google-translate-api-browser';
import { useMutation } from '@tanstack/react-query';
import useDebounce from '../hooks/useDebounce';
import styles from './Translation.module.css';

export const Translation = () => {
  const [query, setQuery] = useState('');
  const debouncedValue = useDebounce(query).trim();

  const toTranslate = async () => {
    return await translate(debouncedValue, {
      to: 'ru',
      corsUrl: 'http://cors-anywhere.herokuapp.com/',
    });
  };

  const { mutate, data, isError, isPending, error } = useMutation({
    mutationFn: toTranslate,
  });

  const handleTranslate = useCallback(() => {
    if (debouncedValue !== '') {
      mutate();
    }
  }, [debouncedValue, mutate]);

  const handleInputChange = event => {
    setQuery(event.currentTarget.value);
  };

  return (
    <Container size="xl" mt="lg">
      <Grid>
        <Grid.Col span={5}>
          <Textarea
            value={query}
            onChange={handleInputChange}
            autosize
            variant="filled"
            size="lg"
            label="English"
            minRows={8}
          />
        </Grid.Col>

        <Grid.Col className={styles.centered} span={2}>
          <Button
            onClick={handleTranslate}
            size="md"
            disabled={isPending || !debouncedValue}
            loading={isPending}
            className={styles.buttonTransition}
          >
            {'Translate ->'}
          </Button>
        </Grid.Col>

        <Grid.Col span={5}>
          <Textarea
            value={data ? data.text : ''}
            autosize
            variant="filled"
            size="lg"
            label="Russian"
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
