import { connect } from 'react-redux';

import { BodyCalendar } from './bodyCalendar.component';

import { getCurrentWeek } from '../../calendar.selectors';

const mapStateToProps = (state, ownProps) => ({
  week: getCurrentWeek(state, ownProps.selectedWeek),
});

const mapDispatchToProps = dispatch => ({
});

export const BodyCalendarConnected = connect(mapStateToProps, mapDispatchToProps)(BodyCalendar);
