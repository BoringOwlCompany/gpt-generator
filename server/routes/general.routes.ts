import { Route } from '../../shared/enums';
import { getRoute } from '../utils';

export default [
  getRoute({
    method: 'GET',
    path: Route.CONFIG,
    handler: {
      controller: 'generalController',
      controllerMethod: 'getConfig',
    },
    auth: false,
  }),
  getRoute({
    method: 'POST',
    path: Route.IMAGES,
    handler: {
      controller: 'generalController',
      controllerMethod: 'generateImages',
    },
  }),
  getRoute({
    method: 'POST',
    path: Route.UPLOAD_IMAGE,
    handler: {
      controller: 'generalController',
      controllerMethod: 'uploadImage',
    },
  }),
];
