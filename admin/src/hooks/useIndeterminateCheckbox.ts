import { useEffect, useState } from 'react';
import _ from 'lodash';

type CheckboxState = boolean | 'indeterminate';

type Initials<D, T = boolean[]> = {
  [key in keyof D]: T;
};

export const useIndeterminateCheckbox = <T>(initialValues: Initials<T>) => {
  const [state, setState] = useState(parseObjectWithArrayToCheckboxState(initialValues));

  useEffect(() => {
    setState(parseObjectWithArrayToCheckboxState(initialValues));
  }, [...Object.values(initialValues).flat(1)]);

  return state;
};

const parseObjectWithArrayToCheckboxState = <T>(object: Initials<T>) =>
  Object.entries(object).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: getStateFromArray(value as boolean[]),
    }),
    {} as Initials<T, CheckboxState>
  );

const getStateFromArray = (array: boolean[]): CheckboxState => {
  if (array.every((item) => item)) return true;
  if (array.some((item) => item)) return 'indeterminate';
  return false;
};
