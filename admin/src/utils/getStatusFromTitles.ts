import { IJobDetails, IStatus } from '../../../shared';

export const getStatusFromJobDetails = (details: IJobDetails | undefined): IStatus => {
  if (!details) return 'idle';

  if (details.items.every(({ status }) => status === 'success')) return 'success';
  if (details.items.every(({ status }) => status === 'warning')) return 'warning';
  if (details.items.every(({ status }) => status === 'error')) return 'error';
  if (details.items.every(({ status }) => status === 'idle')) return 'idle';

  if (details.items.some(({ status }) => status === 'warning' || status === 'error'))
    return 'warning';

  return 'idle';
};
