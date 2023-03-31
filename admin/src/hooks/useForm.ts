import { ChangeEvent, useState } from 'react';

export const useForm = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleValueChange = (name: keyof T, value: any) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return { state, handleChange, handleValueChange };
};
