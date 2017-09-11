import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Preview from "./preview.component";
import { getPreview, getClasse } from "../school.selectors";

import {
	resetPreviewClasseAction
} from "../school.actions";

const mapStateToProps = state => ({
	preview: getPreview(state),
	classe: getClasse(state, getPreview(state)),
});

const mapDispatchToProps = dispatch => ({
	resetPreviewClasse: () => dispatch(resetPreviewClasseAction()),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Preview)
);
