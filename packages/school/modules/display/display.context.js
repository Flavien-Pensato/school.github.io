import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withRouter } from 'next/router';

export const DisplayContext = React.createContext();

class DisplayProvider extends Component {
  constructor(props) {
    super(props);

    const {
      router: {
        query: { from },
      },
    } = props;
    this.state = {
      currentWeek: from ? moment(from, 'YYYY.MM.DD') : moment().startOf('week'),
      changeCurrentWeek: this.changeCurrentWeek,
    };
  }

  changeCurrentWeek = currentWeek => {
    this.setState(() => ({
      currentWeek,
    }));
  };

  render() {
    const { children } = this.props;
    const { currentWeek, changeCurrentWeek } = this.state;
    let current = false;

    if (moment().month() >= 7) {
      current = true;
    }

    // eslint-disable-next-line
    const schoolYear =  current ? `${moment().year()}-${moment().year() + 1}` : `${moment().year() - 1}-${moment().year()}`;

    return (
      <DisplayContext.Provider value={{ schoolYear, currentWeek, changeCurrentWeek }}>
        {children}
      </DisplayContext.Provider>
    );
  }
}

DisplayProvider.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      from: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const DisplayProviderRouter = withRouter(DisplayProvider);

export { DisplayProviderRouter as DisplayProvider };
