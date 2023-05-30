import { Strapi } from '@strapi/strapi';
import { IJobDetailsRequest } from '../../shared';
import { openaiFlashcards } from '../openai/requests';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateQuestions(data: IJobDetailsRequest) {
    return await openaiFlashcards.generateQuestions(data);
  },
});
