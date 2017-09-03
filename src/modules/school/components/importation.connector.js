import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { importFileAction } from "../school.actions";
import { getPreview } from "../school.selectors";

import Importation from "./importation.component";

const mapStateToProps = state => ({
	preview: getPreview(state)
});

const mapDispatchToProps = dispatch => ({
	importFile: pathFile => dispatch(importFileAction(pathFile))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Importation)
);
