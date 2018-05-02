import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, InputForm, Legend, Form } from '@school/ui';

import { signIn } from '../../modules/account/account.actions';
import { getUid } from '../../modules/account/account.selectors';

class Login extends Component {
	signin = (event) => {
	  event.preventDefault();

	  const { signInAction } = this.props;

	  signInAction(event.target.email.value, event.target.passwordLogin.value);
	};

	render() {
	  const { uid } = this.props;

	  if (uid) {
	    return <Redirect to={{ pathname: '/' }} />;
	  }

	  return (
  <Form onSubmit={this.signin}>
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <Legend>Connection</Legend>
      <InputForm type="email" name="email" textLabel="Email" />
      <InputForm type="password" name="passwordLogin" textLabel="Mot de passe" />
    </fieldset>
    <Button type="submit">Se connecter</Button>
  </Form>
	  );
	}
}

Login.defaultProps = {
  uid: '',
};

Login.propTypes = {
  uid: PropTypes.string,
  signInAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: getUid(state),
});

const mapDispatchToProps = dispatch => ({
  signInAction: (email, password) => dispatch(signIn(email, password)),
});

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);
