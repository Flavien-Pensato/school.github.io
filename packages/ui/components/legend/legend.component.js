import React from 'react';
import styled from 'styled-components';

const LegendStyle = styled.legend`
  font-size: 1.25rem;
  font-weight: 600;
  font-family: sans-serif;
  color: black;
`;

export const Legend = ({ children }) => <LegendStyle>{children}</LegendStyle>;
