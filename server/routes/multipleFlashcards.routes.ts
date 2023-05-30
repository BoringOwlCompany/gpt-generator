import { Route } from '../../shared/enums';
import { Controller } from '../controllers';

export default [
  {
    method: 'POST',
    path: Route.MULTIPLE_FLASHCARDS_QUESTIONS,
    handler: `${Controller.MULTIPLE_FLASHCARDS}.generateQuestions`,
  },
];
