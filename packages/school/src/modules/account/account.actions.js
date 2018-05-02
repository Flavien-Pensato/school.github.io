import _ from 'lodash';
import firebase from '../../config/firebase';

import { SIGNIN, SIGNOUT, AUTO_LOGIN_DONE } from './account.constants';
import { showToaster } from '../display/display.actions';

export const login = user => ({
  type: SIGNIN,
  user: _.pick(user, ['email', 'uid', 'refreshToken']),
});

export const logout = () => ({
  type: SIGNOUT,
  user: null,
});

export const autoLogin = () => (dispatch) => {
  const stopObserver = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(login(user));
    }

    dispatch(showToaster('La connexion automatique à fini'));
    dispatch({
      type: AUTO_LOGIN_DONE,
    });

    stopObserver();
  });
};

export function signIn(email, password) {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(login(user));
        dispatch(showToaster('Connexion reussi'));
      });
  };
}

export function signOut() {
  return (dispatch) => {
    firebase.auth().signOut().then((error) => {
      if (!error) {
        dispatch(logout());
        dispatch(showToaster('Déconnection réussi'));
      }
    });
  };
}
