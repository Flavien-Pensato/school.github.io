import { useState, useEffect } from 'react';

import firebase from '../../config/firebase';

const weeksRef = '/weeks/';

export const useWeek = date => {
  const [week, setWeek] = useState();

  useEffect(() => {
    const reference = firebase
      .database()
      .ref(weeksRef)
      .orderByChild('from')
      .equalTo(date.format('YYYY.MM.DD'));

    const observer = reference.on('value', snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach(snapshotWeek => setWeek({ key: snapshotWeek.key, values: snapshotWeek.val() }));
      } else {
        setWeek(undefined);
      }
    });

    return () => reference.off('value', observer);
  }, [date]);

  return week;
};
