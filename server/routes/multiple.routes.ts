import { Route } from '../../shared/enums';
import { getRoute } from '../utils';

export default [
  getRoute({
    method: 'POST',
    path: Route.MULTIPLE_NEW_JOB,
    handler: {
      controller: 'multipleController',
      controllerMethod: 'createNewJob',
    },
  }),
];
