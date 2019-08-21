import moment from 'moment';
import Immutable from 'immutable';

import { FETCH_WEEK, FETCH_DATES, SET_SELECTED_WEEK, GO_NEXT_WEEK, GO_PREV_WEEK } from './calendar.actions';

moment.locale('fr');

const initialeState = {
  dates: [],
  weeks: Immutable.Map({}),
  selectedWeek: moment().startOf('week'),
};

export default function calendar(state = initialeState, action) {
  switch (action.type) {
    case SET_SELECTED_WEEK:
      return { ...state, selectedWeek: action.selectedWeek };
    case GO_NEXT_WEEK:
      return { ...state, selectedWeek: state.selectedWeek.clone().add(1, 'weeks') };
    case GO_PREV_WEEK:
      return { ...state, selectedWeek: state.selectedWeek.clone().add(-1, 'weeks') };
    case FETCH_DATES:
      return { ...state, dates: action.dates };
    case FETCH_WEEK:
      return { ...state, weeks: state.weeks.set(action.week.date, action.week) };
    default:
      return state;
  }
}
