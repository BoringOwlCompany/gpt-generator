import React, { useState } from 'react';
import { ModalLayout, ModalBody, ModalHeader, Typography } from '@strapi/design-system';
import { usePublishCollectionItem } from './hooks/usePublishCollectionItem.hook';
import { IModalProps } from '../../../../types';
import { IPublishPostsRequest } from '../../../../../../shared';
import { FirstStep, LastStep } from './components';

const PublishCollectionItemModal = ({ handleClose }: IModalProps) => {
  const [result, setResult] = useState<IPublishPostsRequest | null>(null);
  const { title } = usePublishCollectionItem();

  return (
    <ModalLayout onClose={handleClose} labelledBy="title">
      <ModalHeader color="white" labeledBy="">
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Publish {title}
        </Typography>
      </ModalHeader>
      <ModalBody>
        {result ? (
          <LastStep handleClose={handleClose} defaultValues={result} />
        ) : (
          <FirstStep setResult={setResult} />
        )}
      </ModalBody>
    </ModalLayout>
  );
};

export default PublishCollectionItemModal;
