import {
  getLanguageCode,
  IJobDetailsItem,
  IJobDetailsItemsArticlesCollectionFields,
  IJobDetailsItemsFlashcardsCollectionFields,
  Language,
} from '../../../../../../../shared';
import { IJobDetailsItemData } from '../JobDetailsModal.types';

export const mapArticleItem = (
  {
    timestamp,
    status,
    log,
    title,
    articleId,
  }: IJobDetailsItem & IJobDetailsItemsArticlesCollectionFields,
  language: Language
): IJobDetailsItemData => {
  return {
    timestamp,
    status: status || 'idle',
    log,
    title: title || '',
    link: `/content-manager/collectionType/api::article.article/${articleId}?plugins[i18n][locale]=${getLanguageCode(
      language
    )}`,
  };
};

export const mapFlashcardItem = (
  {
    status,
    timestamp,
    flashcardId,
    log,
    question,
  }: IJobDetailsItem & IJobDetailsItemsFlashcardsCollectionFields,
  language: Language
): IJobDetailsItemData => {
  return {
    timestamp,
    status: status || 'idle',
    title: question || '',
    log,
    link: `/content-manager/collectionType/api::flashcard.flashcard/${flashcardId}?plugins[i18n][locale]=${getLanguageCode(
      language
    )}`,
  };
};
