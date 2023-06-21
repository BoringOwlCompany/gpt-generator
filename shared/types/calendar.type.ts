import { QueryFunctionContext } from '@tanstack/react-query';

export interface IRange {
  start: Date;
  end: Date;
}

export interface ICalendarItem {
  id: number;
  startDate: Date;
  title: string;
  isPublished: boolean;
  endDate?: Date;
}

export type QueryFunctionProps<T = null> = QueryFunctionContext<[string, T]>;
