import React, { useState } from 'react';
import { ModalLayout, ModalBody, ModalHeader, Typography } from '@strapi/design-system';
import GenerateTitlesForm from '../GenerateTitlesForm';
import { ITitleResponse } from '../../../../../../shared';
import AddJobForm from '../AddJobForm';

interface IProps {
  handleClose: () => void;
}

const AddJobModal = ({ handleClose }: IProps) => {
  const [titles, setTitles] = useState<ITitleResponse[] | null>(null);

  return (
    <ModalLayout onClose={handleClose} labelledBy="title">
      <ModalHeader color="white" labeledBy="">
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add new job
        </Typography>
      </ModalHeader>
      <ModalBody>
        {titles ? <AddJobForm titles={titles} /> : <GenerateTitlesForm setTitles={setTitles} />}
      </ModalBody>
    </ModalLayout>
  );
};

export default AddJobModal;
