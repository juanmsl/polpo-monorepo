import moment from 'moment/moment';

export const formatDate = (date: string) => {
  return Date.parse(date) ? moment(date, 'YYYY-MM-DD').format('MMM YYYY') : date;
};

export const timeBetween = (date_start: string, date_end: string) => {
  const momentStart = moment(date_start);

  return Date.parse(date_end) ? moment(date_end).from(momentStart, true) : momentStart.fromNow();
};
