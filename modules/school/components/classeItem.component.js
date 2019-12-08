import React, { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from '../../../config/firebase';

export class ClassItem extends Component {
  handleClickRemoveClass = e => {
    e.preventDefault();

    firebase
      .database()
      .ref(`2017-2018/classes/${this.props_id}`)
      .remove();
  };

  handleClickModifyClass = e => {
    e.preventDefault();
    const { setPreview, _id } = this.props;

    setPreview(_id);
  };

  render() {
    return (
      <li className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
        {this.props.name}
        <button
          className="bn fr f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-red"
          onClick={this.handleClickRemoveClass}
        >
          Supprimer
        </button>
        <button
          className="bn fr f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-light-purple"
          onClick={this.handleClickModifyClass}
        >
          Modifier la classe
        </button>
      </li>
    );
  }
}

ClassItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setPreview: PropTypes.func.isRequired,
};
