import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { HeaderCalendarConnected } from '../../modules/calendar/components/headerCalendar/headerCalendar.connector';
import { BodyCalendarConnected } from '../../modules/calendar/components/bodyCalendar/bodyCalendar.connector';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 48rem;
`;

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
