import { connect } from 'react-redux';

import { BodyCalendar } from './bodyCalendar.component';

import { getCurrentWeek } from '../../calendar.selectors';
import { fetchWeeksAction } from '../../calendar.actions';

const mapStateToProps = (state, ownProps) => ({
  week: getCurrentWeek(state, ownProps.selectedWeek),
});

const mapDispatchToProps = dispatch => ({
  fetchWeeksAction: weekId => dispatch(fetchWeeksAction(weekId)),
});

export const BodyCalendarConnected = connect(mapStateToProps, mapDispatchToProps)(BodyCalendar);
