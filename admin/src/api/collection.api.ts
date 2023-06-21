import { request } from '@strapi/helper-plugin';
import { Constant, ICalendarItem, IRange, QueryFunctionProps, Route } from '../../../shared';

export const collectionApi = {
  async fetchItemsForCalendar({ queryKey }: QueryFunctionProps<IRange>): Promise<ICalendarItem[]> {
    const [_, range] = queryKey;
    return await request(`/${Constant.PLUGIN_NAME}${Route.CALENDAR_ITEMS}`, {
      method: 'POST',
      body: range,
    });
  },
};
