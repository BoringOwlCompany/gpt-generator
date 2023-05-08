import { Strapi } from '@strapi/strapi';
import { Constant } from '../../shared';
import { Service } from '../services';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitle(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SINGLE_ARTICLE)
      .generateTitle(ctx.request.body);
  },

  async generateParagraphs(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SINGLE_ARTICLE)
      .generateParagraphs(ctx.request.body);
  },

  async generateParagraph(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SINGLE_ARTICLE)
      .generateParagraph(ctx.request.body);
  },

  async generateExcerpt(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SINGLE_ARTICLE)
      .generateExcerpt(ctx.request.body);
  },

  async generateSeo(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SINGLE_ARTICLE)
      .generateSeo(ctx.request.body);
  },

  async generateFaq(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SINGLE_ARTICLE)
      .generateFaq(ctx.request.body);
  },

  async generateImages(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SINGLE_ARTICLE)
      .generateImages(ctx.request.body);
  },

  async uploadImage(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SINGLE_ARTICLE)
      .uploadImage(ctx.request.files);
  },

  async generateVideoScriptScenes(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SINGLE_ARTICLE)
      .generateVideoScriptScenes(ctx.request.body);
  },

  async generateVideoScriptSceneDetails(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SINGLE_ARTICLE)
      .generateVideoScriptSceneDetails(ctx.request.body);
  },
});
