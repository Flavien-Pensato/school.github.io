import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

class Signin extends Component {
	signin(event) {
		event.preventDefault();

		const { signIn } = this.props;

		signIn(event.target.email.value, event.target.password.value);
	}

	render() {
		const { uid } = this.props;

		if (uid) {
			return <Redirect to={{ pathname: "/" }} />;
		}

		return (
			<div>
				<form onSubmit={this.signin.bind(this)}>
					<input type="email" name="email" />
					<input type="password" name="password" />
					<input type="submit" />
				</form>
			</div>
		);
	}
}

Signin.propTypes = {
	uid: PropTypes.string,
	signIn: PropTypes.func.isRequired
};

export default Signin;
