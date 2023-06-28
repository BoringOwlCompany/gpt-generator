import { Strapi } from '@strapi/strapi';
import { getService } from '../utils';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitles(ctx) {
    ctx.body = await getService('multipleArticlesService').generateTitles(ctx.request.body);
  },
});
