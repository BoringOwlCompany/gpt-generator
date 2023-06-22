import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import { ExtendedCalendarProps } from './Calendar.type';

const localizer = momentLocalizer(moment);

export const calendarProps: ExtendedCalendarProps = {
  allDayMaxRows: 4,
  localizer,
  defaultView: 'month',
  style: { height: 600 },
  popup: true,
  formats: {
    timeGutterFormat: 'HH:mm',
    agendaHeaderFormat: (range) =>
      `${range.start.toLocaleDateString()} - ${range.end.toLocaleDateString()}`,
  },
};
