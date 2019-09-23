import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Item } from './item';
import { PurpleButton } from './button';

export class Classe extends Component {
  handleInputChange = event => {
    event.preventDefault();
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const { id, editClasse } = this.props;

    editClasse({
      id,
      [name]: target.type === 'number' ? Number(value) : value,
    });
  };

  handleDelete = event => {
    event.preventDefault();

    const { id, removeClasse } = this.props;

    removeClasse(id);
  };

  render() {
    const { name, sort, id } = this.props;

    return (
      <Item>
        <div>
          <input key="name" name="name" type="text" defaultValue={name} onBlur={this.handleInputChange} />
        </div>
        <div>
          <input key="sort" name="sort" type="number" defaultValue={sort} onBlur={this.handleInputChange} />
        </div>
        <div>
          <Link href={{ pathname: '/students', query: { classeId: id } }}>
            <a>acces</a>
          </Link>
        </div>
        <PurpleButton onClick={this.handleDelete}>Supprimer</PurpleButton>
      </Item>
    );
  }
}

Classe.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sort: PropTypes.number.isRequired,
  editClasse: PropTypes.func.isRequired,
  removeClasse: PropTypes.func.isRequired,
};
