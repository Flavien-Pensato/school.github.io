import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Item } from './item';
import { PurpleButton } from './button';

export class Date extends Component {
  handleAddDate = () => {
    const { from, to, addWeek } = this.props;

    addWeek({ from, to });
  };

  handleDisableDate = event => {
    event.preventDefault();

    const { date } = this.props;

    const { toggleDisable } = this.props;

    toggleDisable(!date.disable);
  };

  render() {
    const { from, to, date } = this.props;

    return (
      <Item
        key={from}
        style={{ height: '50px' }}
        className="b--black-20 bb f5 black bg-animate items-center pa3 center"
      >
        <span>
          Du&nbsp;{moment(from, 'YYYY-MM-DD').format('dddd D MMMM')}
          <br />
          Au&nbsp;{moment(to, 'YYYY-MM-DD').format('dddd D MMMM')}
        </span>

        {date ? (
          <PurpleButton onClick={this.handleDisableDate}>{date.disable ? '+' : '-'}</PurpleButton>
        ) : (
          <PurpleButton onClick={this.handleAddDate}>+</PurpleButton>
        )}
      </Item>
    );
  }
}

Date.defaultProps = {
  date: undefined,
};

Date.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  date: PropTypes.shape(),
  addWeek: PropTypes.func.isRequired,
  toggleDisable: PropTypes.func.isRequired,
};
