import React from 'react';
import styled from 'styled-components';

const LogoutButtonStyle = styled.button`
  position: absolute;
  font-size: 0.875rem;
  font-weight: 700;
  top: 0;
  right: 0;
`;

export const LogoutButton = props => <LogoutButtonStyle {...props} />;
