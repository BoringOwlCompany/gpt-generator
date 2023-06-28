import { Strapi } from '@strapi/strapi';
import { getService } from '../utils';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generatePost(ctx) {
    ctx.body = await getService('socialMediaService').generatePost(ctx.request.body);
  },

  async publishPost(ctx) {
    ctx.body = await getService('socialMediaService').publishPost(
      ctx.request.body,
      ctx.state.user.id
    );
  },
});
