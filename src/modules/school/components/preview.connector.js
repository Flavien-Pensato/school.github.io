import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Preview from "./preview.component";
import { getPreview, getClasse, getStudents } from "../school.selectors";
import {
	editClasseAction,

	createStudent,
	addStudent,
	removeStudent,
	editStudent,
	editClassname,
	resetClasseAction
} from "../school.actions";

const mapStateToProps = state => ({
	preview: getPreview(state),
	classe: getClasse(state, getPreview(state)),
	students: getStudents(state, getPreview(state))
});

const mapDispatchToProps = dispatch => ({
	editClasse: classe => dispatch(editClasseAction(classe)),
	createStudent: student => dispatch(createStudent(student)),
	addStudent: () => dispatch(addStudent()),
	removeStudent: studentIndex => dispatch(removeStudent(studentIndex)),
	editClassname: className => dispatch(editClassname(className)),
	resetClasse: () => dispatch(resetClasseAction()),
	editStudent: (student, studentIndex) =>
		dispatch(editStudent(student, studentIndex))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Preview)
);
