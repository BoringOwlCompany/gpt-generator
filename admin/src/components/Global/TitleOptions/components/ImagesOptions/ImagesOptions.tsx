import React from 'react';

import { Checkbox, Select, Option, TextInput } from '@strapi/design-system';

export interface ITitleOptionsImagesProps {
  checkboxValue: boolean;
  checkboxInputName?: string;
  checkboxOnChange: (value: boolean) => void;
  prompt: string;
  promptInputName?: string;
  promptOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  numberOfImages?: number;
  numberOfImagesOnChange?: (value: number) => void;

  disabled?: boolean;
}

const ImagesOptions = ({
  checkboxOnChange,
  checkboxInputName,
  checkboxValue,
  prompt,
  promptInputName,
  promptOnChange,
  numberOfImages,
  numberOfImagesOnChange,
  disabled,
}: ITitleOptionsImagesProps) => {
  return (
    <>
      <Checkbox
        name={checkboxInputName}
        value={checkboxValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          checkboxOnChange(event.target.checked)
        }
        disabled={disabled}
      >
        Generate images
      </Checkbox>
      {checkboxValue && (
        <>
          {numberOfImages && (
            <Select
              value={`${numberOfImages}`}
              label="Number of images"
              onChange={numberOfImagesOnChange}
              disabled={disabled}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <Option key={index + 1} value={`${index + 1}`}>
                  {index + 1}
                </Option>
              ))}
            </Select>
          )}
          <TextInput
            placeholder="Custom images prompt"
            label="Prompt"
            name={promptInputName}
            hint="Provide your own prompt to generate images. If left blank, the topic will be used as a prompt"
            disabled={disabled}
            onChange={promptOnChange}
            value={prompt}
          />
        </>
      )}
    </>
  );
};

export default ImagesOptions;
