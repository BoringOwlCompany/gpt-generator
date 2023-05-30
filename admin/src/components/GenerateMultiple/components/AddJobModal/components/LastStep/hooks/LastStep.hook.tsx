import { IFirstStepForm } from '../../../AddJobModal';
import { useGlobalOptions } from './useGlobalOptions';
import { useItemOptions } from './useItemOptions';
import { useNewJobFields } from './useNewJobFields';

interface IOptions {
  initialValues: IFirstStepForm;
}

export const useLastStep = ({ initialValues }: IOptions) => {
  const GlobalOptions = useGlobalOptions();
  const ItemOptions = useItemOptions();
  const newJobFields = useNewJobFields(initialValues);

  return { newJobFields, ItemOptions, GlobalOptions };
};
