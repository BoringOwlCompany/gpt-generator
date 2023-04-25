import { Language } from '../enums';
import { INewJobItem } from './api.type';

export interface IResponse<T> {
  results: T;
  pagination: IPagination;
}

export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export type IStatus = 'idle' | 'loading' | 'error' | 'success' | 'warning' | 'refetching';

export interface IComponentTitle extends INewJobItem {
  status: IStatus;
  articleId?: number;
  log?: any;
}

export interface IGptCronCollection {
  id: number;
  createdAt: Date;
  keywords: string;
  language: Language;
  titles: IComponentTitle[];
}

export type IGptCronResponse = IResponse<IGptCronCollection[]>;
