import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Table from "./table.component";

import { fetchClassesAction } from "../../school/school.actions";
import { getClasses } from "../../school/school.selectors";

import { fetchDatesAction } from "../calendar.actions";
import { getDates } from "../calendar.selectors";

const mapStateToProps = state => ({
	dates: getDates(state),
	classes: getClasses(state),
});

const mapDispatchToProps = dispatch => ({
	fetchClasses: () => dispatch(fetchClassesAction()),
	fetchDates: () => dispatch(fetchDatesAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Table));
