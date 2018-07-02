import { connect } from 'react-redux';

import HeaderCalendar from './headerCalendar.component';
import { getSelectedWeek } from '../../calendar.selectors';

const mapStateToProps = (state, ownProps) => ({
  week: getSelectedWeek(state, ownProps.selectedWeek),
});

export const HeaderCalendarConnected = connect(mapStateToProps)(HeaderCalendar);
