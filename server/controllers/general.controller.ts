import { Strapi } from '@strapi/strapi';
import { Constant } from '../../shared';
import { Service } from '../services';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getConfig(ctx) {
    ctx.body = strapi.config.get(`plugin.${Constant.PLUGIN_NAME}`);
  },
  async generateImages(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.GENERAL)
      .generateImages(ctx.request.body);
  },
  async uploadImage(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.GENERAL)
      .uploadImage(ctx.request.files);
  },
});
