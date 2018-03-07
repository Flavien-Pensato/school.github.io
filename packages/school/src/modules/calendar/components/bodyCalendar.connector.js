import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import BodyCalendar from "./bodyCalendar.component";

import { getWeeks, getSelectedWeek } from "../calendar.selectors";

const mapStateToProps = state => ({
	weeks: getWeeks(state),
	currentWeek: getSelectedWeek(state),
});

export default withRouter(connect(mapStateToProps)(BodyCalendar));
