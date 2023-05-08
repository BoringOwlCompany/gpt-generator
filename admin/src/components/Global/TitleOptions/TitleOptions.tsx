import React from 'react';

import { Flex } from '@strapi/design-system';

import {
  ITitleOptionsImagesProps,
  ITitleOptionsVideoScriptProps,
  ImagesOptions,
  VideoScriptOptions,
} from './components';

interface IProps {
  imagesOptions: ITitleOptionsImagesProps;
  videoScriptOptions: ITitleOptionsVideoScriptProps;
  disabled?: boolean;
}

const TitleOptions = ({ disabled, imagesOptions, videoScriptOptions }: IProps) => {
  return (
    <Flex direction="column" alignItems="start" gap={2}>
      <ImagesOptions {...imagesOptions} disabled={disabled} />
      <VideoScriptOptions {...videoScriptOptions} disabled={disabled} />
    </Flex>
  );
};

export default TitleOptions;
