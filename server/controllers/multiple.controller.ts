import { Strapi } from '@strapi/strapi';
import { getService } from '../utils';

export default ({ strapi }: { strapi: Strapi }) => ({
  async createNewJob(ctx) {
    ctx.body = await getService('multipleService').createNewJob(ctx.request.body);
  },
});
