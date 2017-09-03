import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { autoLogin, signOut } from "../../modules/account/account.actions";

class Home extends Component {
	render() {
		return (
			<div>
				<button className="btn btn-signout" onClick={this.props.signOut}>
          Se déconnecter
				</button>
				<span>
          Nous sommes le {moment().format("LL")}
				</span>
				<nav>
					<NavLink to="/eleves" activeClassName="selected">
            Élèves
					</NavLink>
					<NavLink to="/calendrier" activeClassName="selected">
            Calendrier
					</NavLink>
				</nav>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	autoLogin: () => dispatch(autoLogin()),
	signOut: () => dispatch(signOut())
});

export default withRouter(connect(undefined, mapDispatchToProps)(Home));
