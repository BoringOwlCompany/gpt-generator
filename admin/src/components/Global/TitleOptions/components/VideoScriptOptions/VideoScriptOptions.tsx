import React from 'react';

import { Checkbox, Select, Option } from '@strapi/design-system';
import { VideoLength } from '../../../../../../../shared';
import { videoLengthPossibilities } from './VideoScriptOptions.config';

export interface ITitleOptionsVideoScriptProps {
  checkboxValue: boolean;
  checkboxOnChange: (value: boolean) => void;

  length: VideoLength;
  lengthInputName?: string;
  lengthOnChange: (value: VideoLength) => void;

  disabled?: boolean;
}

const VideoScriptOptions = ({
  disabled,
  checkboxValue,
  checkboxOnChange,
  length,
  lengthInputName,
  lengthOnChange,
}: ITitleOptionsVideoScriptProps) => {
  return (
    <>
      <Checkbox
        value={checkboxValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          checkboxOnChange(event.target.checked)
        }
        disabled={disabled}
      >
        Generate video script
      </Checkbox>
      {checkboxValue && (
        <Select
          name={lengthInputName}
          value={`${length}`}
          label="Length of the video"
          onChange={lengthOnChange}
          disabled={disabled}
        >
          {videoLengthPossibilities.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      )}
    </>
  );
};

export default VideoScriptOptions;
