import generalService from './general.service';
import cronService from './cron/cron.service';
import multipleService from './multiple.service';
import multipleArticlesService from './multipleArticles.service';
import multipleFlashcardsService from './multipleFlashcards.service';
import singleArticleService from './singleArticle.service';
import singleFlashcardService from './singleFlashcard.service';
import calendarService from './calendar.service';

import socialMediaService from './socialMedia/socialMedia.service';
import twitterService from './socialMedia/twitter.service';
import linkedinService from './socialMedia/linkedin.service';
import facebookService from './socialMedia/facebook.service';

export enum Service {
  GENERAL = 'generalService',
  CRON = 'cronService',
  MULTIPLE = 'multipleService',
  MULTIPLE_ARTICLES = 'multipleArticlesService',
  MULTIPLE_FLASHCARDS = 'multipleFlashcardsService',
  SINGLE_ARTICLE = 'singleArticleService',
  SINGLE_FLASHCARD = 'singleFlashcardService',
  CALENDAR = 'calendarService',
  SOCIAL_MEDIA = 'socialMediaService',
  TWITTER = 'twitterService',
  LINKEDIN = 'linkedinService',
  FACEBOOK = 'facebookService',
}

export default {
  generalService,
  cronService,
  multipleService,
  multipleArticlesService,
  multipleFlashcardsService,
  singleArticleService,
  singleFlashcardService,
  calendarService,
  socialMediaService,
  twitterService,
  linkedinService,
  facebookService,
};
