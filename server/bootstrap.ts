import { Strapi } from '@strapi/strapi';
import { Constant } from '../shared';
import { Service } from './services';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.cron.add({
    lookForArticlesToGenerate: {
      task: async ({ strapi }) =>
        await strapi.plugin(Constant.PLUGIN_NAME).service(Service.CRON).lookForArticles(),
      options: {
        rule: '0 */2 * * * *',
      },
    },
  });
};
