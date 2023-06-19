import React from 'react';
import { Button, Flex, FieldLabel } from '@strapi/design-system';
import { FormProvider, useForm } from 'react-hook-form';
import {
  ELength,
  filteredLengthPossibilitiesDown,
  IPublishPostsRequest,
  Language,
  languagesOptions,
  socialMediaOptions,
} from '../../../../../../../../shared';
import { Checkbox, FormWrapper, Select } from '../../../../../Global';
import { useGpt } from '../../../../../../hooks';
import { useFirstStep } from './hooks/useFirstStep';

interface IProps {
  setResult: React.Dispatch<React.SetStateAction<IPublishPostsRequest | null>>;
}

const FirstStep = ({ setResult }: IProps) => {
  const { statusMessage, isError, isLoading, generatePostContent } = useGpt();
  const { collectionContent, additionalData } = useFirstStep();
  const methods = useForm<IPublishPostsRequest>({
    defaultValues: {
      language: Language.PL,
      prefferedLength: ELength.TWENTY_SECONDS,
      publishOn: socialMediaOptions.reduce((acc, { label }) => ({ ...acc, [label]: false }), {}),
    },
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const state = methods.getValues();

    const { posts } = await generatePostContent({
      ...state,
      additionalData,
      collectionContent,
    });

    setResult({
      ...state,
      posts,
    });
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper onSubmit={handleGenerate}>
        <Select<IPublishPostsRequest>
          name="language"
          label="Language"
          disabled={isLoading}
          isError={isError}
          hint={statusMessage}
          options={languagesOptions}
        />
        <Select<IPublishPostsRequest>
          name="prefferedLength"
          label="Preffered length"
          disabled={isLoading}
          options={filteredLengthPossibilitiesDown(ELength.HALF_MINUTE)}
        />
        <Flex direction="column" alignItems="start" gap={1}>
          <FieldLabel>Publish on</FieldLabel>
          {socialMediaOptions.map(({ label }) => (
            <Checkbox<IPublishPostsRequest>
              disabled={isLoading}
              name={`publishOn.${label}`}
              label={label}
            />
          ))}
        </Flex>
        <Button loading={isLoading} disabled={isLoading} type="submit">
          Submit
        </Button>
      </FormWrapper>
    </FormProvider>
  );
};

export default FirstStep;
