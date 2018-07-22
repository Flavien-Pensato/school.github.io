import React from 'react';
import styled from 'styled-components';

const LogoutButtonStyle = styled.button`
  position: absolute;
  font-size: 0.875rem;
  font-weight: 700;
  top: 20px;
  right: 20px;
  
  &:after {
    content: 'Se déconnecter';
  }
  
  @media (max-width: 700px) {
    background-image: url('/baseline-exit_to_app-24px.svg')
  }
`;

export const LogoutButton = props => <LogoutButtonStyle {...props} />;
