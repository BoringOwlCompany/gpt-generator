import React from 'react';
import { Textarea as StrapiTextArea } from '@strapi/design-system';
import { Controller, useFormContext, FieldValues } from 'react-hook-form';
import { ControlledProps } from '../types';

const TextArea = <T extends FieldValues>({ name, isError, ...props }: ControlledProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <StrapiTextArea
          {...field}
          {...props}
          error={isError && 'Something went wrong, please try again...'}
        />
      )}
    />
  );
};

export default TextArea;
