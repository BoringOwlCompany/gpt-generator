import React, { useState } from 'react';
import { Button } from '@strapi/design-system';
import { Magic } from '@strapi/icons';

import { GenerateArticleModal } from './components';

import * as S from './GenerateSingle.styled';
import { IComponentProps } from '../../types';
import { useModal } from '../../hooks';

const collectionsToGenerate = [
  {
    slug: 'api::article.article',
    modal: GenerateArticleModal,
  },
];

const GenerateSingle = ({ slug }: IComponentProps) => {
  const [isOpen, handleClose, handleOpen] = useModal({ confirmClose: true });

  const currentCollection = collectionsToGenerate.find((collection) => collection.slug === slug);

  if (!currentCollection) return null;

  return (
    <S.Container>
      <Button onClick={handleOpen} endIcon={<Magic />}>
        Generate with AI
      </Button>
      {isOpen && <currentCollection.modal handleClose={handleClose} />}
    </S.Container>
  );
};

export default GenerateSingle;
