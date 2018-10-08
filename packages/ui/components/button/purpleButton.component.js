import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  font-size: .875rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  background-color: #a463f2;
  color: #fff;
  border-radius: 9999px;
  border-style: none;
  border-width: 0;

  @media (max-width: 700px) {
    span {
      display: none;
    }
  }
`;

export const PurpleButton = props => <ButtonStyle {...props} />;
