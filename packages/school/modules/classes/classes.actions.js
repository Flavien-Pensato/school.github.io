import { database as firebase } from 'firebase';

import { getSchoolYear } from '../school/school.selectors';

const taskRef = '/classes/';

export const FETCH_CLASSES = 'classes/FETCH_CLASSES';
export const fetchClassesAction = () => (dispatch, getState) => {
  try {
    const ref = firebase()
      .ref(taskRef)
      .orderByChild('schoolYear')
      .equalTo(getSchoolYear(getState()));

    const onValueChange = ref.on('value', snapshot => {
      const classes = [];

      snapshot.forEach(childSnapshot => {
        classes.push(childSnapshot.val());
      });

      dispatch({ type: FETCH_CLASSES, classes });
    });

    return () => ref.off('value', onValueChange);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);

    return Promise.resolve();
  }
};

export const ADD_CLASSE = 'classes/ADD_CLASSE';
export const addClasseAction = classe => async dispatch => {
  try {
    await firebase()
      .ref(taskRef + classe._id)
      .set(classe);
    await dispatch({ type: ADD_CLASSE });
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};

export const DELETE_CLASSE = 'classes/DELETE_CLASSE';
export const removeClasseAction = classeId => async dispatch => {
  try {
    await firebase()
      .ref(taskRef + classeId)
      .remove();
    await dispatch({ type: DELETE_CLASSE });
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};
