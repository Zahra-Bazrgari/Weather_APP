import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Page from './components/Map';
import HomePage from './components/Home';
import { GlobalPositionProvider } from './context/LocationContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalPositionProvider>
        <Page />
        <HomePage />
      </GlobalPositionProvider>
    </QueryClientProvider>
  );
};

export default App;
