import generalService from './general.service';
import cronService from './cron.service';
import multipleService from './multiple.service';
import multipleArticlesService from './multipleArticles.service';
import singleArticleService from './singleArticle.service';

export enum Service {
  GENERAL = 'generalService',
  CRON = 'cronService',
  MULTIPLE = 'multipleService',
  MULTIPLE_ARTICLES = 'multipleArticlesService',
  SINGLE_ARTICLE = 'singleArticleService',
}

export default {
  generalService,
  cronService,
  multipleService,
  multipleArticlesService,
  singleArticleService,
};
