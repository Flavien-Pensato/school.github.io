import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export class SchoolYear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schoolyears: this.generateSchoolyears(),
    };
  }

  generateSchoolyears = () => {
    const schoolyears = {};
    const date = moment().add('year', -2);

    for (let len = 0; len < 4; len += 1) {
      schoolyears[`${date.year()}-${date.add('year', 1).year()}`] = true;
    }
  };

  render() {
    const { current } = this.props;

    return (
      <div>
        <select>
          {this.state.schoolyears.map(year => <option value={year} selected={year === current}>{year}</option>)}
        </select>
      </div>
    );
  }
}

SchoolYear.propTypes = {
  current: PropTypes.string.isRequired,
};
