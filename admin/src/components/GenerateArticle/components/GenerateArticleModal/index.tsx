import React, { useState } from 'react';
import { ModalLayout, ModalHeader, Typography } from '@strapi/design-system';
import GenerateArticleResultForm from '../GenerateArticleResultForm';
import GenerateArticleForm from '../GenerateArticleForm';
import { IComponentProps } from '../../../../types';
import { IGeneratedArticleResponse } from '../../../../../../shared';

interface IProps {
  onClose: () => void;
}

const GenerateArticleModal = ({ onClose, ...props }: IProps & IComponentProps) => {
  const [result, setResult] = useState<IGeneratedArticleResponse | null>(null);

  return (
    <ModalLayout onClose={onClose} labelledBy="title">
      <ModalHeader color="white" labeledBy="">
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Generate article
        </Typography>
      </ModalHeader>
      {result ? (
        <GenerateArticleResultForm
          data={result}
          onClose={onClose}
          onClearResult={() => setResult(null)}
          {...props}
        />
      ) : (
        <GenerateArticleForm setResult={setResult} />
      )}
    </ModalLayout>
  );
};

export default GenerateArticleModal;
