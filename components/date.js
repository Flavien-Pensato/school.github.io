import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from '@emotion/styled';

export const PurpleButton = styled.button`
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background-color: purple;
  font-weight: 700;
  display: inline-block;
  color: white;
  border-color: black;
  border-style: solid;
  border-width: 1px;
`;

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
      <Fragment>
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
      </Fragment>
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
