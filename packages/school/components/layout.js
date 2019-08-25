import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import { ToasterConnected } from '../modules/display/components/toaster.connector';
import { HeaderDefaultConnected } from '../components/headerDefault.header';
import { Loader } from '../components/loader.page';
import firebase from '../config/firebase';
import { DisplayProvider } from '../modules/display/display.context';

const Layout = ({ children, router }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const stopObserver = firebase.auth().onAuthStateChanged(user => {
      if (!user && router.pathname !== '/login') {
        router.replace('/login');
      }

      setLoading(false);
    });

    return stopObserver;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <ToasterConnected />
      {router.pathname !== '/login' ? <HeaderDefaultConnected /> : null}
      <DisplayProvider>
        <div>{children}</div>
      </DisplayProvider>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Layout);
