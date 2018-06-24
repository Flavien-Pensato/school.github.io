import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { BodyCalendar } from './bodyCalendar.component';

import { getCurrentWeek } from '../../calendar.selectors';
import { fetchWeeksAction } from '../../calendar.actions';

const mapStateToProps = (state, ownProps) => ({
  week: getCurrentWeek(state, ownProps.match.params._id),
});

const mapDispatchToProps = dispatch => ({
  fetchWeeksAction: weekId => dispatch(fetchWeeksAction(weekId)),
});

export const BodyCalendarConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(BodyCalendar));
