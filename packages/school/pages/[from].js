import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '@school/ui';
import { withRouter } from 'next/router';

const HomePage = () => <Wrapper />;

HomePage.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      _id: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(HomePage);
