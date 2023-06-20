import { ECollection, IAdditionalData } from '../../../../../../../../../../shared';
import { useCollectionContext } from '../../../../../../../../context';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { getArticleAdditionalData } from './getArticleAdditionalData';

export const useAdditionalDataToPost = (): IAdditionalData => {
  const { collection } = useCollectionContext();
  const { modifiedData } = useCMEditViewDataManager();

  let additionalData = {};

  if (collection === ECollection.ARTICLE) additionalData = getArticleAdditionalData(modifiedData);

  return {
    collection,
    collectionId: modifiedData.id,
    ...additionalData,
  };
};
