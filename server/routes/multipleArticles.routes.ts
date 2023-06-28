import { Route } from '../../shared/enums';
import { getRoute } from '../utils';

export default [
  getRoute({
    method: 'POST',
    path: Route.MULTIPLE_ARTICLES_TITLES,
    handler: {
      controller: 'multipleArticlesController',
      controllerMethod: 'generateTitles',
    },
  }),
];
