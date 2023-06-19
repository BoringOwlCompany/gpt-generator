import React from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { ELength, filteredLengthPossibilitiesUp } from '../../../../../../../shared';

import { Checkbox, Select } from '../../../Form';

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
      <Checkbox<T> name={checkboxName} disabled={disabled} label="Generate video script" />
      {checkboxValue && (
        <Select<T>
          name={lengthName}
          label="Length of the video"
          options={filteredLengthPossibilitiesUp(ELength.HALF_MINUTE)}
          disabled={disabled}
        />
      )}
    </>
  );
};

export default VideoScriptOptions;
