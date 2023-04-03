import { Strapi } from '@strapi/strapi';
import { Constant } from '../../shared';
import { Service } from '../services';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitles(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.MULTIPLE_ARTICLES)
      .generateTitles(ctx.request.body);
  },
  async createNewJob(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.MULTIPLE_ARTICLES)
      .createNewJob(ctx.request.body);
  },
});
