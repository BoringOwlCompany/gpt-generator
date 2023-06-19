import { ECollection } from '../../../../../../../../shared';
import { useCollectionContext } from '../../../../../../context';

export const useTitle = () => {
  const { collection } = useCollectionContext();

  if (collection === ECollection.ARTICLE) return 'article';

  return '';
};
