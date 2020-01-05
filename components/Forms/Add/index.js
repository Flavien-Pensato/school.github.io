import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Form, Label, Button, Input, InputCheckbox, InputNumber, H3, Span, Select } from '../../../elements';

const LabelSwitch = styled(Label)`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const SpanRound = styled(Span)`
  border-radius: 34px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

const InputCheck = styled(InputCheckbox)`
  opacity: 0;
  width: 0;
  height: 0;

  &:focus + ${SpanRound} {
    box-shadow: 0 0 1px #f58c18;
  }

  &:checked + ${SpanRound} {
    background-color: #f58c18;
  }

  &:checked + ${SpanRound}:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const Add = ({ handleClose, classes }) => {
  const [toggle, setToggle] = useState(false);

  const handleChange = useCallback(() => setToggle(!toggle), [toggle]);

  return (
    <Form>
      <H3 m="0">Création</H3>
      <Label>
        <Span>Name</Span>
        <br />
        <Input required border="1px solid black" />
      </Label>
      <br />
      <br />
      <Span color={!toggle && 'primary'} fontSize={['16px', '18px']}>
        Étudiant&nbsp;
      </Span>
      <LabelSwitch>
        <InputCheck required checked={toggle} onChange={handleChange} />
        <SpanRound />
      </LabelSwitch>
      <Span color={toggle && 'primary'} fontSize={['16px', '18px']}>
        &nbsp;Classe
      </Span>
      <br />
      <br />
      {!toggle && (
        <Label>
          <Span>Groupe</Span>
          <br />
          <InputNumber min="0" required border="1px solid black" />
        </Label>
      )}
      <br />
      <br />
      {!toggle && (
        <Label>
          <Span>Classe</Span>
          <br />
          <Select required>
            {classes.map(classe => (
              <option key={classe.key}>{classe.val().name}</option>
            ))}
          </Select>
        </Label>
      )}
      <br />
      <br />
      <Span display="flex" justifyContent="space-between">
        <Button onClick={handleClose}>Fermer</Button>
        <Button onClick={handleClose} variant="primary">
          Créer
        </Button>
      </Span>
    </Form>
  );
};

Add.propTypes = {
  classes: PropTypes.shape().isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Add;
