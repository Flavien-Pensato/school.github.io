import React, { useEffect } from 'react';

import firebase from '../config/firebase';
import LoginForm from '../components/Forms/Login';

const Logout = () => {
  useEffect(() => {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }
  }, []);

  return <LoginForm />;
};

export default Logout;
