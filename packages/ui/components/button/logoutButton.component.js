import React from 'react';
import styled from 'styled-components';

const LogoutButtonStyle = styled.button`
  position: absolute;
  font-size: 0.875rem;
  font-weight: 700;
  top: 20px;
  right: 20px;
`;

export const LogoutButton = props => <LogoutButtonStyle {...props} />;
