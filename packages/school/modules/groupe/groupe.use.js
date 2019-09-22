import { useState, useEffect } from 'react';

import firebase from '../../config/firebase';

const groupeRef = '/groupes/';

export const useGroupe = number => {
  const [groupe, setGroupe] = useState();

  useEffect(() => {
    const reference = firebase
      .database()
      .ref(groupeRef)
      .orderByChild('schoolYear')
      .equalTo('2019-2020');

    const observer = reference.on('value', snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach(snapshotGroupe => {
          const values = snapshotGroupe.val();

          if (values.number === number) {
            setGroupe({ key: snapshotGroupe.key, values });
          }
        });
      } else {
        setGroupe(undefined);
      }
    });

    return () => reference.off('value', observer);
  }, [number]);

  return groupe;
};
