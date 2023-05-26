import { DeepPartial } from 'react-hook-form';

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
