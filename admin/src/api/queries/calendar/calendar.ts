import { useQuery } from '@tanstack/react-query';
import { ICalendarItem, IRange } from '../../../../../shared';
import { collectionApi } from '../../collection.api';

export const useCalendarItems = (range: IRange) =>
  useQuery<unknown, Error, ICalendarItem[], [string, IRange]>(
    ['calendarItems', range],
    collectionApi.fetchItemsForCalendar
  );
