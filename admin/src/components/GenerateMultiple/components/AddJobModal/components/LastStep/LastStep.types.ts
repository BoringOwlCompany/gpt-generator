import { Cron, IJobDetailsItemCollectionFields } from '../../../../../../../../shared';
import { IFirstStepForm } from '../../AddJobModal';

export interface IProps {
  initialValues: IFirstStepForm;
  handleFinish: () => void;
}

export interface IFinalForm {
  firstItemGenerationTime: Date;
  interval: Cron;
  items: IJobDetailsItemCollectionFields[];
}
