import { ECollection } from '../../../../../../../../../shared';
import { useCollectionContext } from '../../../../../../../context';
import { ArticleGlobalOptions } from './global-options/ArticleGlobalOptions';

export const useGlobalOptions = () => {
  const { collection } = useCollectionContext();

  if (collection === ECollection.ARTICLE) return ArticleGlobalOptions;

  return null;
};
