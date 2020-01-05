import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import Header from '../Header';
import Div from '../../elements/Div';
import { DisplayProvider } from '../../modules/display/display.context';

const Layout = ({ children, router: { pathname } }) =>
  ['error', 'logout'].find(str => pathname.includes(str)) ? (
    children
  ) : (
    <DisplayProvider>
      <Div id="modal-root" />
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