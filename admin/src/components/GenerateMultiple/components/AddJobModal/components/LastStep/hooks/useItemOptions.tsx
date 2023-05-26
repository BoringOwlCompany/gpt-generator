import { ECollection } from '../../../../../../../../../shared';
import { useCollectionContext } from '../../../../../../../context';
import { ArticleItemOptions } from './item-options/ArticleItemOptions';

export const useItemOptions = () => {
  const { collection } = useCollectionContext();

  if (collection === ECollection.ARTICLE) return ArticleItemOptions;

  return null;
};
