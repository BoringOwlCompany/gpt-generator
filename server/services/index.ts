import generalService from './general.service';
import cronService from './cron/cron.service';
import multipleService from './multiple.service';
import multipleArticlesService from './multipleArticles.service';
import multipleFlashcardsService from './multipleFlashcards.service';
import singleArticleService from './singleArticle.service';
import singleFlashcardService from './singleFlashcard.service';
import socialMediaService from './socialMedia/socialMedia.service';
import twitterService from './socialMedia/twitter.service';
import linkedinService from './socialMedia/linkedin.service';

export enum Service {
  GENERAL = 'generalService',
  CRON = 'cronService',
  MULTIPLE = 'multipleService',
  MULTIPLE_ARTICLES = 'multipleArticlesService',
  MULTIPLE_FLASHCARDS = 'multipleFlashcardsService',
  SINGLE_ARTICLE = 'singleArticleService',
  SINGLE_FLASHCARD = 'singleFlashcardService',
  SOCIAL_MEDIA = 'socialMediaService',
  TWITTER = 'twitterService',
  LINKEDIN = 'linkedinService',
}

export default {
  generalService,
  cronService,
  multipleService,
  multipleArticlesService,
  multipleFlashcardsService,
  singleArticleService,
  singleFlashcardService,
  socialMediaService,
  twitterService,
  linkedinService,
};
