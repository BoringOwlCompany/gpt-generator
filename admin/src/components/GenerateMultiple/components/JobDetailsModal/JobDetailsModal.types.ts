import { IStatus } from '../../../../../../shared';

export interface IJobDetailsItemData {
  timestamp: number;
  title: string;
  link: string;
  status: IStatus;
  log: any;
}

export interface IJobDetailsData {
  status: IStatus;
  keywords: string;
  items: IJobDetailsItemData[];
}
