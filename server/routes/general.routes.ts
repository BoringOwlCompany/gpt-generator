import { Route } from '../../shared/enums';
import { Controller } from '../controllers';

export default [
  {
    method: 'GET',
    path: Route.CONFIG,
    handler: `${Controller.GENERAL}.getConfig`,
    config: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: Route.IMAGES,
    handler: `${Controller.GENERAL}.generateImages`,
  },
  {
    method: 'POST',
    path: Route.UPLOAD_IMAGE,
    handler: `${Controller.GENERAL}.uploadImage`,
  },
];
