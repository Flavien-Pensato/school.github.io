import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { buttonThemes, buttonSizes } from './button.style';

const ButtonStyled = styled.button`
  font-size: ${props => props.size};
  padding: 0.5rem 1rem;
  background-color: ${props => buttonThemes[props.type].backgroundColor};
  color: ${props => buttonThemes[props.type].color};
  border-color: ${props => buttonThemes[props.type].borderColor};
  border-style: solid;
`;

export const Button = ({ type, size, children, ...props }) => (
  <ButtonStyled type={type} size={size} {...props}>
    {children}
  </ButtonStyled>
);

Button.defaultProps = {
  type: 'secondary',
  size: buttonSizes.medium,
};

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(buttonSizes),
  children: PropTypes.node.isRequired,
};
