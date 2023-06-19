import { ECollection } from '../../../../../../../../../../shared';
import { useCollectionContext } from '../../../../../../../../context';
import { useArticleContent } from './useArticleContent';

export const useCollectionContent = () => {
  const { collection } = useCollectionContext();

  const articleContent = useArticleContent();

  if (collection === ECollection.ARTICLE) return articleContent;

  return '';
};
