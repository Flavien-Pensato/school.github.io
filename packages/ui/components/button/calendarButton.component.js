import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  font-size: 1rem;
  color: black;
  border-style: solid;
  border-width: 1px;
  background-color: black;
  color: white;
  padding: 0.5rem;
`;

export const CalendarButton = props => <ButtonStyle {...props} />;
