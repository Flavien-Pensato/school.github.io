import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Toaster from "./toaster.component";

import { getToaster } from "../display.selectors";

const mapStateToProps = state => ({
	toaster: getToaster(state)
});

export default withRouter(connect(mapStateToProps)(Toaster));
