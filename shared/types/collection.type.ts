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
}

export interface IGptCronCollection {
  id: number;
  keywords: string;
  language: Language;
  titles: IComponentTitle[];
  status: IStatus;
  isDone: boolean;
}

export type IGptCronResponse = IResponse<IGptCronCollection[]>;
