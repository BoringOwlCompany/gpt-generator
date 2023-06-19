import React from 'react';
import { Textarea as StrapiTextArea } from '@strapi/design-system';
import { Controller, useFormContext, FieldValues } from 'react-hook-form';
import { ControlledProps } from '../types';

type IProps = {
  maxLength?: number;
};

const TextArea = <T extends FieldValues>({
  name,
  isError,
  maxLength,
  label,
  ...props
}: ControlledProps<T, IProps>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const lengthLabel =
          maxLength && maxLength > 0 ? ` (${field.value?.length}/${maxLength})` : '';

        return (
          <StrapiTextArea
            {...field}
            {...props}
            label={`${label}${lengthLabel}`}
            error={
              fieldState.error?.message || (isError && 'Something went wrong, please try again...')
            }
          />
        );
      }}
    />
  );
};

export default TextArea;
