import generalController from './general.controller';
import multipleController from './multiple.controller';
import multipleArticlesController from './multipleArticles.controller';
import singleArticleController from './singleArticle.controller';

export enum Controller {
  GENERAL = 'generalController',
  MULTIPLE = 'multipleController',
  MULTIPLE_ARTICLES = 'multipleArticlesController',
  SINGLE_ARTICLE = 'singleArticleController',
}

export default {
  generalController,
  multipleController,
  multipleArticlesController,
  singleArticleController,
};
