import React from 'react';

import { Flex } from '@strapi/design-system';

import {
  ITitleOptionsImagesProps,
  ITitleOptionsVideoScriptProps,
  ImagesOptions,
  VideoScriptOptions,
} from './components';
import { FieldValues } from 'react-hook-form';

interface IProps<T extends FieldValues> {
  imagesOptions: ITitleOptionsImagesProps<T>;
  videoScriptOptions: ITitleOptionsVideoScriptProps<T>;
  disabled?: boolean;
}

const TitleOptions = <T extends FieldValues>({
  disabled,
  imagesOptions,
  videoScriptOptions,
}: IProps<T>) => {
  return (
    <Flex direction="column" alignItems="start" gap={2}>
      <ImagesOptions<T> {...imagesOptions} disabled={disabled} />
      <VideoScriptOptions<T> {...videoScriptOptions} disabled={disabled} />
    </Flex>
  );
};

export default TitleOptions;
