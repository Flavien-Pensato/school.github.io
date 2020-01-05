import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import { Loader } from '../../components/loader.page';
import firebase from '../../config/firebase';

const auth = firebase.auth();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stopObserver = auth.onAuthStateChanged(user => {
      if (!user) {
        Router.push('/logout');
      }

      setLoading(false);
    });

    return stopObserver;
  }, []);

  if (loading) {
    return <Loader />;
  }

  return children;
};

export default AuthProvider;
