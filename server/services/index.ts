import generalService from './general.service';
import cronService from './cron.service';
import multipleArticlesService from './multipleArticles.service';
import singleArticleService from './singleArticle.service';

export enum Service {
  GENERAL = 'generalService',
  CRON = 'cronService',
  MULTIPLE_ARTICLES = 'multipleArticlesService',
  SINGLE_ARTICLE = 'singleArticleService',
}

export default {
  generalService,
  cronService,
  multipleArticlesService,
  singleArticleService,
};
