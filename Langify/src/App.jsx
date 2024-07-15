import { InputBox } from './components/InputBox';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <InputBox />
  </QueryClientProvider>
);
