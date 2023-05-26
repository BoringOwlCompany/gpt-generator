import { Language } from '../enums';
import { IResponse, IStatus } from './api.type';
import {
  IJobDetailsArticlesCollectionFields,
  IJobDetailsFlashcardsCollectionFields,
  IJobDetailsItemsArticlesCollectionFields,
  IJobDetailsItemsFlashcardsCollectionFields,
} from './collections';

export type IJobDetailsItemCollectionFields =
  | IJobDetailsItemsArticlesCollectionFields
  | IJobDetailsItemsFlashcardsCollectionFields;

export type IJobDetailsCollectionFields =
  | IJobDetailsArticlesCollectionFields
  | IJobDetailsFlashcardsCollectionFields;

export type IJobDetailsItem = {
  timestamp: number;
  status?: IStatus;
  log?: any;
} & IJobDetailsItemCollectionFields;

export interface INewJobRequest {
  language: Language;
  details: IJobDetails;
  collection?: ECollection;
}

export enum ECollection {
  ARTICLE = 'api::article.article',
  FLASHCARD = 'api::flashcard.flashcard',
}

export enum ERelationalCollection {
  TAG = 'api::tag.tag',
  CATEGORY = 'api::category.category',
}

export interface IRelationalCollectionResponse {
  id: number;
  slug: string;
  publishedAt: Date | null;
}

export type IJobDetails = {
  items: IJobDetailsItem[];
} & IJobDetailsCollectionFields;

export interface IGptCronCollection {
  id: number;
  createdAt: Date;
  language: Language;
  collection: ECollection;
  details: IJobDetails;
}

export type IGptCronResponse = IResponse<IGptCronCollection[]>;
