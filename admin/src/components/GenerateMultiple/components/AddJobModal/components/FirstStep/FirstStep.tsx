import React, { useState } from 'react';
import { Button } from '@strapi/design-system';

import { useGpt } from '../../../../../../hooks';
import { Constant, Language, languagesOptions } from '../../../../../../../../shared';
import { AbsoluteProgress, FormWrapper, Select } from '../../../../../Global';
import { useCollectionContext } from '../../../../../../context';
import CollectionFields from './CollectionFields';
import { useForm, FormProvider } from 'react-hook-form';
import { IFirstStepForm } from '../../AddJobModal';
import { getIsSubmitDisabled } from './utils/getIsSubmitDisabled';

interface IProps {
  setResult: (state: IFirstStepForm) => void;
}

const FirstStep = ({ setResult }: IProps) => {
  const { isError, isLoading, statusMessage, progress, generateItemsForMultipleGenerator } =
    useGpt();
  const { collection } = useCollectionContext();
  const methods = useForm<IFirstStepForm>({
    defaultValues: {
      keywords: '',
      numberOfItems: 5,
      language: Language.PL,
      items: [],
      tags: [],
    },
  });
  const [maxProgress, setMaxProgress] = useState(0);

  const onSubmit = async (values: IFirstStepForm) => {
    setMaxProgress(Math.floor(values.numberOfItems / Constant.TITLES_TO_GENERATE_PER_REQUEST));

    const itemsResponse = await generateItemsForMultipleGenerator(values, collection);
    if (!itemsResponse) return;

    setResult({
      ...values,
      items: itemsResponse.map(({ title }) => title),
    });
  };

  const isSubmitDisabled = getIsSubmitDisabled(methods.watch());

  return (
    <>
      <AbsoluteProgress show={isLoading} max={maxProgress} value={progress} />
      <FormWrapper onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Select<IFirstStepForm>
            label="Language"
            name="language"
            hint={statusMessage}
            disabled={isLoading}
            isError={isError}
            options={languagesOptions}
          />
          <CollectionFields isLoading={isLoading} />

          <Button loading={isLoading} disabled={isLoading || isSubmitDisabled} type="submit">
            Submit
          </Button>
        </FormProvider>
      </FormWrapper>
    </>
  );
};

export default FirstStep;
