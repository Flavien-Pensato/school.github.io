import { useState, useEffect, useContext, useCallback } from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';

import { DisplayContext } from '../display/display.context';

import firebase from '../../config/firebase';

export const addStudent = studentsReference => async ({ name }) => {
  const newStudentRef = studentsReference.child('0').push();

  await newStudentRef.set({
    name,
  });
};

export const editStudent = (studentsReference, studentsSnapshot) => async ({ id, ...props }) => {
  if (studentsSnapshot.child(id).exists()) {
    await studentsReference.child(id).update(props);
  } else {
    alert("Student doesn't exist");
  }
};

export const removeStudent = studentsReference => async id => {
  if (id) {
    await studentsReference.child(id).remove();
  } else {
    alert('No id sent');
  }
};

export const importStudents = studentsReference => async pathFile => {
  try {
    const oFile = XLSX.read(pathFile, {
      type: 'binary',
    });

    const worksheet = oFile.Sheets[oFile.SheetNames[0]];
    const text = _.replace(XLSX.utils.sheet_to_csv(worksheet, { raw: true }), new RegExp(',|"', 'g'), ' ');

    await Promise.all(
      _.split(text, '\n').forEach(line => {
        const newStudentReference = studentsReference.child('0/students').push();

        newStudentReference.set({ name: line.trim() });
      }),
    );
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};

export const useStudents = classeId => {
  const [groupes, setGroupes] = useState();
  const { schoolYear } = useContext(DisplayContext);
  const reference = firebase.database().ref(`/${schoolYear}/classes/${classeId}/groupes`);

  useEffect(() => {
    const observer = reference.on('value', snapshot => {
      setGroupes(snapshot);
    });

    return () => reference.off('value', observer);
  }, [classeId]);

  return {
    groupes,
    groupesReference: reference,
    addStudent: useCallback(addStudent(reference), [groupes]),
    editStudent: useCallback(editStudent(reference), [groupes]),
    removeStudent: useCallback(removeStudent(reference), [groupes]),
    importStudents: useCallback(importStudents(reference), [groupes]),
  };
};
