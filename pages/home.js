import React, { useContext, useState, useCallback } from 'react';

import firebase from '../config/firebase';
import { DisplayContext } from '../modules/display/display.context';
import { useWeek } from '../modules/week/week.use';
import Div from '../elements/Div';
import Actions from '../components/Actions';
import Planning from '../components/Planning';

const generate = firebase.functions().httpsCallable('generate');

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const { date, schoolYear } = useContext(DisplayContext);
  const week = useWeek(date, schoolYear);
  const handleClick = useCallback(
    event => {
      event.preventDefault();

      setLoading(true);
      generate(week)
        .then(() => setLoading(false))
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    },
    [week],
  );

  return (
    <Div display="flex" alignItems="center" flexDirection="column">
      <Actions generate={handleClick} />
      {loading && <span>Loading</span>}
      {!loading && <Planning week={week || {}} />}
    </Div>
  );
};

export default HomePage;
