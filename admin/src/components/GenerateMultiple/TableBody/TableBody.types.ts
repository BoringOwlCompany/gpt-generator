import { IStatus, Language } from '../../../../../shared';

export interface ITableData {
  createdAt: Date;
  id: number;
  language: Language;
  numberOfItems: number;
  numberOfFinishedItems: number;
  itemsDetails: string;
  isDone: boolean;
  status: IStatus;
}
