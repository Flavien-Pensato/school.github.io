import _ from 'lodash';

export const getWeeks = ({ calendar }) => _.get(calendar, 'weeks');

export const getCurrentWeek = ({ calendar }, weekId) => {
  const immutableWeeks = _.get(calendar, 'weeks');

  if (!immutableWeeks) {
    return {};
  }

  return immutableWeeks.get(weekId || _.get(calendar, 'selectedWeek').format('WY'));
};

export const getDates = ({ calendar }) => _.get(calendar, 'dates');

export const getSelectedWeek = ({ calendar }) => _.get(calendar, 'selectedWeek');
