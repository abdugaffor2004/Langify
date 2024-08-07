import { Alert } from '@mantine/core';

export const ErrorAlert = ({ error }) => (
  <Alert mt="md" title={error.title || 'Error'} color="red">
    {error.message || 'An unknown error occurred'}
  </Alert>
);
