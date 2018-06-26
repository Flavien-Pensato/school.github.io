
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormStyle = styled.form`
  margin: .5rem auto;
	max-width: 30em;
	padding: 1rem;
`;

export const Form = ({ className, onSubmit, children }) => (
  <FormStyle className={className} onSubmit={onSubmit}>
    {children}
  </FormStyle>
);

Form.defaultProps = {
  className: '',
};

Form.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
