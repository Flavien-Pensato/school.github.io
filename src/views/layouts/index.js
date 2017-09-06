import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { withRouter } from "react-router-dom";

import { autoLogin, signOut } from "../../modules/account/account.actions";
import { getUid, getAutoLoginDone } from "../../modules/account/account.selectors";

class LayoutDefault extends Component {
	componentWillMount() {
		const { autoLogin, uid } = this.props;

		if (!uid) {
			autoLogin();
		}
	}

	render() {
		const { uid, autoLoginDone } = this.props;

		if (!uid && autoLoginDone) {
			return <Redirect to={{ pathname: "/login" }} />;
		}

		return (
			<header className="vh-15">
				<div className="cover bg-left bg-center-l">
					<div className="pb6-m">
						<nav className="dt w-100 mw8 center"> 
							<div className="dtc v-mid tr pa3 fl">
								Nous sommes le {moment().format("LL")}
							</div>
							<div className="dtc v-mid tr pa3 pv2 ph3">
								<NavLink to="/" className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
									Accueil
								</NavLink>
								<NavLink to="/eleves" className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
								Élèves
								</NavLink>
								<NavLink to="/calendrier" className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
								Calendrier
								</NavLink>
								<NavLink to="/taches" className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
								Taches
								</NavLink>
								<button className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" onClick={this.props.signOut}>
								Se déconnecter
								</button>
							</div>
						</nav> 
					</div>
				</div> 
			</header>
		);
	}
}

LayoutDefault.propTypes = {
	autoLogin: PropTypes.func.isRequired,
	signOut: PropTypes.func.isRequired,

	uid: PropTypes.string,
	autoLoginDone: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	uid: getUid(state),
	autoLoginDone: getAutoLoginDone(state)
});

const mapDispatchToProps = dispatch => ({
	autoLogin: () => dispatch(autoLogin()),
	signOut: () => dispatch(signOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutDefault));
