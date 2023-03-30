import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitle(ctx) {
    ctx.body = await strapi
      .plugin("gpt-generator")
      .service("service")
      .generateTitle(ctx.request.body);
  },

  async generateParagraphs(ctx) {
    ctx.body = await strapi
      .plugin("gpt-generator")
      .service("service")
      .generateParagraphs(ctx.request.body);
  },

  async generateParagraph(ctx) {
    ctx.body = await strapi
      .plugin("gpt-generator")
      .service("service")
      .generateParagraph(ctx.request.body);
  },

  async generateExcerpt(ctx) {
    ctx.body = await strapi
      .plugin("gpt-generator")
      .service("service")
      .generateExcerpt(ctx.request.body);
  },

  async generateSeo(ctx) {
    ctx.body = await strapi
      .plugin("gpt-generator")
      .service("service")
      .generateSeo(ctx.request.body);
  },

  async generateFaq(ctx) {
    ctx.body = await strapi
      .plugin("gpt-generator")
      .service("service")
      .generateFaq(ctx.request.body);
  },

  async generateImages(ctx) {
    ctx.body = await strapi
      .plugin("gpt-generator")
      .service("service")
      .generateImages(ctx.request.body);
  },

  async uploadImage(ctx) {
    ctx.body = await strapi
      .plugin("gpt-generator")
      .service("service")
      .uploadImage(ctx.request.files);
  },
});