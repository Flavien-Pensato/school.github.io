import React from 'react';
import { GR } from 'global-register-pattern';


import HeaderCalendar from '../../modules/calendar/components/headerCalendar.connector';
import BodyCalendar from '../../modules/calendar/components/bodyCalendar.connector';

const HomePage = () => (
  <div className="w-100 mw8 center">
    <HeaderCalendar />
    <BodyCalendar />
  </div>
);

export default HomePage;

GR.register('routes.home', { Component: HomePage });
