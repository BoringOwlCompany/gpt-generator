import React, { useCallback, useState } from 'react';
import { Box, BaseHeaderLayout, Loader } from '@strapi/design-system';
import { Calendar as CalendarComponent } from 'react-big-calendar';
import { useHistory } from 'react-router-dom';
import * as S from './Calendar.styled';
import { useCalendarItems } from '../../api/queries/calendar/calendar';
import { getVisibleMonth, ICalendarItem, IRange } from '../../../../shared';
import { calendarProps } from './Calendar.config';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const Calendar = () => {
  const history = useHistory();
  const [range, setRange] = useState<IRange>(getVisibleMonth());

  const { data: events, isFetching, isLoading } = useCalendarItems(range);

  const handleEventClick = useCallback(({ id }: ICalendarItem) => {
    history.push(`/content-manager/collectionType/api::article.article/${id}`);
  }, []);

  const handleRangeChange = useCallback((dates: Date[] | { start: Date; end: Date }) => {
    if (Array.isArray(dates)) {
      const start = new Date(dates[0]);
      const end = new Date(dates[dates.length - 1]);
      end.setTime(end.getTime() + 24 * 60 * 60 * 1000);

      setRange({
        start,
        end,
      });

      return;
    }

    setRange(dates);
  }, []);

  const handleEventPropGetter = useCallback(
    ({ isPublished }: ICalendarItem) => ({
      className: isPublished ? 'published' : 'unpublished',
    }),
    []
  );

  return (
    <Box>
      <S.GlobalCalendarStyles />
      <BaseHeaderLayout
        title="Calendar"
        primaryAction={(isLoading || isFetching) && <Loader small />}
      />
      <Box padding={8} maxWidth={'1300px'}>
        <CalendarComponent
          {...calendarProps}
          onSelectEvent={handleEventClick}
          onRangeChange={handleRangeChange}
          eventPropGetter={handleEventPropGetter}
          events={events}
        />
      </Box>
    </Box>
  );
};

export default Calendar;
