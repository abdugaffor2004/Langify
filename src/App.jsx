import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Translation } from './components/Translation';
import { MantineProvider } from '@mantine/core';
import { MainContainer } from './components/MainContainer/MainContainer';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <MainContainer>
        <Translation />
      </MainContainer>
    </MantineProvider>
  </QueryClientProvider>
);
