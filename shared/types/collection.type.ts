import { Language } from '../enums';

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

export type IStatus = 'idle' | 'loading' | 'error' | 'success' | 'warning';

export interface IComponentTitle {
  status: IStatus;
  timestamp: number;
  title: string;
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
