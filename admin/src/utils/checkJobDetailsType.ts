import {
  IJobDetailsFlashcardsCollectionFields,
  IJobDetailsArticlesCollectionFields,
  IJobDetailsCollectionFields,
} from '../../../shared';

export const isArticleDetails = (
  details: IJobDetailsCollectionFields
): details is IJobDetailsArticlesCollectionFields => {
  return (details as IJobDetailsArticlesCollectionFields).keywords !== undefined;
};

export const isFlashcardDetails = (
  details: IJobDetailsCollectionFields
): details is IJobDetailsFlashcardsCollectionFields => {
  return (details as IJobDetailsFlashcardsCollectionFields).tags !== undefined;
};
