import React from 'react';
import { Button } from '@strapi/design-system';
import { ExternalLink } from '@strapi/icons';
import { IComponentProps } from '../../types';
import { useModal } from '../../hooks';
import { ECollection } from '../../../../shared';
import { CollectionProvider } from '../../context';
import { PublishCollectionItemModal } from './components';

const collectionsToPublish = [
  {
    slug: 'api::article.article',
    collection: ECollection.ARTICLE,
  },
];

const PubishOnSocialMedia = ({ slug }: IComponentProps) => {
  const [isOpen, handleClose, handleOpen] = useModal({ confirmClose: true });

  const currentCollection = collectionsToPublish.find((collection) => collection.slug === slug);

  if (!currentCollection) return null;

  return (
    <>
      <Button onClick={handleOpen} startIcon={<ExternalLink />} variant="secondary">
        Publish on social media
      </Button>
      <CollectionProvider collection={currentCollection.collection}>
        {isOpen && <PublishCollectionItemModal handleClose={handleClose} />}
      </CollectionProvider>
    </>
  );
};

export default PubishOnSocialMedia;
