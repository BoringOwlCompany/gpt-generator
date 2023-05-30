import { ECollection, IGptCronCollection, IJobDetailsItem } from '../../../../shared';
import { generateArticle } from './article';
import { generateFlashcard } from './flashcard';

export const generateItem = async (item: IJobDetailsItem & { job: IGptCronCollection }) => {
  if (item.job.collection === ECollection.ARTICLE) return await generateArticle(item);
  if (item.job.collection === ECollection.FLASHCARD) return await generateFlashcard(item);

  return {};
};
