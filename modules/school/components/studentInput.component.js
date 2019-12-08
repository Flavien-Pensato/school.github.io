import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { editStudentAction, removeStudentAction } from '../school.actions';

import { uuidv4 } from '../../../modules/utils';

export class StudentInput extends Component {
  handleOnChangeName = e => {
    e.preventDefault();
    const { classeId, _id } = this.props;

    if (e.currentTarget.value) {
      editStudentAction(classeId, _id, 'name', e.currentTarget.value);
    }
  };

  handleOnChangeGroup = e => {
    const { classeId, _id } = this.props;
    e.preventDefault();

    if (e.currentTarget.value) {
      editStudentAction(classeId, _id, 'group', parseInt(e.currentTarget.value, 10));
    }
  };

  handleOnClick = e => {
    const { classeId, _id } = this.props;
    e.preventDefault();

    removeStudentAction(classeId, _id);
  };

  render() {
    const { name, group } = this.props;

    return (
      <tr>
        <td className="pv3 pr3 bb b--black-20">
          <input
            className="pa2 input-reset ba bg-transparent w-100 measure"
            type="text"
            name="name"
            value={name}
            onChange={this.handleOnChangeName}
          />
        </td>
        <td className="pv3 pr3 bb b--black-20">
          <input
            className="pa2 input-reset ba bg-transparent w-100 measure"
            type="number"
            name="name"
            value={group}
            onChange={this.handleOnChangeGroup}
          />
        </td>
        <td className="pv3 pr3 bb b--black-20">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            type="button"
            onClick={this.handleOnClick}
            value="Supprimer"
          />
        </td>
      </tr>
    );
  }
}

StudentInput.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  group: PropTypes.number,
  classeId: PropTypes.string.isRequired,
};

StudentInput.defaultProps = {
  _id: uuidv4(),
  name: "Nom de l'étudiant",
  group: -1,
};
