import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font-size: .875rem;
  padding: .5rem 1rem;
  background-color: transparent;
  font-weight: 700;
  display: inline-block;
  border-color: #000;
  border-style: solid;
  border-width: 1px;
`

export default props => <Button {...props} />;
