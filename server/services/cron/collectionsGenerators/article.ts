import { IGeneratedArticleResponse, IGptCronCollection, IJobDetailsItem } from '../../../../shared';
import { getService } from '../../../utils';

export const generateArticle = async (item: IJobDetailsItem & { job: IGptCronCollection }) => {
  const data: IGeneratedArticleResponse = await getService('singleArticleService').generateArticle({
    ...item,
    language: item.job.language,
  });

  const savedArticle = await getService('generalService').saveArticle({
    ...data,
    language: item.job.language,
  });

  return {
    articleId: savedArticle.id,
  };
};
