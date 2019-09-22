import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Badge } from 'react-bootstrap';

import firebase from '../config/firebase';

import { Item } from './item';
import { Trash } from './trash';
import { PurpleButton } from './button';

const studentsRef = '/students/';

const InputGroupe = styled.input`
  border: solid black 1px;
  max-width: 60px;
  margin-right: 50px;
  text-align: center;

  @media (max-width: 700px) {
    margin-right: 10px;
    max-width: 40px;
  }
`;

const InputName = styled.span`
  margin-right: auto;
`;
export class Student extends Component {
  constructor(props) {
    super(props);

    const { name, groupe } = props;

    this.state = {
      name: name || '',
      groupe: groupe || 0,
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
      .ref(studentsRef + id)
      .update({
        [name]: target.type === 'number' ? Number(value) : value,
      });
  };

  handleDelete = event => {
    event.preventDefault();

    const { id } = this.props;

    firebase
      .database()
      .ref(studentsRef + id)
      .remove();
  };

  render() {
    const { wrongGroupe } = this.props;
    const { name, groupe } = this.state;

    return (
      <Item>
        <InputName name="name" onBlur={this.handleInputChange}>
          {name}
        </InputName>
        {wrongGroupe && <Badge variant="danger">Mauvaise classe</Badge>}
        <InputGroupe type="number" name="groupe" defaultValue={groupe} onBlur={this.handleInputChange} />
        <PurpleButton onClick={this.handleDelete}>
          <span>Supprimer</span>
          <Trash />
        </PurpleButton>
      </Item>
    );
  }
}

Student.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  groupe: PropTypes.number.isRequired,
  wrongGroupe: PropTypes.bool.isRequired,
};
