import { IForm } from '../../../../AddJobModal';

export const useFlashcardsNewJobFields = ({ tags }: IForm) => ({
  tags: tags.map(({ id, slug }) => ({ id, slug })),
});
