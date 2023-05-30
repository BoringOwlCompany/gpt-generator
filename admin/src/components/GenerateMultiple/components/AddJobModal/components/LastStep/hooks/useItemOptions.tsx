import { ECollection } from '../../../../../../../../../shared';
import { useCollectionContext } from '../../../../../../../context';
import { ArticleItemOptions } from './item-options/ArticleItemOptions';
import { FlashcardItemOptions } from './item-options/FlashcardItemOptions';

export const useItemOptions = () => {
  const { collection } = useCollectionContext();

  if (collection === ECollection.ARTICLE) return ArticleItemOptions;
  if (collection === ECollection.FLASHCARD) return FlashcardItemOptions;

  return null;
};
