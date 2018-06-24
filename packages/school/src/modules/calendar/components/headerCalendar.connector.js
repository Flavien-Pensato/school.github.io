import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HeaderCalendar from './headerCalendar.component';

import { goPreviousWeekAction, goNextWeekAction } from '../calendar.actions';

import { getSelectedWeek } from '../calendar.selectors';

const mapStateToProps = state => ({
  currentWeek: getSelectedWeek(state),
});

const mapDispatchToProps = dispatch => ({
  goPreviousWeek: () => dispatch(goPreviousWeekAction()),
  goNextWeek: () => dispatch(goNextWeekAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderCalendar));
