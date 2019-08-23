import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { textThemes, textSizes, textWeight } from './text.style';

const FragmentStyled = styled.span`
  font-size: ${props => textSizes[props.size]};
  font-family: ${props => props.family};
  font-weight: ${props => textWeight[props.weight]};
`;

export const Text = ({ weight, family, size, children, ...props }) => (
  <FragmentStyled size={size} family={family} weight={weight} {...props}>
    {children}
  </FragmentStyled>
);

Text.defaultProps = {
  family: '"Lucida Console", Monaco, monospace',
  weight: 'normal',
  size: 'medium',
};

Text.propTypes = {
  family: PropTypes.string,
  weight: PropTypes.oneOf(textWeight),
  size: PropTypes.oneOf(textSizes),
  children: PropTypes.node.isRequired,
};
