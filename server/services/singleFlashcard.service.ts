import { Strapi } from '@strapi/strapi';

import {
  Language,
  IJobDetailsItemsFlashcardsCollectionFields,
  IGeneratedFlashcardResponse,
  IQuestionRequests,
} from '../../shared';
import { openaiFlashcards } from '../openai/requests';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateAnswers(data: IQuestionRequests) {
    return await openaiFlashcards.generateAnswers(data);
  },

  async generateFlashcard(
    data: IJobDetailsItemsFlashcardsCollectionFields & { language: Language }
  ): Promise<IGeneratedFlashcardResponse> {
    const answers = await openaiFlashcards.generateAnswers({
      language: data.language,
      question: `${data.question}`,
    });

    return {
      question: `${data.question}`,
      ...answers,
    };
  },
});
