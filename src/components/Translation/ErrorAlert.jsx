import { Alert } from '@mantine/core';

export const ErrorAlert = ({ error }) => {
  if (!error) return null;

  return (
    <Alert mt="md" title={error.title || 'Error'} color="red">
      {error.message || 'An unknown error occurred'}
    </Alert>
  );
};
