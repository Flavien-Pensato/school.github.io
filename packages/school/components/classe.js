import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import slug from 'slug';

import { Item } from './item';
import { PurpleButton } from './button';

export const Classe = ({ name, onDelete }) => (
  <Item>
    <Link href={`/classes/${slug(name)}`}>
      <span>{name}</span>
    </Link>
    <PurpleButton onClick={onDelete}>Supprimer</PurpleButton>
  </Item>
);

Classe.propTypes = {
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
