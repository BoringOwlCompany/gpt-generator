import { ECollection } from '../../../../../../../../../shared';
import { useCollectionContext } from '../../../../../../../context';
import { IFirstStepForm } from '../../../AddJobModal';

export const getIsSubmitDisabled = (formValues: IFirstStepForm) => {
  const { collection } = useCollectionContext();

  if (!Boolean(formValues.numberOfItems) || formValues.numberOfItems < 1) return true;

  if (collection === ECollection.ARTICLE) {
    if (!Boolean(formValues.keywords)) return true;
    return false;
  }

  if (collection === ECollection.FLASHCARD) {
    if (!Boolean(formValues.tags.length)) return true;
    return false;
  }

  return true;
};
