import React from 'react';
import { ECollection } from '../../../../shared';
import { GenerateMultiple } from '../../components';
import { CollectionProvider } from '../../context';

const GenerateMultipleArticles = () => {
  return (
    <CollectionProvider collection={ECollection.ARTICLE}>
      <GenerateMultiple />
    </CollectionProvider>
  );
};

export default GenerateMultipleArticles;
