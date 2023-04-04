import { IComponentTitle, IStatus } from '../../../shared';

export const getStatusFromTitles = (titles: IComponentTitle[] | undefined): IStatus => {
  if (!titles) return 'idle';

  if (titles.every(({ status }) => status === 'success')) return 'success';
  if (titles.every(({ status }) => status === 'warning')) return 'warning';
  if (titles.every(({ status }) => status === 'error')) return 'error';
  if (titles.every(({ status }) => status === 'idle')) return 'idle';

  if (titles.some(({ status }) => status === 'warning' || status === 'error')) return 'warning';

  return 'idle';
};
