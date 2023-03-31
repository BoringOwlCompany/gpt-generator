import generalService from "./general.service";
import multipleArticlesService from "./multipleArticles.service";
import singleArticleService from "./singleArticle.service";

export enum Service {
  GENERAL = 'generalService',
  MULTIPLE_ARTICLES = 'multipleArticlesService',
  SINGLE_ARTICLE = 'singleArticleService'
}

export default {
  generalService,
  multipleArticlesService,
  singleArticleService,
};
