import { Strapi } from '@strapi/strapi';
import { IJobDetailsRequest } from '../../shared';
import { openai } from '../openai/requests';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitles(data: IJobDetailsRequest) {
    return await openai.generateTitles(data);
  },
});
