import { useState } from 'react';

type Status = 'idle' | 'loading' | 'error' | 'success';

export const useStatus = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const isLoading = status === 'loading';
  const isError = status === 'error';
  const isSuccess = status === 'success';
  const isIdle = status === 'idle';

  return { isIdle, isLoading, isSuccess, isError, setStatus, statusMessage, setStatusMessage };
};
