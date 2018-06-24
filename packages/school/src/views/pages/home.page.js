import React from 'react';

import HeaderCalendar from '../../modules/calendar/components/headerCalendar.connector';
import { BodyCalendarConnected } from '../../modules/calendar/components/bodyCalendar/bodyCalendar.connector';

const HomePage = () => (
  <div className="w-100 mw8 center">
    <HeaderCalendar />
    <BodyCalendarConnected />
  </div>
);

export default HomePage;
