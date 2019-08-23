import React from 'react';
import PropTypes from 'prop-types';
import { Item } from '../components/item';
import { Button } from '../components/button';

export const Task = ({ name, onRemove }) => (
  <Item>
    <span>{name}</span>
    <Button onClick={onRemove}>Supprimer</Button>
  </Item>
);

Task.propTypes = {
  name: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
