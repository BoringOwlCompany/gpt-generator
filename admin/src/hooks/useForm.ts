import { ChangeEvent, useState } from 'react';
import * as _ from 'lodash';

export interface IUseForm<T> {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleValueChange: (name: keyof T, value: any, subpath?: string) => void;
}

export const useForm = <T extends object>(initialState: T): IUseForm<T> => {
  const [state, setState] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newState = _.cloneDeep(state);
    _.set(newState, e.target.name, e.target.value);

    setState(newState);
  };

  const handleValueChange = (name: keyof T, value: any, subpath?: string | number) => {
    const newState = _.cloneDeep(state);
    _.set(newState, subpath ? `${String(name)}.${subpath}` : name, value);

    setState(newState);
  };

  return { state, setState, handleChange, handleValueChange };
};
