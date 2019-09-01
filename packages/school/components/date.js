import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import firebase from '../config/firebase';

import { Item } from './item';
import { PurpleButton } from './button';

const datesRef = '/dates/';

export class Date extends Component {
  handleAddDate = () => {
    const { date, id } = this.props;

    if (date.disable) {
      return firebase
        .database()
        .ref(datesRef + id)
        .update({
          disable: false,
        });
    }

    const newClasseKey = firebase
      .database()
      .ref()
      .child(datesRef)
      .push().key;

    return firebase
      .database()
      .ref(datesRef + newClasseKey)
      .update({
        ...date,
        classes: [],
      });
  };

  handleDisableDate = event => {
    event.preventDefault();

    const { id } = this.props;

    firebase
      .database()
      .ref(datesRef + id)
      .update({
        disable: true,
      });
  };

  render() {
    const {
      date: { from, to, disable },
      exist,
    } = this.props;

    return (
      <Item
        key={from}
        style={{ height: '50px' }}
        className="b--black-20 bb f5 black bg-animate items-center pa3 center"
      >
        <span>
          Du&nbsp;{moment(from, 'YYYY.MM.DD').format('dddd D MMMM')}
          <br />
          Au&nbsp;{moment(to, 'YYYY.MM.DD').format('dddd D MMMM')}
        </span>

        {exist && !disable ? (
          <PurpleButton onClick={this.handleDisableDate}>-</PurpleButton>
        ) : (
          <PurpleButton onClick={this.handleAddDate}>+</PurpleButton>
        )}
      </Item>
    );
  }
}

Date.defaultProps = {
  id: '',
};

Date.propTypes = {
  id: PropTypes.string,
  exist: PropTypes.bool.isRequired,
  date: PropTypes.shape().isRequired,
};
