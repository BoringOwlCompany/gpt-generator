import { Route } from '../../shared/enums';
import { Controller } from '../controllers';

export default [
  {
    method: 'POST',
    path: Route.MULTIPLE_ARTICLES_TITLES,
    handler: `${Controller.MULTIPLE_ARTICLES}.generateTitles`,
  },
  {
    method: 'POST',
    path: Route.MULTIPLE_ARTICLES_NEW_JOB,
    handler: `${Controller.MULTIPLE_ARTICLES}.createNewJob`,
  },
];
