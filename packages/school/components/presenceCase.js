import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import firebase from '../config/firebase';

const Item = styled.div`
  height: 50px;
`;

const datesRef = '/dates/';

class PresenceCase extends Component {
  onClickTogglePresence = event => {
    event.preventDefault();

    const { id, date, classeId } = this.props;
    let classes = date.classes || [];

    if (!classes.includes(classeId)) {
      classes = [...classes, classeId];
    } else {
      classes = classes.filter(item => item !== classeId);
    }

    firebase
      .database()
      .ref(datesRef + id)
      .update({
        classes,
      });
  };

  render() {
    const { presence } = this.props;

    return (
      <Item
        onClick={this.onClickTogglePresence}
        className={`pa3 bb b--black-20 f5 no-underline  bg-animate  hover-bg-black hover-white items-center center ${
          presence ? 'green' : 'black'
        }`}
      >
        <span className="f5 no-underline bg-animate ">{presence ? 'Présent' : 'Absent'}</span>
      </Item>
    );
  }
}

PresenceCase.propTypes = {
  classeId: PropTypes.string.isRequired,
  presence: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  date: PropTypes.shape().isRequired,
};

export default PresenceCase;
