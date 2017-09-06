import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchClassesAction, setPreviewAction } from "../school.actions";

import { getClasses } from "../school.selectors";

import Classes from "./classes.component";

const mapStateToProps = state => ({
	classes: getClasses(state),
});

const mapDispatchToProps = dispatch => ({
	fetchClasses: () => dispatch(fetchClassesAction()),
	setPreview: classe => dispatch(setPreviewAction(classe))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Classes)
);
