import generalController from './general.controller';
import multipleArticlesController from './multipleArticles.controller';
import singleArticleController from './singleArticle.controller';

export enum Controller {
  GENERAL = 'generalController',
  MULTIPLE_ARTICLES = 'multipleArticlesController',
  SINGLE_ARTICLE = 'singleArticleController',
}

export default {
  generalController,
  multipleArticlesController,
  singleArticleController,
};
