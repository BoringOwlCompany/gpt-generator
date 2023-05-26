import {
  ECollection,
  IGptCronCollection,
  IJobDetails,
  Language,
} from '../../../../../../../shared';
import { getStatusFromJobDetails } from '../../../../../utils';
import { isArticleDetails, isFlashcardDetails } from '../../../../../utils/checkJobDetailsType';
import { mapArticleKeywords, mapFlashcardTags } from '../../../TableBody/mappers';
import { IJobDetailsData, IJobDetailsItemData } from '../JobDetailsModal.types';
import { mapArticleItem, mapFlashcardItem } from './mapCollection';

const mapItemsKeywords = (data: IJobDetails) => {
  if (isArticleDetails(data)) return mapArticleKeywords(data);
  if (isFlashcardDetails(data)) return mapFlashcardTags(data);
  return '';
};

const mapItemsDetails = (data: IJobDetails, language: Language): IJobDetailsItemData[] => {
  if (isArticleDetails(data)) return data.items.map((item) => mapArticleItem(item, language));
  if (isFlashcardDetails(data)) return data.items.map((item) => mapFlashcardItem(item, language));
  return [];
};

export const mapJobDetailsData = (data: IGptCronCollection | undefined): IJobDetailsData | null => {
  if (!data) return null;
  const status = getStatusFromJobDetails(data?.details);

  return {
    status,
    keywords: mapItemsKeywords(data.details),
    items: mapItemsDetails(data.details, data.language),
  };
};
