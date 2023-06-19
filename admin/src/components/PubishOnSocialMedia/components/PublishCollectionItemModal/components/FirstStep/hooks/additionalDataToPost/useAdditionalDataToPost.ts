import { ECollection, IAdditionalData } from '../../../../../../../../../../shared';
import { useCollectionContext } from '../../../../../../../../context';
import { useArticleAdditionalData } from './useArticleAdditionalData';

export const useAdditionalDataToPost = (): IAdditionalData => {
  const { collection } = useCollectionContext();

  const articleAdditionalData = useArticleAdditionalData();

  if (collection === ECollection.ARTICLE) return articleAdditionalData;

  return {};
};
