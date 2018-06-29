import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HeaderCalendar from './headerCalendar.component';
import { getSelectedWeek } from '../calendar.selectors';

const mapStateToProps = (state, ownProps) => ({
  week: getSelectedWeek(state, ownProps.match.params._id),
});

export default withRouter(connect(mapStateToProps)(HeaderCalendar));
