import { connect } from 'react-redux';

import { BodyCalendar } from './bodyCalendar.component';

// import { getCurrentWeek } from '../../calendar.selectors';
// import { fetchWeeksAction } from '../../calendar.actions';

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export const BodyCalendarConnected = connect()(BodyCalendar);
