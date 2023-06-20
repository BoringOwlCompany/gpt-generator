import { ECollection, IAdditionalData } from '../../../../../../../../../../shared';
import { useCollectionContext } from '../../../../../../../../context';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { getArticleAdditionalData } from './getArticleAdditionalData';

export const useAdditionalDataToPost = (): IAdditionalData => {
  const { collection } = useCollectionContext();
  const { modifiedData } = useCMEditViewDataManager();

  const additionalData = (() => {
    if (collection === ECollection.ARTICLE)
      return getArticleAdditionalData({ collectionData: modifiedData });

    return {};
  })();

  return {
    collection,
    collectionId: modifiedData.id,
    ...additionalData,
  };
};
