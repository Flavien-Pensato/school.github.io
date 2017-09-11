import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setPreviewAction } from "../school.actions";

import { getClasses } from "../school.selectors";

import Classes from "./classes.component";

const mapStateoProps = state => ({
	classes: getClasses(state)
});

const mapDispatchToProps = dispatch => ({
	setPreview: classe => dispatch(setPreviewAction(classe))
});

export default withRouter(
	connect(mapStateoProps, mapDispatchToProps)(Classes)
);
