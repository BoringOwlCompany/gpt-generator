import React from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { Checkbox, Select } from '../../../Form';
import { videoLengthPossibilities } from './VideoScriptOptions.config';

export interface ITitleOptionsVideoScriptProps<T extends FieldValues> {
  checkboxName: FieldPath<T>;
  lengthName: FieldPath<T>;

  disabled?: boolean;
}

const VideoScriptOptions = <T extends FieldValues>({
  disabled,
  checkboxName,
  lengthName,
}: ITitleOptionsVideoScriptProps<T>) => {
  const { watch } = useFormContext();
  const checkboxValue = watch(checkboxName);
  return (
    <>
      <Checkbox name={checkboxName} disabled={disabled}>
        Generate video script
      </Checkbox>
      {checkboxValue && (
        <Select
          name={lengthName}
          label="Length of the video"
          options={videoLengthPossibilities.map(({ label, value }) => ({
            label,
            value,
          }))}
          disabled={disabled}
        />
      )}
    </>
  );
};

export default VideoScriptOptions;
