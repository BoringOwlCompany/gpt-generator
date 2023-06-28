import { Strapi } from '@strapi/strapi';
import { getService } from '../utils';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getCalendarItems(ctx) {
    ctx.body = await getService('calendarService').getCalendarItems({
      start: new Date(ctx.request.body.start),
      end: new Date(ctx.request.body.end),
    });
  },
});
