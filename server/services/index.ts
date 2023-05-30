import generalService from './general.service';
import cronService from './cron/cron.service';
import multipleService from './multiple.service';
import multipleArticlesService from './multipleArticles.service';
import multipleFlashcardsService from './multipleFlashcards.service';
import singleArticleService from './singleArticle.service';
import singleFlashcardService from './singleFlashcard.service';

export enum Service {
  GENERAL = 'generalService',
  CRON = 'cronService',
  MULTIPLE = 'multipleService',
  MULTIPLE_ARTICLES = 'multipleArticlesService',
  MULTIPLE_FLASHCARDS = 'multipleFlashcardsService',
  SINGLE_ARTICLE = 'singleArticleService',
  SINGLE_FLASHCARD = 'singleFlashcardService',
}

export default {
  generalService,
  cronService,
  multipleService,
  multipleArticlesService,
  multipleFlashcardsService,
  singleArticleService,
  singleFlashcardService,
};
