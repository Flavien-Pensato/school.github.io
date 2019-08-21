import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const DivContent = styled.div`
  margin: 1rem 0;
`;

const LabelForm = styled.label`
  font-size: 0.875rem;
  line-height: 1.5;
  font-weight: 600;
  font-family: sans-serif;
  color: black;
`;

const InputStyle = styled.input`
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

export const Input = props => <InputStyle {...props} />;

export const InputForm = ({ type, name, textLabel }) => (
  <DivContent>
    <LabelForm htmlFor={name}>{textLabel}</LabelForm>
    <InputStyle type={type} name={name} id={name} />
  </DivContent>
);

InputForm.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  textLabel: PropTypes.string.isRequired,
};
