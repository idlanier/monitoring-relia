import * as moment from 'moment';

export const getLast7DaysDate = () => {
  return {
    first: moment().subtract(7, 'days').format('YYYYMMDD'),
    second: moment().subtract(6, 'days').format('YYYYMMDD'),
    third: moment().subtract(5, 'days').format('YYYYMMDD'),
    fourth: moment().subtract(4, 'days').format('YYYYMMDD'),
    fifth: moment().subtract(3, 'days').format('YYYYMMDD'),
    sixth: moment().subtract(2, 'days').format('YYYYMMDD'),
    seventh: moment().subtract(1, 'days').format('YYYYMMDD'),
  };
};
