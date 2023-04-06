import React from 'react';
import { ModalLayout, ModalBody, ModalHeader, Typography } from '@strapi/design-system';
import GenerateTitlesForm from '../GenerateTitlesForm';
import { Language } from '../../../../../../shared';
import AddJobForm from '../AddJobForm';
import { IHandleCloseOptions, useForm } from '../../../../hooks';

interface IProps {
  handleDone: () => void;
  handleClose: (options?: IHandleCloseOptions) => void;
}

export interface IForm {
  keywords: string;
  numberOfTitles: number;
  language: Language;
  titles: string[];
}

const AddJobModal = ({ handleClose, handleDone }: IProps) => {
  const form = useForm<IForm>({
    keywords: '',
    numberOfTitles: 5,
    language: Language.PL,
    titles: [],
  });

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
        {form.state.titles.length ? (
          <AddJobForm handleFinish={handleFinish} titlesFormState={form.state} />
        ) : (
          <GenerateTitlesForm form={form} />
        )}
      </ModalBody>
    </ModalLayout>
  );
};

export default AddJobModal;
