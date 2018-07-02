import _ from 'lodash';
import moment from 'moment';
import Immutable from 'immutable';

import {
  FETCH_WEEK,
  FETCH_DATES,

  ADD_DATE,
  REMOVE_DATE,
} from './calendar.constants';

const initialeState = {
  dates: [],
  weeks: Immutable.Map({}),
  selectedWeek: moment().startOf('week'),
};

export default function tasks(state = initialeState, action) {
  let dates;

  switch (action.type) {
    case FETCH_DATES:
      return { ...state, dates: action.dates };
    case FETCH_WEEK:
      return { ...state, weeks: state.weeks.set(action.week._id, action.week) };
    case ADD_DATE:
      return {
        ...state,
        dates: [...state.dates, action.date],
      };
    case REMOVE_DATE:
      dates = [...state.dates];
      dates.splice(_.findIndex(dates, date => date._id === action.date._id), 1);

      return {
        ...state,
        dates,
      };
    default:
      return state;
  }
}
