import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item } from '../components/item';
import { Button } from '../components/button';

import firebase from '../config/firebase';

const taskRef = '/tasks/';

export class Task extends Component {
  handleDelete = () => {
    const { id } = this.props;

    firebase
      .database()
      .ref(taskRef + id)
      .remove();
  };

  render() {
    const { name } = this.props;

    return (
      <Item>
        <span>{name}</span>
        <Button onClick={this.handleDelete}>Supprimer</Button>
      </Item>
    );
  }
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
