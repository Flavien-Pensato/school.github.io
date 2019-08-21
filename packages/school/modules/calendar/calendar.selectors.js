import _ from 'lodash';
import moment from 'moment';

moment.locale('fr');

export const getWeeks = ({ calendar }) => _.get(calendar, 'weeks');

export const getSelectedWeek = ({ calendar }, weekId) => {
  if (weekId) {
    return moment(weekId, 'YYYY.MM.DD').startOf('week');
  }

  return _.get(calendar, 'selectedWeek');
};

export const getCurrentWeek = ({ calendar }, date) => {
  const immutableWeeks = _.get(calendar, 'weeks');

  if (immutableWeeks) {
    return immutableWeeks.get(date || getSelectedWeek({ calendar }).format('YYYY.MM.DD'));
  }
};

export const getDates = ({ calendar }) => _.get(calendar, 'dates');
