import { Strapi } from '@strapi/strapi';
import { Constant } from '../../shared';
import { Service } from '../services';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generatePost(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SOCIAL_MEDIA)
      .generatePost(ctx.request.body);
  },

  async publishPost(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SOCIAL_MEDIA)
      .publishPost(ctx.request.body, ctx.state.user.id);
  },
});
