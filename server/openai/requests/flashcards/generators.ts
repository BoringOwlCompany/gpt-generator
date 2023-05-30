import { tryCatch, tryParse } from '../utils';
import { IAnswersResponse, IJobDetailsRequest, IQuestionRequests } from '../../../../shared';
import { createChatCompletion } from '../../methods';
import { messagesFlashcards } from './messages';

const generateQuestions = async (data: IJobDetailsRequest) => {
  const completion = await tryCatch(() => createChatCompletion(messagesFlashcards.questions(data)));
  return tryParse(completion);
};

const generateAnswers = async (data: IQuestionRequests): Promise<IAnswersResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messagesFlashcards.answers(data)));
  return tryParse(completion);
};

export const openaiFlashcards = {
  generateQuestions,
  generateAnswers,
};
