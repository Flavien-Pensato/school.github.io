import XLSX from 'xlsx';
import slug from 'slug';
import _ from 'lodash';

import { uuidv4 } from '../../utils';
import firebase from '../../config/firebase';

import {
  SELECT_CLASSE,
  FETCH_CLASSES,
  FETCH_STUDENTS,
  RESET_PREVIEW_CLASSE,
} from './school.constants';


export function setPreviewAction(preview) {
  return {
    type: SELECT_CLASSE,
    preview,
  };
}

export const fetchClassesAction = classes => ({
  type: FETCH_CLASSES,
  classes,
});

export const addClasseAction = (classe) => {
  firebase
    .database()
    .ref(`2017-2018/classes/${slug(classe._id)}`)
    .set(classe);
};

export const editClasseAction = (classeId, key, value) => {
  firebase
    .database()
    .ref(`2017-2018/classes/${classeId}/${key}`)
    .set(value);
};

export const removeClasseAction = (classeId) => {
  firebase
    .database()
    .ref(`2017-2018/classes/${classeId}`)
    .remove();
};

export const resetPreviewClasseAction = () => ({
  type: RESET_PREVIEW_CLASSE,
});

/* #### STUDENTS #### */

export const fetchStudentsAction = students => ({
  type: FETCH_STUDENTS,
  students,
});

export const addStudentAction = (student) => {
  firebase
    .database()
    .ref(`2017-2018/classes/${student.classeId}/students/${student._id}`)
    .set(student);
};

export const editStudentAction = (classeId, studentId, key, value) => {
  firebase
    .database()
    .ref(`2017-2018/classes/${classeId}/students/${studentId}/${key}`)
    .set(value);
};

export const removeStudentAction = (classeId, studentId) => {
  firebase
    .database()
    .ref(`2017-2018/classes/${classeId}/students/${studentId}`)
    .remove();
};


export function importFileAction(binary) {
  return (dispatch) => {
    const oFile = XLSX.read(binary, {
      type: 'binary',
    });

    const worksheet = oFile.Sheets[oFile.SheetNames[0]];
    const text = _.replace(
      XLSX.utils.sheet_to_csv(worksheet, { raw: true }),
      new RegExp(',|"', 'g'),
      ' ',
    );

    const classeId = uuidv4();

    addClasseAction({
      _id: classeId,
      name: '',
      createdAt: new Date(),
    });

    _.split(text, '\n').map(line => addStudentAction({
      _id: uuidv4(),
      name: line.trim(),
      classeId,
    }));

    dispatch(setPreviewAction(classeId));
  };
}
