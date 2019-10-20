import { useContext, useCallback } from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
import slug from 'slug';

import { DisplayContext } from '../display/display.context';

import firebase from '../../config/firebase';

export const addStudent = (studentsReference, classeId) => async ({ name }) => {
  const slugName = slug(name);

  await studentsReference.child(slugName.toLowerCase()).set({
    name,
    groupe: 0,
    classeId,
  });
};

export const editStudent = studentsReference => studentId => async props => {
  if (studentId) {
    await studentsReference.child(studentId).update(props);
  } else {
    alert("Student doesn't exist");
  }
};

export const removeStudent = studentsReference => studentId => async () => {
  if (studentId) {
    await studentsReference.child(studentId).remove();
  } else {
    alert('No id sent');
  }
};

export const importStudents = (studentsReference, classeId) => async pathFile => {
  try {
    const oFile = XLSX.read(pathFile, {
      type: 'binary',
    });

    const worksheet = oFile.Sheets[oFile.SheetNames[0]];
    const text = _.replace(XLSX.utils.sheet_to_csv(worksheet, { raw: true }), new RegExp(',|"', 'g'), ' ');

    const addStudentImported = addStudent(studentsReference, classeId);

    await Promise.all(
      _.split(text, '\n').forEach(line => {
        addStudentImported({ name: line.trim() });
      }),
    );
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};

export const moveStudentGroupe = studentsReference => async (newGroupe, { id, groupe }) => {
  if (id) {
    await studentsReference.child(`groupes/${groupe}/students/${id}`).remove();
  } else {
    alert('No id sent');
  }
};

export const useStudents = classeId => {
  const { schoolYear } = useContext(DisplayContext);
  const studentsReference = firebase.database().ref(`/${schoolYear}/students`);

  return {
    studentsReference: studentsReference.orderByChild('classeId').equalTo(classeId),
    addStudent: useCallback(addStudent(studentsReference, classeId), [studentsReference]),
    editStudent: useCallback(editStudent(studentsReference, classeId), [studentsReference]),
    removeStudent: useCallback(removeStudent(studentsReference), [studentsReference]),
    importStudents: useCallback(importStudents(studentsReference, classeId), [studentsReference]),
  };
};
