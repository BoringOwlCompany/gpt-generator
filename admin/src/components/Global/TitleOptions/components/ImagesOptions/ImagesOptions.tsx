import React from 'react';

import { Checkbox, Select, TextInput } from '../../../Form';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

export interface ITitleOptionsImagesProps<T extends FieldValues> {
  checkboxName: FieldPath<T>;
  promptName: FieldPath<T>;

  numberOfImagesName?: FieldPath<T>;
  disabled?: boolean;
}

const ImagesOptions = <T extends FieldValues>({
  checkboxName,
  promptName,
  numberOfImagesName,
  disabled,
}: ITitleOptionsImagesProps<T>) => {
  const { watch } = useFormContext();
  const checkboxValue = watch(checkboxName);

  return (
    <>
      <Checkbox<T> name={checkboxName} disabled={disabled} label="Generate images" />

      {checkboxValue && (
        <>
          {numberOfImagesName && (
            <Select<T>
              name={numberOfImagesName}
              label="Number of images"
              options={Array.from({ length: 10 }).map((_, index) => ({
                label: String(index + 1),
                value: index + 1,
              }))}
              disabled={disabled}
            />
          )}
          <TextInput<T>
            placeholder="Custom images prompt"
            label="Prompt"
            name={promptName}
            hint="Provide your own prompt to generate images. If left blank, the topic will be used as a prompt"
            disabled={disabled}
          />
        </>
      )}
    </>
  );
};

export default ImagesOptions;
