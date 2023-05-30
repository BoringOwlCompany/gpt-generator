import { IFirstStepForm } from '../../../../AddJobModal';

export const useFlashcardsNewJobFields = ({ tags }: IFirstStepForm) => ({
  tags: tags.map(({ id, slug }) => ({ id, slug })),
});
