import { request } from '@strapi/helper-plugin';
import { Constant, Route } from '../../../shared';

export const generalApi = {
  fetchConfig: async () => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.CONFIG}`);
  },
};
