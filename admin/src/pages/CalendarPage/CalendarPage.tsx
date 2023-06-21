import React from 'react';
import { Calendar } from '../../components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const CalendarPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Calendar />
    </QueryClientProvider>
  );
};

export default CalendarPage;
