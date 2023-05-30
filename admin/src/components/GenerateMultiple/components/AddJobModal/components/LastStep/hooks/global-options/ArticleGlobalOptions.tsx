import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useIndeterminateCheckbox } from '../../../../../../../../hooks';
import { IFinalForm } from '../../LastStep.types';
import { Flex, Checkbox } from '@strapi/design-system';
import { IJobDetailsItemsArticlesCollectionFields } from '../../../../../../../../../../shared';

interface IProps {
  disabled: boolean;
}

export const ArticleGlobalOptions = ({ disabled }: IProps) => {
  const { watch, setValue } = useFormContext<IFinalForm>();

  const items = watch('items') as IJobDetailsItemsArticlesCollectionFields[];

  const { allImages, allVideoScripts } = useIndeterminateCheckbox({
    allImages: items.map((item) => item.image?.isActive || false),
    allVideoScripts: items.map((item) => item.videoScript?.isActive || false),
  });

  const setAllImages = (checked: boolean) =>
    items.forEach((_, index) => setValue(`items.${index}.image.isActive`, checked));

  const setAllVideoScripts = (checked: boolean) =>
    items.forEach((_, index) => setValue(`items.${index}.videoScript.isActive`, checked));

  return (
    <Flex gap={2}>
      <Checkbox
        value={allImages === true}
        disabled={disabled}
        indeterminate={allImages === 'indeterminate'}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAllImages(e.target.checked)}
      >
        Generate all images
      </Checkbox>
      <Checkbox
        value={allVideoScripts === true}
        disabled={disabled}
        indeterminate={allVideoScripts === 'indeterminate'}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAllVideoScripts(e.target.checked)}
      >
        Generate all video scripts
      </Checkbox>
    </Flex>
  );
};
