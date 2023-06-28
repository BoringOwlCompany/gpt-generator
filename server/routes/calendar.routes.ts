import { Route } from '../../shared/enums';
import { getRoute } from '../utils';

export default [
  getRoute({
    method: 'POST',
    path: Route.CALENDAR_ITEMS,
    handler: {
      controller: 'calendarController',
      controllerMethod: 'getCalendarItems',
    },
  }),
];
