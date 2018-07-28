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

  @media (max-width: 700px) {
    background-color: transparent;
    border: none;
    display: block;
    height: 24px;
    width: 24px;
    padding: 0;

    span {
      display: none;
    }
  }
`;

export const CalendarLink = props => <LinkStyle {...props} />;
