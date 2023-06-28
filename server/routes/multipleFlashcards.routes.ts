import { Route } from '../../shared/enums';
import { getRoute } from '../utils';

export default [
  getRoute({
    method: 'POST',
    path: Route.MULTIPLE_FLASHCARDS_QUESTIONS,
    handler: {
      controller: 'multipleFlashcardsController',
      controllerMethod: 'generateQuestions',
    },
  }),
];
