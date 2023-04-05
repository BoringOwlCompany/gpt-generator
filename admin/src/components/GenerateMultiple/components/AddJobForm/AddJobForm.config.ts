import { Cron } from '../../../../../../shared';

export interface ICronPossibility {
  value: string;
  label: string;
}

export const cronPossibilities = [
  {
    value: Cron.ONE_MINUTE,
    label: 'Every minute',
  },
  {
    value: Cron.TWO_MINUTES,
    label: 'Every 2 minutes',
  },
  {
    value: Cron.ONE_HOUR,
    label: 'Every hour',
  },
  {
    value: Cron.TWO_HOURS,
    label: 'Every 2 hours',
  },
  {
    value: Cron.THREE_HOURS,
    label: 'Every 3 hours',
  },
  {
    value: Cron.SIX_HOURS,
    label: 'Every 6 hours',
  },
  {
    value: Cron.TWELVE_HOURS,
    label: 'Every 12 hours',
  },
];
