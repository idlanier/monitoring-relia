import * as moment from 'moment';

export const getLastDayOfTheWeek = () => {
  const day = moment().day();

  if (day == 1) {
    return moment().add(6, 'days').format('YYYYMMDD');
  }

  if (day == 2) {
    return moment().add(5, 'days').format('YYYYMMDD');
  }

  if (day == 3) {
    return moment().add(4, 'days').format('YYYYMMDD');
  }

  if (day == 4) {
    return moment().add(3, 'days').format('YYYYMMDD');
  }

  if (day == 5) {
    return moment().add(2, 'days').format('YYYYMMDD');
  }

  if (day == 6) {
    return moment().add(1, 'days').format('YYYYMMDD');
  }

  if (day == 7) {
    return moment().format('YYYYMMDD');
  }
};
