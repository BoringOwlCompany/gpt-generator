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
