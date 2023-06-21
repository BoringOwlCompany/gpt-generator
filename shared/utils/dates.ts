import moment from 'moment';

export const getVisibleMonth = () => {
  const currentDate = moment();

  const startOfMonth = currentDate.clone().startOf('month');
  const endOfMonth = currentDate.clone().endOf('month');

  return {
    start: startOfMonth.startOf('week').toDate(),
    end: endOfMonth.endOf('week').toDate(),
  };
};
