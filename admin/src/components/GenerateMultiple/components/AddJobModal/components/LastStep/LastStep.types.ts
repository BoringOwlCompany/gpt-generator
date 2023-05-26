import { Cron, IJobDetailsItemCollectionFields, VideoLength } from '../../../../../../../../shared';
import { IForm } from '../../AddJobModal';

export interface IProps {
  initialValues: IForm;
  handleFinish: () => void;
}

export interface IFinalForm {
  firstItemGenerationTime: Date;
  interval: Cron;
  items: ({
    title: string;
  } & IJobDetailsItemCollectionFields)[];
}
