import { connect } from 'react-redux';

import { BodyCalendar } from './bodyCalendar.component';

import { getCurrentWeek } from '../../calendar.selectors';
import { fetchWeekAction } from '../../calendar.actions';

const mapStateToProps = (state, ownProps) => ({
  week: getCurrentWeek(state, ownProps.selectedWeek),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchWeek: () => dispatch(fetchWeekAction(ownProps.selectedWeek)),
});

export const BodyCalendarConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BodyCalendar);
