import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async generate(ctx) {
    ctx.body = await strapi
      .plugin("gpt-generator")
      .service("service")
      .generate(ctx.request.body);
  },
});
