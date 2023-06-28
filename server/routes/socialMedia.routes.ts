import { Route } from '../../shared/enums';
import { getRoute } from '../utils';

export default [
  getRoute({
    method: 'POST',
    path: Route.SOCIAL_MEDIA_POST,
    handler: {
      controller: 'socialMediaController',
      controllerMethod: 'generatePost',
    },
  }),
  getRoute({
    method: 'POST',
    path: Route.SOCIAL_MEDIA_PUBLISH_POST,
    handler: {
      controller: 'socialMediaController',
      controllerMethod: 'publishPost',
    },
  }),
];
