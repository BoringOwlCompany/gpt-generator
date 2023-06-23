import { request } from '@strapi/helper-plugin';
import { Constant, IConfig, Route } from '../../../shared';

export const generalApi = {
  fetchConfig: async (): Promise<IConfig> => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.CONFIG}`);
  },
};
