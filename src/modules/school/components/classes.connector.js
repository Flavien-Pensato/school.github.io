import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchClassesAction, fetchStudentsAction, setPreviewAction } from "../school.actions";

import { getClasses, getStudents } from "../school.selectors";

import Classes from "./classes.component";

const mapStateToProps = state => ({
	classes: getClasses(state),
	students: getStudents(state)
});

const mapDispatchToProps = dispatch => ({
	fetchClasses: () => dispatch(fetchClassesAction()),
	fetchStudents: classeId => dispatch(fetchStudentsAction(classeId)),
	setPreview: classe => dispatch(setPreviewAction(classe))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Classes)
);
