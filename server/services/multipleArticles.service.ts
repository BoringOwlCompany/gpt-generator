import { Strapi } from '@strapi/strapi';
import { Constant, INewJobRequest, ITitlesRequest } from '../../shared';
import { generateTitles } from '../openai/requests';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitles(data: ITitlesRequest) {
    return await generateTitles(data);
  },
  async createNewJob(data: INewJobRequest) {
    const titles = data.titles.map(({ timestamp, title }) => ({
      timestamp,
      title,
      isDone: false,
    }));

    return await strapi.entityService.create(`plugin::${Constant.PLUGIN_NAME}.gpt-cron`, {
      data: {
        ...data,
        titles,
        status: 'idle',
      },
    });
  },
});
