import { request } from '@strapi/helper-plugin';
import { Constant, INewJobRequest, Route } from '../../../shared';

export const cronApi = {
  createNewJob: async (data: INewJobRequest) => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.MULTIPLE_ARTICLES_NEW_JOB}`, {
      method: 'POST',
      body: data,
    });
  },
};
