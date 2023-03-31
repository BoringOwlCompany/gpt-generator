import generalRoutes from './general.routes';
import multipleArticlesRoutes from './multipleArticles.routes';
import singleArticleRoutes from './singleArticle.routes'

export default [
  ...generalRoutes,
  ...multipleArticlesRoutes,
  ...singleArticleRoutes,
];
