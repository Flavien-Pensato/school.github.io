import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '@school/ui';

import { HeaderCalendarConnected } from '../../modules/calendar/components/headerCalendar/headerCalendar.connector';
import { BodyCalendarConnected } from '../../modules/calendar/components/bodyCalendar/bodyCalendar.connector';

const HomePage = ({ match }) => (
  <Wrapper>
    <HeaderCalendarConnected selectedWeek={match.params._id} />
    <BodyCalendarConnected selectedWeek={match.params._id} />
  </Wrapper>
);

HomePage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default HomePage;
