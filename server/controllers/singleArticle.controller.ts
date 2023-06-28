import { Strapi } from '@strapi/strapi';
import { getService } from '../utils';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitle(ctx) {
    ctx.body = await getService('singleArticleService').generateTitle(ctx.request.body);
  },

  async generateParagraphs(ctx) {
    ctx.body = await getService('singleArticleService').generateParagraphs(ctx.request.body);
  },

  async generateParagraph(ctx) {
    ctx.body = await getService('singleArticleService').generateParagraph(ctx.request.body);
  },

  async generateExcerpt(ctx) {
    ctx.body = await getService('singleArticleService').generateExcerpt(ctx.request.body);
  },

  async generateSeo(ctx) {
    ctx.body = await getService('singleArticleService').generateSeo(ctx.request.body);
  },

  async generateFaq(ctx) {
    ctx.body = await getService('singleArticleService').generateFaq(ctx.request.body);
  },

  async generateVideoScriptScenes(ctx) {
    ctx.body = await getService('singleArticleService').generateVideoScriptScenes(ctx.request.body);
  },

  async generateVideoScriptSceneDetails(ctx) {
    ctx.body = await getService('singleArticleService').generateVideoScriptSceneDetails(
      ctx.request.body
    );
  },
});
