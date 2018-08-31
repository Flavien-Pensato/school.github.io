import _ from 'lodash';
import moment from 'moment';

moment.locale('fr');

export const getWeeks = ({ calendar }) => _.get(calendar, 'weeks');

export const getCurrentWeek = ({ calendar }, weekId) => {
  const immutableWeeks = _.get(calendar, 'weeks');

  if (!immutableWeeks) {
    return {};
  }

  return immutableWeeks.get(weekId || _.get(calendar, 'selectedWeek').format('WY'));
};

export const getDates = ({ calendar }) => _.get(calendar, 'dates');

export const getSelectedWeek = ({ calendar }, weekId) => {
  if (weekId) {
    return moment(weekId, 'WY').startOf('week');
  }

  return _.get(calendar, 'selectedWeek');
};
