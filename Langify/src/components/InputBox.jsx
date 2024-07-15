import { Button, Container, Grid, Textarea, Alert } from '@mantine/core';
import { useEffect, useState, useCallback } from 'react';
import { translate } from 'google-translate-api-browser';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '../hooks/useDebounce';
export const InputBox = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 5);
  const [translatedText, setTranslatedText] = useState('');

  const toTranslate = async () => {
    return await translate(debouncedValue, {
      to: 'ru',
      corsUrl: 'http://cors-anywhere.herokuapp.com/',
    });
  };

  const { isSuccess, isError, data, isFetching, error, refetch } = useQuery({
    queryKey: ['translationText', debouncedValue],
    queryFn: toTranslate,
    enabled: false,
    cacheTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isSuccess) {
      setTranslatedText(data.text);
    } else if (isError) {
      setTranslatedText('');
    }
  }, [data, isSuccess, isError]);

  const handleTranslate = useCallback(() => {
    if (debouncedValue.trim() !== '') {
      refetch();
    }
  }, [debouncedValue, refetch]);

  const handleInputChange = event => {
    setValue(event.currentTarget.value);
    if (event.currentTarget.value.trim() === '') {
      setTranslatedText('');
    }
  };

  return (
    <Container size="xl" mt="lg">
      <Grid>
        <Grid.Col span={5}>
          <Textarea
            value={value}
            onChange={handleInputChange}
            autosize
            variant="filled"
            size="lg"
            label="English"
            minRows={8}
          />
        </Grid.Col>

        <Grid.Col
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          span={2}
        >
          <Button
            onClick={handleTranslate}
            size="md"
            disabled={isFetching || !debouncedValue.trim()}
            style={{
              transition: 'background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease',
              opacity: isFetching || !debouncedValue.trim() ? 0.5 : 1,
            }}
          >
            {isFetching ? 'Translating...' : 'Translate ->'}
          </Button>
        </Grid.Col>

        <Grid.Col span={5}>
          <Textarea
            value={translatedText}
            autosize
            variant="filled"
            size="lg"
            label="Russian"
            minRows={8}
            readOnly
          />
          {error && (
            <Alert title="Error" color="red">
              {error}
            </Alert>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
};
