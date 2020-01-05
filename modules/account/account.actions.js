import _ from 'lodash';
import firebase from 'firebase/app';

import { SIGNIN, SIGNOUT, AUTO_LOGIN_DONE } from './account.constants';

export const login = user => ({
  type: SIGNIN,
  user: _.pick(user, ['email', 'uid', 'refreshToken']),
});

export const logout = () => ({
  type: SIGNOUT,
  user: null,
});

export const autoLogin = () => dispatch => {
  const stopObserver = firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(login(user));
    }

    dispatch({
      type: AUTO_LOGIN_DONE,
    });

    stopObserver();
  });
};

export function signIn(email, password) {
  return dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(login(user));
      });
  };
}

export function signOut() {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(error => {
        if (!error) {
          dispatch(logout());
        }
      });
  };
}
