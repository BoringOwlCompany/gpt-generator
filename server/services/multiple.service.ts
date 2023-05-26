import { Strapi } from '@strapi/strapi';
import { Constant, INewJobRequest } from '../../shared';

export default ({ strapi }: { strapi: Strapi }) => ({
  async createNewJob(data: INewJobRequest) {
    return await strapi.entityService.create(`plugin::${Constant.PLUGIN_NAME}.gpt-cron`, {
      data,
    });
  },
});
