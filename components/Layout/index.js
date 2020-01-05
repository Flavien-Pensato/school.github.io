import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import Header from '../header';
import { DisplayProvider } from '../../modules/display/display.context';

const Layout = ({ children, router: { pathname } }) =>
  pathname.includes('error') ? (
    children
  ) : (
    <DisplayProvider>
      <Header />
      {children}
    </DisplayProvider>
  );

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Layout);
