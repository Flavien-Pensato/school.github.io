import { database as firebase } from 'firebase';
import moment from 'moment';

import { getSchoolYear } from '../school/school.selectors';

moment.locale('fr');

const dateRef = '/dates/';
const weeksRef = '/weeks/';

export const FETCH_DATES = 'calendar/FETCH_DATES';
export const fetchDatesAction = () => (dispatch) => {
  try {
    const ref = firebase().ref(dateRef).orderByChild('timestamp').startAt(moment().startOf('week').unix() / 1000);

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

export const FETCH_WEEK = 'calendar/FETCH_WEEK';
export const fetchWeekAction = date => async (dispatch) => {
  try {
    const ref = await firebase().ref(weeksRef).orderByChild('date')
      .equalTo(date || moment().startOf('week').format('YYYY.MM.DD'));
    const onValueChange = ref.on('value', (snapshot) => {
      const week = snapshot.val();

      if (week) {
        dispatch({ type: FETCH_WEEK, week: week[Object.keys(week)[0]] });
      }
    });

    return () => ref.off('value', onValueChange);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);

    return Promise.resolve();
  }
};

export const ADD_WEEK = 'calendar/ADD_WEEK';
export const addWeekAction = date => async (dispatch, getState) => {
  try {
    await firebase().ref(weeksRef).push().set({
      date,
      schoolYear: getSchoolYear(getState()),
    });
    await dispatch({ type: ADD_WEEK });
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};
