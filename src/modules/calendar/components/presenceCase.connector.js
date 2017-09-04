import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PresenceCase from "./presenceCase.component";

import { addDateAction, removeDateAction } from "../calendar.actions";

const mapDispatchToProps = dispatch => ({
	addDate: date => dispatch(addDateAction(date)),
	removeDate: date => dispatch(removeDateAction(date)),
});

export default withRouter(connect(undefined, mapDispatchToProps)(PresenceCase));
