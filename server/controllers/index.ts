import generalController from './general.controller';
import multipleController from './multiple.controller';
import multipleArticlesController from './multipleArticles.controller';
import multipleFlashcardsController from './multipleFlashcards.controller';
import singleArticleController from './singleArticle.controller';

export enum Controller {
  GENERAL = 'generalController',
  MULTIPLE = 'multipleController',
  MULTIPLE_ARTICLES = 'multipleArticlesController',
  MULTIPLE_FLASHCARDS = 'multipleFlashcardsController',
  SINGLE_ARTICLE = 'singleArticleController',
}

export default {
  generalController,
  multipleController,
  multipleArticlesController,
  multipleFlashcardsController,
  singleArticleController,
};
