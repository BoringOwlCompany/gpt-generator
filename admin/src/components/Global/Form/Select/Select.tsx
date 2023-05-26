import React from 'react';
import { Controller, useFormContext, FieldValues } from 'react-hook-form';
import { Select as StrapiSelect, Option } from '@strapi/design-system';
import { ControlledProps } from '../types';

type IProps = {
  options: { label: string; value: any }[];
};

const Select = <T extends FieldValues>({
  name,
  options,
  isError,
  ...props
}: ControlledProps<T, IProps>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <StrapiSelect
          {...field}
          {...props}
          error={isError && 'Something went wrong, please try again...'}
        >
          {options.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </StrapiSelect>
      )}
    />
  );
};

export default Select;
