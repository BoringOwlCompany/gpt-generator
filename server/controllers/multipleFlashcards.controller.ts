import { Strapi } from '@strapi/strapi';
import { Constant } from '../../shared';
import { Service } from '../services';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateQuestions(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.MULTIPLE_FLASHCARDS)
      .generateQuestions(ctx.request.body);
  },
});
