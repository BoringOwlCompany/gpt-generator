import { Service } from '../..';
import {
  Constant,
  IGeneratedFlashcardResponse,
  IGptCronCollection,
  IJobDetailsFlashcardsCollectionFields,
  IJobDetailsItem,
} from '../../../../shared';

export const generateFlashcard = async (item: IJobDetailsItem & { job: IGptCronCollection }) => {
  const data: IGeneratedFlashcardResponse = await strapi
    .plugin(Constant.PLUGIN_NAME)
    .service(Service.SINGLE_FLASHCARD)
    .generateFlashcard({ ...item, language: item.job.language });

  const savedFlashcard = await strapi
    .plugin(Constant.PLUGIN_NAME)
    .service(Service.GENERAL)
    .saveFlashcard({
      ...data,
      tagsIds: (item.job.details as IJobDetailsFlashcardsCollectionFields).tags?.map(
        (tag) => tag?.id
      ),
      language: item.job.language,
    });

  return {
    flashcardId: savedFlashcard.id,
  };
};
