import { CalendarProps } from 'react-big-calendar';
import { ICalendarItem } from '../../../../shared';

export interface ExtendedCalendarProps extends CalendarProps<ICalendarItem, object> {
  allDayMaxRows?: number;
}
