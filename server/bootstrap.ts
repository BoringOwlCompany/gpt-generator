import { Strapi } from '@strapi/strapi';
import { getService } from './utils';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.cron.add({
    lookForItemsToGenerate: {
      task: async () => await getService('cronService').lookForItemsToGenerate(),
      options: {
        rule: '0 */2 * * * *',
      },
    },
  });
};
