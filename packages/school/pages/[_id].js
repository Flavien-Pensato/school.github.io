import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '@school/ui';
import { withRouter } from 'next/router';

import { HeaderCalendarConnected } from '../modules/calendar/components/headerCalendar/headerCalendar.connector';
import { BodyCalendarConnected } from '../modules/calendar/components/bodyCalendar/bodyCalendar.connector';

const HomePage = ({ router: { query } }) => (
  <Wrapper>
    <HeaderCalendarConnected selectedWeek={query._id} />
    <BodyCalendarConnected selectedWeek={query._id} />
  </Wrapper>
);

HomePage.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      _id: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(HomePage);
