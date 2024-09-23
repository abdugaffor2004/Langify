import { Alert } from '@mantine/core';
import { FC } from 'react';

interface ErrorAlertProps {
  error: Error;
}

export const ErrorAlert: FC<ErrorAlertProps> = ({ error }) => (
  <Alert mt="md" title="Error" color="red">
    {error.message || 'An unknown error occurred'}
  </Alert>
);
