import { Service } from '../..';
import {
  Constant,
  IGeneratedArticleResponse,
  IGptCronCollection,
  IJobDetailsItem,
} from '../../../../shared';

export const generateArticle = async (item: IJobDetailsItem & { job: IGptCronCollection }) => {
  const data: IGeneratedArticleResponse = await strapi
    .plugin(Constant.PLUGIN_NAME)
    .service(Service.SINGLE_ARTICLE)
    .generateArticle({ ...item, language: item.job.language });

  const savedArticle = await strapi
    .plugin(Constant.PLUGIN_NAME)
    .service(Service.GENERAL)
    .saveArticle({ ...data, language: item.job.language });

  return {
    articleId: savedArticle.id,
  };
};
