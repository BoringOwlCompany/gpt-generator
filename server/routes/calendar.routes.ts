import { Route } from '../../shared/enums';
import { Controller } from '../controllers';

export default [
  {
    method: 'POST',
    path: Route.CALENDAR_ITEMS,
    handler: `${Controller.CALENDAR}.getCalendarItems`,
  },
];
