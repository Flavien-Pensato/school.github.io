import { useContext, useCallback } from 'react';
import slug from 'slug';

import { DisplayContext } from '../display/display.context';

import firebase from '../../config/firebase';

export const addClasse = classesReference => async ({ name }) => {
  const slugName = slug(name);

  const data = await classesReference.child(slugName).once('value');

  if (!data.exists()) {
    await classesReference.child(slugName).set({
      name,
      sort: 0,
    });
  } else {
    alert('Classe exists');
  }
};

export const editClasse = classesReference => id => async props => {
  if (id) {
    await classesReference.child(id).update(props);
  } else {
    alert("Classe doesn't exist");
  }
};

export const removeClasse = classesReference => id => async () => {
  if (id) {
    await classesReference.child(id).remove();
  } else {
    alert('No id sent');
  }
};

export const useClasses = () => {
  const { schoolYear } = useContext(DisplayContext);
  const classesReference = firebase.database().ref(`/${schoolYear}/classes`);

  return {
    classesReference,
    addClasse: useCallback(addClasse(classesReference), [schoolYear]),
    editClasse: useCallback(editClasse(classesReference), [schoolYear]),
    removeClasse: useCallback(removeClasse(classesReference), [schoolYear]),
  };
};
