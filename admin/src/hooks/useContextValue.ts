import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export const useContextValue = <T>(initialValue: T, dependencyArray: unknown[] = []) => {
  const { pathname } = useLocation();
  return useMemo(() => initialValue, [pathname, ...dependencyArray]);
};
