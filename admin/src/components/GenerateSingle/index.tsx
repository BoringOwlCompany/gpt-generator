import React, { useState } from 'react';
import { Button } from '@strapi/design-system';
import { Magic } from '@strapi/icons';

import { GenerateArticleModal } from './components';

import * as S from './GenerateSingle.styled';
import { IComponentProps } from '../../types';

const collectionsToGenerate = [
  {
    slug: 'api::article.article',
    modal: GenerateArticleModal,
  },
];

const GenerateSingle = ({ slug }: IComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentCollection = collectionsToGenerate.find((collection) => collection.slug === slug);

  if (!currentCollection) return null;

  return (
    <S.Container>
      <Button onClick={() => setIsOpen(true)} endIcon={<Magic />}>
        Generate with AI
      </Button>
      {isOpen && <currentCollection.modal handleClose={() => setIsOpen(false)} />}
    </S.Container>
  );
};

export default GenerateSingle;
