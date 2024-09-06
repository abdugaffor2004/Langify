import { Alert } from '@mantine/core';
import { FC } from 'react';

interface IErrorAlertProps {
  error: Error;
}

export const ErrorAlert: FC<IErrorAlertProps> = ({ error }) => (
  <Alert mt="md" title="Error" color="red">
    {error.message || 'An unknown error occurred'}
  </Alert>
);
