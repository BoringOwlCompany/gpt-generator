import { DeepPartial } from 'react-hook-form';

export interface IQuestionRequests {
  question: string;
  language: string;
}
export interface IAnswersResponse {
  correctAnswer: string;
  falseAnswers: string[];
}

export type IJobDetailsFlashcardsCollectionFields = DeepPartial<{
  tags: {
    id: number;
    slug: string;
  }[];
}>;

export type IJobDetailsItemsFlashcardsCollectionFields = DeepPartial<{
  question: string;
  flashcardId: number;
}>;

export interface IGeneratedFlashcardResponse {
  question: string;
  correctAnswer: string;
  falseAnswers: string[];
}
