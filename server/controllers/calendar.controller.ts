import { Strapi } from '@strapi/strapi';
import { Constant } from '../../shared';
import { Service } from '../services';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getCalendarItems(ctx) {
    ctx.body = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.CALENDAR)
      .getCalendarItems({
        start: new Date(ctx.request.body.start),
        end: new Date(ctx.request.body.end),
      });
  },
});
