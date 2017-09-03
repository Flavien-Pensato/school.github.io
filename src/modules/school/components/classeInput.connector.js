import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { editClasseAction } from "../school.actions";

import ClasseInput from "./classeInput.component";

const mapDispatchToProps = dispatch => ({
	editClasse: classe => dispatch(editClasseAction(classe)),
});

export default withRouter(
	connect(undefined, mapDispatchToProps)(ClasseInput)
);
