import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Signin from "./signin.component";

import { signIn, autoLogin } from "../account.actions";
import { getUid } from "../account.selectors";

const mapStateToProps = state => ({
	uid: getUid(state)
});

const mapDispatchToProps = dispatch => ({
	signIn: (email, password) => dispatch(signIn(email, password)),
	autoLogin: () => dispatch(autoLogin())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
