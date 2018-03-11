import React, { Fragment } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5rem;
  background-color: transparent;
  width: 100%;
  border-style: solid;
  border-width: 1px;
  font-family: sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

export default props => (
  <Fragment>
    <Input {...props} />
  </Fragment>
);
