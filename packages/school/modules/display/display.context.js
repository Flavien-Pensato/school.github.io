import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withRouter } from 'next/router';

export const DisplayContext = React.createContext();

const useSchoolYear = () => {
  let current = false;

  if (moment().month() >= 7) {
    current = true;
  }

  // eslint-disable-next-line
  return   current ? `${moment().year()}-${moment().year() + 1}` : `${moment().year() - 1}-${moment().year()}`;
};

const DisplayProvider = ({ children, router: { query } }) => {
  const [date, setDate] = useState(moment().startOf('week'));
  const schoolYear = useSchoolYear();

  useEffect(() => {
    if (query.date) {
      setDate(moment(query.date, 'YYYY-MM-DD'));
    }
  }, [query.date]);

  return <DisplayContext.Provider value={{ schoolYear, date, setDate }}>{children}</DisplayContext.Provider>;
};

DisplayProvider.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      date: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const DisplayProviderRouter = withRouter(DisplayProvider);

export { DisplayProviderRouter as DisplayProvider };
