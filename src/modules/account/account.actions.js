import _ from "lodash";
import firebase from "../../firebase";

import { SIGNIN, SIGNOUT, AUTO_LOGIN_DONE } from "./account.constants";
import { showToaster } from "../display/display.actions";

export function signIn(email, password) {
	return function(dispatch) {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(result => {
				dispatch({
					type: SIGNIN,
					user: _.pick(result, ["email", "uid", "refreshToken"])
				});
				dispatch(showToaster("Connexion reussi"));
			})
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(error);
			});
	};
}

export function autoLogin() {
	return function(dispatch) {
		firebase.auth().onAuthStateChanged(function(result) {
			if (result) {
				dispatch({
					type: SIGNIN,
					user: _.pick(result, ["email", "uid", "refreshToken"])
				});
				dispatch({ type: AUTO_LOGIN_DONE });
				dispatch(showToaster("Connection réussi"));
			} else {
				dispatch({ type: AUTO_LOGIN_DONE });
				dispatch(showToaster("La connection à échoué"));
			}
		});
	};
}

export function signOut() {
	return function(dispatch) {
		firebase.auth().signOut().then(error => {
			if (!error) {
				dispatch({
					type: SIGNOUT
				});
			} else {
				console.log(error);
			}
		});
	};
}
