import { ECollection } from '../../../../../../../../../shared';
import { useCollectionContext } from '../../../../../../../context';
import { IFirstStepForm } from '../../../AddJobModal';
import { useArticleNewJobFields } from './new-job-fields/useArticleNewJobFields';
import { useFlashcardsNewJobFields } from './new-job-fields/useFlashcardsNewJobFields';

export const useNewJobFields = (initialValues: IFirstStepForm) => {
  const { collection } = useCollectionContext();
  const articleNewJobFields = useArticleNewJobFields(initialValues);
  const flashcardsNewJobFields = useFlashcardsNewJobFields(initialValues);

  if (collection === ECollection.ARTICLE) return articleNewJobFields;
  if (collection === ECollection.FLASHCARD) return flashcardsNewJobFields;

  return {};
};
