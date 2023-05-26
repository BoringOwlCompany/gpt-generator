import { IGptCronCollection, IJobDetails } from '../../../../../../shared';
import { getStatusFromJobDetails } from '../../../../utils';
import { isArticleDetails, isFlashcardDetails } from '../../../../utils/checkJobDetailsType';
import { ITableData } from '../TableBody.types';
import { mapArticleKeywords, mapFlashcardTags } from './mapCollection';

const mapItemDetails = (details: IJobDetails) => {
  if (isArticleDetails(details)) return mapArticleKeywords(details);
  if (isFlashcardDetails(details)) return mapFlashcardTags(details);
  return '';
};

export const mapTableData = (data: IGptCronCollection[] | undefined): ITableData[] => {
  return (
    data?.map(({ createdAt, id, details, language }) => {
      const isDone = details.items.every(({ status }) => status !== 'idle' && status !== 'loading');
      const finishedItems = details.items.filter(
        ({ status }) => status !== 'idle' && status !== 'loading'
      );

      const numberOfFinishedItems = finishedItems.length;
      const status = getStatusFromJobDetails(details);

      return {
        createdAt,
        id,
        language,
        isDone,
        numberOfFinishedItems,
        itemsDetails: mapItemDetails(details),
        numberOfItems: details.items.length,
        status,
      };
    }) || []
  );
};
