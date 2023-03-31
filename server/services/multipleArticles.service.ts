import { Strapi } from '@strapi/strapi';
import { ITitlesRequest } from '../../shared';
import { generateTitles } from '../openai/requests';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitles(data: ITitlesRequest) {
    return await generateTitles(data);
  },
});
