import { IStatus } from '../../../shared';

export const parseStatus = (status: IStatus | undefined) => {
  if (status === 'error')
    return {
      backgroundColor: 'danger600',
      textColor: 'neutral100',
    };
  if (status === 'success')
    return {
      backgroundColor: 'success600',
      textColor: 'neutral100',
    };
  if (status === 'idle')
    return {
      backgroundColor: 'neutral200',
      textColor: 'neutral700',
    };
  if (status === 'warning')
    return {
      backgroundColor: 'warning600',
      textColor: 'neutral100',
    };
  if (status === 'loading')
    return {
      backgroundColor: 'primary500',
      textColor: 'neutral700',
    };

  return {
    backgroundColor: 'neutral200',
    textColor: 'neutral700',
  };
};
