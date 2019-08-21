import { database as firebase } from 'firebase';
import XLSX from 'xlsx';
import _ from 'lodash';

import { getSchoolYear } from '../school/school.selectors';
import { uuidv4 } from '../../modules/utils';

const studentsRef = '/students/';

export const FETCH_STUDENTS = 'tasks/FETCH_STUDENTS';
export const fetchStudentsAction = classeId => dispatch => {
  try {
    const ref = firebase()
      .ref(studentsRef)
      .orderByChild('classeId')
      .equalTo(classeId);

    const onValueChange = ref.on('value', snapshot => {
      dispatch({ type: FETCH_STUDENTS, students: snapshot.val() ? Object.values(snapshot.val()) : [] });
    });

    return () => ref.off('value', onValueChange);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);

    return Promise.resolve();
  }
};

export const ADD_STUDENT = 'tasks/ADD_STUDENT';
export const addStudentAction = student => async (dispatch, getState) => {
  try {
    const studentId = uuidv4();

    await firebase()
      .ref(studentsRef + studentId)
      .set({ ...student, _id: studentId, schoolYear: getSchoolYear(getState()) });
    await dispatch({ type: ADD_STUDENT });
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};

export const REMOVE_STUDENT = 'tasks/REMOVE_STUDENT';
export const removeStudentAction = studentId => async dispatch => {
  try {
    await firebase()
      .ref(studentsRef + studentId)
      .remove();
    await dispatch({ type: REMOVE_STUDENT });
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};

export const CHANGE_STUDENT = 'tasks/CHANGE_STUDENT';
export const changeStudentAction = student => async dispatch => {
  try {
    await firebase()
      .ref(studentsRef + student._id)
      .set(student);
    await dispatch({ type: CHANGE_STUDENT });
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};

export const IMPORT_STUDENTS = 'tasks/IMPORT_STUDENTS';
export const importStudentsAction = (pathFile, classeId) => async dispatch => {
  try {
    const oFile = XLSX.read(pathFile, {
      type: 'binary',
    });

    const worksheet = oFile.Sheets[oFile.SheetNames[0]];
    const text = _.replace(XLSX.utils.sheet_to_csv(worksheet, { raw: true }), new RegExp(',|"', 'g'), ' ');

    await Promise.all(
      _.split(text, '\n').map(line =>
        dispatch(
          addStudentAction({
            name: line.trim(),
            groupe: 0,
            classeId,
          }),
        ),
      ),
    );

    await dispatch({ type: IMPORT_STUDENTS });
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};
