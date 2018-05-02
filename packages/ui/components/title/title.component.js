import React from 'react';
import styled from 'styled-components';

const TitleForm = styled.h2`
  font-size: 2rem;
  font-family: sans-serif;
  padding: 0.5rem 1rem;
  background-color: transparent;
  text-transform: uppercase;
  font-weight: 700;
  display: inline-block;
`;

export const Title = props => <TitleForm {...props} />;
