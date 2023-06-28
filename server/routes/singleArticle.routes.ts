import { Route } from '../../shared/enums';
import { getRoute } from '../utils';

export default [
  getRoute({
    method: 'POST',
    path: Route.SINGLE_ARTICLE_TITLE,
    handler: {
      controller: 'singleArticleController',
      controllerMethod: 'generateTitle',
    },
  }),
  getRoute({
    method: 'POST',
    path: Route.SINGLE_ARTICLE_PARAGRAPHS,
    handler: {
      controller: 'singleArticleController',
      controllerMethod: 'generateParagraphs',
    },
  }),
  getRoute({
    method: 'POST',
    path: Route.SINGLE_ARTICLE_PARAGRAPH,
    handler: {
      controller: 'singleArticleController',
      controllerMethod: 'generateParagraph',
    },
  }),
  getRoute({
    method: 'POST',
    path: Route.SINGLE_ARTICLE_EXCERPT,
    handler: {
      controller: 'singleArticleController',
      controllerMethod: 'generateExcerpt',
    },
  }),
  getRoute({
    method: 'POST',
    path: Route.SINGLE_ARTICLE_SEO,
    handler: {
      controller: 'singleArticleController',
      controllerMethod: 'generateSeo',
    },
  }),
  getRoute({
    method: 'POST',
    path: Route.SINGLE_ARTICLE_FAQ,
    handler: {
      controller: 'singleArticleController',
      controllerMethod: 'generateFaq',
    },
  }),
  getRoute({
    method: 'POST',
    path: Route.SINGLE_ARTICLE_VIDEO_SCRIPT_SCENES,
    handler: {
      controller: 'singleArticleController',
      controllerMethod: 'generateVideoScriptScenes',
    },
  }),
  getRoute({
    method: 'POST',
    path: Route.SINGLE_ARTICLE_VIDEO_SCRIPT_SCENE_DETAILS,
    handler: {
      controller: 'singleArticleController',
      controllerMethod: 'generateVideoScriptSceneDetails',
    },
  }),
];
