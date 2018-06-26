import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const HeaderLinkStyle = styled(NavLink)`
  font-size: .875rem;
  text-decoration: underline;
  padding: .5rem 1rem;
  font-weight: 400;
`;

export const HeaderLink = props => <HeaderLinkStyle {...props} />;

HeaderLink.propTypes = {
  children: PropTypes.any.isRequired,
};
