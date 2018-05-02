import _ from 'lodash';

export const getWeeks = ({ calendar }) => _.get(calendar, 'weeks');

export const getDates = ({ calendar }) => _.get(calendar, 'dates');

export const getSelectedWeek = ({ calendar }) => _.get(calendar, 'selectedWeek');
