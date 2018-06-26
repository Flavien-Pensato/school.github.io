import React from 'react';
import styled from 'styled-components';

const HeaderButtonStyle = styled.button`
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  font-weight: 400;
  border-style: solid;
  border-width: 1px;
`;

export const HeaderButton = props => <HeaderButtonStyle {...props} />;
