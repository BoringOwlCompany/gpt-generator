import { Route } from '../../shared/enums';
import { Controller } from '../controllers';

export default [
  {
    method: 'POST',
    path: Route.SOCIAL_MEDIA_POST,
    handler: `${Controller.SOCIAL_MEDIA}.generatePost`,
  },
  {
    method: 'POST',
    path: Route.SOCIAL_MEDIA_PUBLISH_POST,
    handler: `${Controller.SOCIAL_MEDIA}.publishPost`,
  },
];
