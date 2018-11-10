import { connect } from 'react-redux';

import HeaderCalendar from './headerCalendar.component';
import { getSelectedWeek } from '../../calendar.selectors';
import { addWeekAction, goPrevWeek, goNextWeek } from '../../calendar.actions';

const mapStateToProps = (state, ownProps) => ({
  week: getSelectedWeek(state, ownProps.selectedWeek),
});

const mapDispatchToProps = dispatch => ({
  addWeek: week => dispatch(addWeekAction(week)),
  goNextWeek: () => dispatch(goNextWeek()),
  goPrevWeek: () => dispatch(goPrevWeek()),
});

export const HeaderCalendarConnected = connect(mapStateToProps, mapDispatchToProps)(HeaderCalendar);
