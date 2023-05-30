import { IJobDetailsRequest, IQuestionRequests } from '../../../../shared';
import {
  developerPrompt,
  questionsPrompt,
  questionsJsonPrompt,
  answersPrompt,
  answersJsonPrompt,
} from '../../prompts';
import { ChatCompletionRequestMessage } from 'openai';

interface IMessages {
  questions: (props: IJobDetailsRequest) => ChatCompletionRequestMessage[];
  answers: (props: IQuestionRequests) => ChatCompletionRequestMessage[];
}

export const messagesFlashcards: IMessages = {
  questions: ({ keywords, numberOfItems, language }) => [
    {
      role: 'system',
      content: developerPrompt(language),
    },
    {
      role: 'user',
      content: questionsPrompt(keywords, numberOfItems) + questionsJsonPrompt,
    },
  ],

  answers: ({ question, language }) => [
    {
      role: 'system',
      content: developerPrompt(language),
    },
    {
      role: 'user',
      content: answersPrompt(question) + answersJsonPrompt,
    },
  ],
};
