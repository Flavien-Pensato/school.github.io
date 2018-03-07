import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Table from "./table.component";

import { getClasses } from "../../school/school.selectors";

import { getDates } from "../calendar.selectors";

const mapStateToProps = state => ({
	dates: getDates(state),
	classes: getClasses(state),
});

export default withRouter(connect(mapStateToProps, undefined)(Table));
