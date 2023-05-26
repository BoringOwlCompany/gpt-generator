import {
  IJobDetailsArticlesCollectionFields,
  IJobDetailsFlashcardsCollectionFields,
} from '../../../../../../shared';

export const mapArticleKeywords = (data: IJobDetailsArticlesCollectionFields): string =>
  data.keywords || '';

export const mapFlashcardTags = (data: IJobDetailsFlashcardsCollectionFields): string =>
  data.tags?.map((item) => item?.slug || '').join(', ') || '';
