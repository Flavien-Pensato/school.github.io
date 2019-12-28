import React, { useContext, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Router from 'next/router';

import firebase from '../config/firebase';
import { DisplayContext } from '../modules/display/display.context';
import { useWeek } from '../modules/week/week.use';
import Div from '../elements/Div';
import Actions from '../components/Actions';
import Planning from '../components/Planning';
// import { Tooltips } from '../components/tooltips';

const handlePrint = event => {
  event.preventDefault();

  const printContents = document.getElementById('planning').innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  document.body.style = 'tr { td { font-size: 22px; }}';
  window.print();
  document.body.innerHTML = originalContents;
};

const HomePage = () => {
  const generate = firebase.functions().httpsCallable('generate');
  const { date, schoolYear } = useContext(DisplayContext);
  const week = useWeek(date, schoolYear);

  return (
    <Div display="flex" alignItems="center" flexDirection="column">
      <Actions />
      <Planning week={week || {}} generate={generate} />
    </Div>
  );
};

export default HomePage;
