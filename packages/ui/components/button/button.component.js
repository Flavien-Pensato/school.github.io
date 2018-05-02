import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  font-weight: 700;
  display: inline-block;
  border-color: #000;
  border-style: solid;
  border-width: 1px;
`;

export const Button = props => <ButtonStyle {...props} />;
