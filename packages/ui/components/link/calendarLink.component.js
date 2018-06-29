import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const LinkStyle = styled(NavLink)`
  font-size: 1rem;
  color: black;
  border-style: solid;
  border-width: 1px;
  background-color: black;
  color: white;
  padding: 0.5rem;
`;

export const CalendarLink = props => <LinkStyle {...props} />;
