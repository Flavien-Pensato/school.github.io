import moment from 'moment';
import Immutable from 'immutable';

import {
  FETCH_WEEK,
  FETCH_DATES,
} from './calendar.actions';

moment.locale('fr');

const initialeState = {
  dates: [],
  weeks: Immutable.Map({}),
  selectedWeek: moment().startOf('week'),
};

export default function calendar(state = initialeState, action) {
  switch (action.type) {
    case FETCH_DATES:
      return { ...state, dates: action.dates };
    case FETCH_WEEK:
      return { ...state, weeks: state.weeks.set(action.week.date, action.week) };
    default:
      return state;
  }
}
