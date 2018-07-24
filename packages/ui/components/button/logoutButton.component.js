import React from 'react';
import styled from 'styled-components';

const LogoutButtonStyle = styled.button`
  font-size: 0.875rem;
  font-weight: 700;

  @media (max-width: 700px) {
    position: inherit;

    span {
      display: none;
    }
  }
`;

export const LogoutButton = props => <LogoutButtonStyle {...props} />;
