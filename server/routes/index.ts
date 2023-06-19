import generalRoutes from './general.routes';
import multipleRoutes from './multiple.routes';
import multipleArticlesRoutes from './multipleArticles.routes';
import multipleFlashcardsRoutes from './multipleFlashcards.routes';
import singleArticleRoutes from './singleArticle.routes';
import socialMediaRoutes from './socialMedia.routes';

export default [
  ...generalRoutes,
  ...multipleRoutes,
  ...multipleArticlesRoutes,
  ...multipleFlashcardsRoutes,
  ...singleArticleRoutes,
  ...socialMediaRoutes,
];
