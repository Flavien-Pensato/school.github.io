import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Button } from "ui.github.io";

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
			<form className="measure center ma2-ns pa3" onSubmit={this.signin.bind(this)}>
				<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					<legend className="f4 fw6 ph0 mh0">Connection</legend>
					<div className="mt3">
						<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email" />
					</div>
					<div className="mv3">
						<label className="db fw6 lh-copy f6" htmlFor="password">Mot de passe</label>
						<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
					</div>
				</fieldset>
				<div className="">
				
					<Button type="submit">Se connecter</Button>
				</div>
			</form>
		);
	}
}

Signin.propTypes = {
	uid: PropTypes.string,
	signIn: PropTypes.func.isRequired
};

export default Signin;
