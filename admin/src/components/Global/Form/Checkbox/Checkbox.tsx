import React from 'react';
import { Checkbox as StrapiCheckbox } from '@strapi/design-system';
import { Controller, useFormContext, FieldValues } from 'react-hook-form';
import { ControlledProps } from '../types';

const Checkbox = <T extends FieldValues>({
  name,
  label,
  isError,
  ...props
}: ControlledProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <StrapiCheckbox
          {...field}
          {...props}
          error={isError && 'Something went wrong, please try again...'}
        >
          {label}
        </StrapiCheckbox>
      )}
    />
  );
};

export default Checkbox;
