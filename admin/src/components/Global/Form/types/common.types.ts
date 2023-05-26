import { InputHTMLAttributes, ReactNode } from 'react';
import { ArrayPath, FieldPath, FieldValues } from 'react-hook-form';

export type ControlledProps<T extends FieldValues, TAdditionalProps = {}, TArrayPath = false> = {
  name: TArrayPath extends true ? ArrayPath<T> : FieldPath<T>;
  label?: ReactNode;
  hint?: string;
  isError?: boolean;
  endAction?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement> &
  TAdditionalProps;
