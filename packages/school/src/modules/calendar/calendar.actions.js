import _ from 'lodash';
import { database as firebase } from 'firebase';

const dateRef = '/dates/';

export const FETCH_DATES = 'calendar/FETCH_DATES';
export const fetchDatesAction = () => (dispatch) => {
  try {
    const ref = firebase().ref(dateRef).orderByChild('timestamp').startAt(Math.round(new Date().getTime() / 1000));

    const onValueChange = ref.on('value', (snapshot) => {
      const dates = [];

      snapshot.forEach((childSnapshot) => {
        dates.push(childSnapshot.val());
      });

      dispatch({ type: FETCH_DATES, dates });
    });

    return () => ref.off('value', onValueChange);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);

    return Promise.resolve();
  }
};

export const ADD_DATE = 'calendar/ADD_DATE';
export const addDateAction = date => async (dispatch) => {
  try {
    await firebase().ref(dateRef + date._id).set(date);
    await dispatch({ type: ADD_DATE });
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};

export const EDIT_DATE = 'calendar/EDIT_DATE';
export const editDateAction = date => async (dispatch) => {
  try {
    await firebase().ref(dateRef + date._id).set(date);
    await dispatch({ type: EDIT_DATE });
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};
