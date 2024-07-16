import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Translation } from './components/Translation/Translation';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Translation />
  </QueryClientProvider>
);
