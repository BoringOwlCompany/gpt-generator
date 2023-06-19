import React, { useState } from 'react';
import { Button, Flex, FieldLabel, Icon } from '@strapi/design-system';
import { Check } from '@strapi/icons';
import {
  socialMediaLengthRestrictions,
  ESocialMediaProvider,
  IPublishPostsRequest,
} from '../../../../../../../../shared';
import { FormProvider, useForm } from 'react-hook-form';
import { FormWrapper, TextArea } from '../../../../../Global';
import { useGpt } from '../../../../../../hooks';
import { IModalProps } from '../../../../../../types';

interface IProps {
  defaultValues: IPublishPostsRequest;
  handleClose: IModalProps['handleClose'];
}

const LastStep = ({ defaultValues, handleClose }: IProps) => {
  const { publishPosts, isError, isLoading, statusMessage } = useGpt();
  const [publishedProviders, setPublishedProviders] = useState<ESocialMediaProvider[]>([]);
  const methods = useForm<IPublishPostsRequest>({
    defaultValues,
  });

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const formState = methods.getValues();
    const res = await publishPosts(formState);

    if (!res) return;

    res.data.forEach(({ provider, response }) => {
      if (response?.status === 'error') {
        methods.setError(`posts.${provider}.post`, { message: response?.message });
      } else {
        methods.setValue(`publishOn`, {
          ...formState.publishOn,
          [provider]: false,
        });
        setPublishedProviders((prev) => [...prev, provider]);
      }
    });
  };

  const buttonLabel = publishedProviders.length > 0 ? 'Try again' : 'Publish';

  return (
    <FormProvider {...methods}>
      <FormWrapper onSubmit={handlePublish}>
        {(Object.keys(defaultValues.posts) as ESocialMediaProvider[]).map((provider) => {
          const isPublished = publishedProviders.includes(provider);

          if (isPublished)
            return (
              <Flex alignItems="center" gap={1}>
                <FieldLabel>{provider}</FieldLabel>
                <Icon
                  as={Check}
                  colors={(theme: any) => ({
                    path: {
                      fill: theme.colors.success600,
                    },
                  })}
                />
              </Flex>
            );

          return (
            <TextArea<IPublishPostsRequest>
              style={{
                minHeight: '100px',
              }}
              hint={statusMessage}
              isError={isError}
              disabled={isLoading || isPublished}
              name={`posts.${provider}.post`}
              label={`Post for ${provider}`}
              maxLength={socialMediaLengthRestrictions[provider]}
            />
          );
        })}
        {Object.keys(defaultValues.posts).length === publishedProviders.length ? (
          <Button
            onClick={() => handleClose({ withConfirmation: false })}
            variant="secondary"
            type="button"
          >
            Close
          </Button>
        ) : (
          <Button loading={isLoading} disabled={isLoading} type="submit">
            {buttonLabel}
          </Button>
        )}
      </FormWrapper>
    </FormProvider>
  );
};

export default LastStep;
