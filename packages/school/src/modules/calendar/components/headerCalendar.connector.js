import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HeaderCalendar from './headerCalendar.component';

import { goPreviousWeekAction, goNextWeekAction } from '../calendar.actions';

import { getDates, getWeeks, getSelectedWeek } from '../calendar.selectors';
import { getClasses, getTasks } from '../../school/school.selectors';

const mapStateToProps = state => ({
  classes: getClasses(state),
  tasks: getTasks(state),
  dates: getDates(state),
  weeks: getWeeks(state),
  currentWeek: getSelectedWeek(state),
});

const mapDispatchToProps = dispatch => ({
  goPreviousWeek: () => dispatch(goPreviousWeekAction()),
  goNextWeek: () => dispatch(goNextWeekAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderCalendar));
