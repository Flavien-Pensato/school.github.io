import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Preview from "./preview.component";
import { getPreview, getClasse, getStudents } from "../school.selectors";
import {
	
	addStudentAction,
	editStudentAction,
	removeStudentAction,
	
	editClasseAction,
	resetPreviewClasseAction
} from "../school.actions";

const mapStateToProps = state => ({
	preview: getPreview(state),
	classe: getClasse(state, getPreview(state)),
	students: getStudents(state, getPreview(state))
});

const mapDispatchToProps = dispatch => ({
	addStudent: student => dispatch(addStudentAction(student)),
	removeStudent: student => dispatch(removeStudentAction(student)),
	editStudent: student => dispatch(editStudentAction(student)),

	editClasse: classe => dispatch(editClasseAction(classe)),

	resetPreviewClasse: () => dispatch(resetPreviewClasseAction()),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Preview)
);
