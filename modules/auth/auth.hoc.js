import React, { useState, useEffect } from 'react';

import { Loader } from '../../components/loader.page';
import LoginForm from '../../components/Forms/Login';
import firebase from '../../config/firebase';

export const withAuth = Component => {
  const AuthWrapper = props => {
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
      const stopObserver = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }

        setLoading(false);
      });

      return stopObserver;
    }, []);

    if (loading) {
      return <Loader />;
    }

    if (!isConnected) {
      return <LoginForm />;
    }

    return <Component {...props} />;
  };

  return AuthWrapper;
};
