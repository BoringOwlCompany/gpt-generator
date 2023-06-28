import { Strapi } from '@strapi/strapi';
import { getService } from '../utils';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateQuestions(ctx) {
    ctx.body = await getService('multipleFlashcardsService').generateQuestions(ctx.request.body);
  },
});
