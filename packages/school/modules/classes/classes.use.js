import { useContext, useState, useEffect, useCallback } from 'react';
import { DisplayContext } from '../display/display.context';

import firebase from '../../config/firebase';

export const addClasse = (classesReference, classesSnapshot) => async ({ name, sort }) => {
  const newClasseRef = classesReference.push();

  await newClasseRef.set({
    name,
    sort: sort || classesSnapshot.numChildren(),
  });
};

export const editClasse = (classesReference, classesSnapshot) => async ({ id, ...props }) => {
  if (classesSnapshot.child(id).exists()) {
    await classesReference.child(id).update(props);
  } else {
    alert("Classe doesn't exist");
  }
};

export const removeClasse = classesReference => async id => {
  if (id) {
    await classesReference.child(id).remove();
  } else {
    alert('No id sent');
  }
};

export const useClasses = () => {
  const [classes, setClasses] = useState([]);
  const { schoolYear } = useContext(DisplayContext);
  const reference = firebase.database().ref(`/${schoolYear}/classes`);

  useEffect(() => {
    const observer = reference.on('value', snapshot => {
      setClasses(snapshot);
    });

    return () => {
      reference.off('value', observer);
    };
  }, [schoolYear]);

  return {
    classes,
    addClasse: useCallback(addClasse(reference, classes), [classes]),
    editClasse: useCallback(editClasse(reference, classes), [classes]),
    removeClasse: useCallback(removeClasse(reference), [classes]),
  };
};
