import * as moment from 'moment';

export const getFirstDayOfTheWeek = () => {
  const day = moment().day();

  if (day == 1) {
    return moment().format('YYYYMMDD');
  }

  if (day == 2) {
    return moment().subtract(1, 'days').format('YYYYMMDD');
  }

  if (day == 3) {
    return moment().subtract(2, 'days').format('YYYYMMDD');
  }

  if (day == 4) {
    return moment().subtract(3, 'days').format('YYYYMMDD');
  }

  if (day == 5) {
    return moment().subtract(4, 'days').format('YYYYMMDD');
  }

  if (day == 6) {
    return moment().subtract(5, 'days').format('YYYYMMDD');
  }

  if (day == 7) {
    return moment().subtract(6, 'days').format('YYYYMMDD');
  }
};
