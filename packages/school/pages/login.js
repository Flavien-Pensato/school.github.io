import React, { Component } from 'react';
import { InputForm } from '@school/ui';
import Router from 'next/router';
import firebase from '../config/firebase';

import { Button } from '../components/button';

class Login extends Component {
  signin = event => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(event.target.email.value, event.target.passwordLogin.value)
      .then(() => {
        Router.replace('/');
        // dispatch(login(user));
        // dispatch(showToaster('Connexion reussi'));
      });
  };

  render() {
    return (
      <form onSubmit={this.signin}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend>Connection</legend>
          <InputForm type="email" name="email" textLabel="Email" />
          <InputForm type="password" name="passwordLogin" textLabel="Mot de passe" />
        </fieldset>
        <Button type="submit">Se connecter</Button>
      </form>
    );
  }
}

export default Login;
