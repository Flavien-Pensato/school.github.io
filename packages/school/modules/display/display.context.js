import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export const DisplayContext = React.createContext();

export class DisplayProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { children } = this.props;
    let current = false;

    if (moment().month() >= 7) {
      current = true;
    }

    // eslint-disable-next-line
    const schoolYear =  current ? `${moment().year()}-${moment().year() + 1}` : `${moment().year() - 1}-${moment().year()}`;

    return <DisplayContext.Provider value={{ schoolYear }}>{children}</DisplayContext.Provider>;
  }
}

DisplayProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
