import {
  IGeneratedFlashcardResponse,
  IGptCronCollection,
  IJobDetailsFlashcardsCollectionFields,
  IJobDetailsItem,
} from '../../../../shared';
import { getService } from '../../../utils';

export const generateFlashcard = async (item: IJobDetailsItem & { job: IGptCronCollection }) => {
  const data: IGeneratedFlashcardResponse = await getService(
    'singleFlashcardService'
  ).generateFlashcard({ ...item, language: item.job.language });

  const details = item.job.details as IJobDetailsFlashcardsCollectionFields;
  const tagsIds = details.tags?.map((tag) => tag?.id).filter((id): id is number => !!id) || [];

  const savedFlashcard = await getService('generalService').saveFlashcard({
    ...data,
    tagsIds,
    language: item.job.language,
  });

  return {
    flashcardId: savedFlashcard.id,
  };
};
