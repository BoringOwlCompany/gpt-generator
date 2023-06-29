import React, { useState } from 'react';
import { ModalLayout, ModalHeader, Typography } from '@strapi/design-system';
import GenerateArticleResultForm from '../GenerateArticleResultForm';
import GenerateArticleForm from '../GenerateArticleForm';
import { IGeneratedArticleResponse } from '../../../../../../../../shared';
import { IModalProps } from '../../../../../../types';

const GenerateArticleModal = ({ handleClose }: IModalProps) => {
  const [result, setResult] = useState<IGeneratedArticleResponse | null>(null);

  return (
    <ModalLayout onClose={handleClose} labelledBy="title">
      <ModalHeader color="white" labeledBy="">
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Generate article
        </Typography>
      </ModalHeader>
      {result ? (
        <GenerateArticleResultForm
          initialValues={result}
          handleClose={handleClose}
          onClearResult={() => setResult(null)}
        />
      ) : (
        <GenerateArticleForm setResult={setResult} />
      )}
    </ModalLayout>
  );
};

export default GenerateArticleModal;
