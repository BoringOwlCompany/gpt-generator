import { Route } from '../../shared/enums';
import { Controller } from '../controllers';

export default [
  {
    method: "POST",
    path: Route.SINGLE_ARTICLE_TITLE,
    handler: `${Controller.SINGLE_ARTICLE}.generateTitle`,
  },
  {
    method: "POST",
    path: Route.SINGLE_ARTICLE_PARAGRAPHS,
    handler: `${Controller.SINGLE_ARTICLE}.generateParagraphs`,
  },
  {
    method: "POST",
    path: Route.SINGLE_ARTICLE_PARAGRAPH,
    handler: `${Controller.SINGLE_ARTICLE}.generateParagraph`,
  },
  {
    method: "POST",
    path: Route.SINGLE_ARTICLE_EXCERPT,
    handler: `${Controller.SINGLE_ARTICLE}.generateExcerpt`,
  },
  {
    method: "POST",
    path: Route.SINGLE_ARTICLE_SEO,
    handler: `${Controller.SINGLE_ARTICLE}.generateSeo`,
  },
  {
    method: "POST",
    path: Route.SINGLE_ARTICLE_FAQ,
    handler: `${Controller.SINGLE_ARTICLE}.generateFaq`,
  },
]