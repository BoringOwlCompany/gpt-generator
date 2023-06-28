import { Strapi } from '@strapi/strapi';
import { getService } from '../utils';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getConfig(ctx) {
    ctx.body = getService('generalService').getConfig();
  },
  async generateImages(ctx) {
    ctx.body = await getService('generalService').generateImages(ctx.request.body);
  },
  async uploadImage(ctx) {
    ctx.body = await getService('generalService').uploadImage(ctx.request.files);
  },
});
