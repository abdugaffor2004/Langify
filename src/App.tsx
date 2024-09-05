import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Translation } from './components/Translation';
import { MantineProvider } from '@mantine/core';
import { MainContainer } from './components/MainContainer/MainContainer';
import { FC } from 'react';

const queryClient = new QueryClient();

export const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <MainContainer>
        <Translation />
      </MainContainer>
    </MantineProvider>
  </QueryClientProvider>
);
