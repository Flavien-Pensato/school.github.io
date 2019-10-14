import { useState, useEffect, useContext, useCallback } from 'react';

import { DisplayContext } from '../display/display.context';
import firebase from '../../config/firebase';

export const addWeek = weeksReference => async ({ from, to }) => {
  const data = await weeksReference.child(from).once('value');

  if (!data.exists()) {
    await weeksReference.child(from).set({
      from,
      to,
      disable: false,
    });
  } else {
    alert('Week exists');
  }
};

export const toggleDisable = weeksReference => from => async disable => {
  const data = await weeksReference.child(from).once('value');

  if (!data.exists()) {
    await weeksReference
      .child(from)
      .child('disable')
      .update(disable);
  } else {
    alert('Week exists');
  }
};

export const toggleClasse = weeksReference => from => async classeId => {
  const data = await weeksReference
    .child(from)
    .child('classes')
    .child(classeId)
    .once('value');

  if (!data.exists()) {
    await weeksReference
      .child(from)
      .child('classes')
      .child(classeId)
      .update(true);
  } else {
    await weeksReference
      .child(from)
      .child('classes')
      .child(classeId)
      .remove();
  }
};

export const useWeeks = () => {
  const { schoolYear } = useContext(DisplayContext);
  const weeksRef = firebase.database().ref(`/${schoolYear}/weeks`);

  return {
    weeksRef,
    addWeek: useCallback(addWeek(weeksRef), [schoolYear]),
    toggleDisable: useCallback(toggleDisable(weeksRef), [schoolYear]),
    toggleClasse: useCallback(toggleClasse(weeksRef), [schoolYear]),
  };
};

export const useWeek = date => {
  const [week, setWeek] = useState();

  useEffect(() => {
    const reference = firebase
      .database()
      .ref(weeksRef)
      .orderByChild('from')
      .equalTo(date.format('YYYY-MM-DD'));

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
