import { Route } from '../../shared/enums';
import { Controller } from '../controllers';

export default [
  {
    method: 'POST',
    path: Route.MULTIPLE_NEW_JOB,
    handler: `${Controller.MULTIPLE}.createNewJob`,
  },
];
