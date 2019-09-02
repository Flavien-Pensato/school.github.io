import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import firebase from '../config/firebase';

import { Item } from './item';
import { PurpleButton } from './button';

const classeRef = '/classes/';

export class Classe extends Component {
  constructor(props) {
    super(props);

    const { name, sort } = props;

    this.state = {
      name: name || '',
      sort: sort || 0,
    };
  }

  handleInputChange = event => {
    event.preventDefault();
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const { id } = this.props;

    this.setState({
      [name]: value,
    });

    firebase
      .database()
      .ref(classeRef + id)
      .update({
        [name]: target.type === 'number' ? Number(value) : value,
      });
  };

  handleDelete = event => {
    event.preventDefault();

    const { id } = this.props;

    firebase
      .database()
      .ref(classeRef + id)
      .remove();
  };

  render() {
    const { id } = this.props;
    const { name, sort } = this.state;

    return (
      <Item>
        <div>
          <input key="name" name="name" type="text" value={name} onChange={this.handleInputChange} />
        </div>
        <div>
          <input key="sort" name="sort" type="number" value={sort} onChange={this.handleInputChange} />
        </div>
        <div>
          <Link href={`/classes/${id}`}>
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
};
