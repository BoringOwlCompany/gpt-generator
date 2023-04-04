import { Strapi } from '@strapi/strapi';
import { Constant, IComponentTitle, INewJobRequest, ITitlesRequest } from '../../shared';
import { openai } from '../openai/requests';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitles(data: ITitlesRequest) {
    return await openai.generateTitles(data);
  },

  async createNewJob(data: INewJobRequest) {
    const titles: IComponentTitle[] = data.titles.map(({ timestamp, title }) => ({
      timestamp,
      title,
      status: 'idle',
    }));

    return await strapi.entityService.create(`plugin::${Constant.PLUGIN_NAME}.gpt-cron`, {
      data: {
        ...data,
        titles,
      },
    });
  },
});
