import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;

  @media (max-width: 700px) {
    padding: 1rem;
  }
`;

const HomePage = () => <Wrapper />;

HomePage.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      _id: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(HomePage);
