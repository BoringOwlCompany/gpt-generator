import React from 'react';
import { TextInput as StrapiTextInput } from '@strapi/design-system';
import { Controller, useFormContext, FieldValues } from 'react-hook-form';
import { ControlledProps } from '../types';

const TextInput = <T extends FieldValues>({ name, isError, ...props }: ControlledProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <StrapiTextInput
            {...field}
            {...props}
            error={isError && 'Something went wrong, please try again...'}
          />
        );
      }}
    />
  );
};

export default TextInput;
