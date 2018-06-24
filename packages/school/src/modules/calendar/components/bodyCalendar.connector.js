import { connect } from 'react-redux';

import { BodyCalendar } from './bodyCalendar.component';

import { getCurrentWeek } from '../calendar.selectors';
import { fetchWeeksAction } from '../calendar.actions';

const mapStateToProps = state => ({
  week: getCurrentWeek(state),
});

const mapDispatchToProps = dispatch => ({
  fetchWeeksAction: () => dispatch(fetchWeeksAction()),
});

export const CalendarConnected = connect(mapStateToProps, mapDispatchToProps)(BodyCalendar);
