import React from 'react';
import styled from 'styled-components';

const HeaderTitleStyle = styled.h1`
  font-size: 2rem;
  padding: 1rem 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;

  @media (max-width: 700px) {
    font-size: 1rem;
  }
`;

export const HeaderTitle = props => <HeaderTitleStyle {...props} />;
