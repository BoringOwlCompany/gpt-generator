import React, { useState } from 'react';
import { ModalLayout, ModalBody, ModalHeader, Typography } from '@strapi/design-system';
import { Cron, IRelationalCollectionResponse, Language } from '../../../../../../shared';
import { IHandleCloseOptions } from '../../../../hooks';
import FirstStep from './components/FirstStep';
import LastStep from './components/LastStep';
import { FormProvider, useForm } from 'react-hook-form';
import { IFinalForm } from './components/LastStep/LastStep.types';
import { getCollectionSpecificFields, getRoundedHour } from './components/LastStep/LastStep.utils';
import { useCollectionContext } from '../../../../context';

interface IProps {
  handleDone: () => void;
  handleClose: (options?: IHandleCloseOptions) => void;
}

export interface IForm {
  keywords: string;
  numberOfItems: number;
  language: Language;
  details: string[];
  tags: IRelationalCollectionResponse[];
}

const AddJobModal = ({ handleClose, handleDone }: IProps) => {
  const [firstStepResult, setFirstStepResult] = useState<IForm | null>(null);
  const { collection } = useCollectionContext();
  const methods = useForm<IFinalForm>({
    defaultValues: {
      firstItemGenerationTime: getRoundedHour(),
      interval: Cron.ONE_HOUR,
      items: [],
    },
  });

  const setResult = (state: IForm) => {
    setFirstStepResult(state);
    methods.setValue(
      'items',
      state?.details.map((title) => ({
        title,
        collection,
        ...getCollectionSpecificFields(collection),
      }))
    );
  };

  const items = methods.watch('items');

  const handleFinish = () => {
    handleClose({ withConfirmation: false });
    handleDone();
  };

  return (
    <ModalLayout onClose={handleClose} labelledBy="title">
      <ModalHeader color="white" labeledBy="">
        <Typography fontWeight="bold" as="h2" id="title">
          Add new job
        </Typography>
      </ModalHeader>
      <ModalBody style={{ position: 'relative' }}>
        {Boolean(items.length) && firstStepResult ? (
          <FormProvider {...methods}>
            <LastStep initialValues={firstStepResult} handleFinish={handleFinish} />
          </FormProvider>
        ) : (
          <FirstStep setResult={setResult} />
        )}
      </ModalBody>
    </ModalLayout>
  );
};

export default AddJobModal;
