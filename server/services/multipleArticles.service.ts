import { Strapi } from '@strapi/strapi';
import { IJobDetailsRequest } from '../../shared';
import { openaiArticles } from '../openai/requests';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitles(data: IJobDetailsRequest) {
    return await openaiArticles.generateTitles(data);
  },
});
