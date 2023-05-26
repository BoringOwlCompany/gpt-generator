import React, { useState } from 'react';
import { Button } from '@strapi/design-system';

import { useGpt } from '../../../../../../hooks';
import { Constant, Language } from '../../../../../../../../shared';
import { AbsoluteProgress, FormWrapper, Select } from '../../../../../Global';
import { useCollectionContext } from '../../../../../../context';
import CollectionFields from './CollectionFields';
import { useForm, FormProvider } from 'react-hook-form';
import { IForm } from '../../AddJobModal';
import { getIsSubmitDisabled } from './utils/getIsSubmitDisabled';

interface IProps {
  setResult: (state: IForm) => void;
}

const FirstStep = ({ setResult }: IProps) => {
  const { isError, isLoading, statusMessage, progress, generateDetailsForMultipleGenerator } =
    useGpt();
  const { collection } = useCollectionContext();
  const methods = useForm<IForm>({
    defaultValues: {
      keywords: '',
      numberOfItems: 5,
      language: Language.PL,
      details: [],
      tags: [],
    },
  });
  const [maxProgress, setMaxProgress] = useState(0);

  const onSubmit = async (values: IForm) => {
    setMaxProgress(Math.floor(values.numberOfItems / Constant.TITLES_TO_GENERATE_PER_REQUEST));

    const detailsResponse = await generateDetailsForMultipleGenerator(values, collection);
    if (!detailsResponse) return;

    setResult({
      ...values,
      details: detailsResponse.map(({ title }) => title),
    });
  };

  const isSubmitDisabled = getIsSubmitDisabled(methods.watch());

  return (
    <>
      <AbsoluteProgress show={isLoading} max={maxProgress} value={progress} />
      <FormWrapper onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Select<IForm>
            label="Language"
            name="language"
            hint={statusMessage}
            disabled={isLoading}
            isError={isError}
            options={Object.values(Language).map((lang) => ({ label: lang, value: lang }))}
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
