import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _ from 'lodash';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  z-index: 100;
  height: auto;
  min-height: 75px;
  width: auto;
  padding: 15px 25px;

  color: white;
  font-size: 1.2rem;
  text-align: center;

  opacity: ${props => (props.toaster ? 1 : 0)};
  transition: transform 0.3s, opacity 0.5s;
  background-color: ${props => (props.toaster ? 'green' : 'transparent')};
`;

export const Toaster = ({ toaster }) => (
  <Wrapper toaster={!_.isEmpty(toaster)}>
    <span>{toaster.message}</span>
  </Wrapper>
);

Toaster.propTypes = {
  toaster: PropTypes.shape().isRequired,
};
