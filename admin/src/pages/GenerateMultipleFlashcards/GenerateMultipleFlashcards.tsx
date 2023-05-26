import React from 'react';
import { ECollection } from '../../../../shared';
import { GenerateMultiple } from '../../components';
import { CollectionProvider } from '../../context';

const GenerateMultipleFlashcards = () => {
  return (
    <CollectionProvider collection={ECollection.FLASHCARD}>
      <GenerateMultiple />
    </CollectionProvider>
  );
};

export default GenerateMultipleFlashcards;
