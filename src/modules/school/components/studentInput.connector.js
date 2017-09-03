import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { editStudentAction, removeStudentAction } from "../school.actions";

import StudentInput from "./studentInput.component";

const mapDispatchToProps = dispatch => ({
	editStudent: student => dispatch(editStudentAction(student)),
	removeStudent: _id => dispatch(removeStudentAction(_id)),
});

export default withRouter(
	connect(undefined, mapDispatchToProps)(StudentInput)
);
