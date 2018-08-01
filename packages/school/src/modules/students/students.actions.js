import slug from 'slug';
import { database as firebase } from 'firebase';

import { getSchoolYear } from '../school/school.selectors';
import { uuidv4 } from '../../utils';

const studentsRef = '/students/';

export const FETCH_STUDENTS = 'tasks/FETCH_STUDENTS';
export const fetchStudentsAction = classeId => (dispatch) => {
  try {
    const ref = firebase().ref(studentsRef).orderByChild('classeId').equalTo(classeId);

    const onValueChange = ref.on('value', (snapshot) => {
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
export const removeStudentAction = studentId => async (dispatch) => {
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
