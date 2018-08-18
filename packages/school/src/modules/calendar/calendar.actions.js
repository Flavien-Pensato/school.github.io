import _ from 'lodash';
import { database as firebase } from 'firebase';

import {
  FETCH_WEEK,
  SET_SELECTED_WEEK,
} from './calendar.constants';
import { getSelectedWeek } from './calendar.selectors';

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

export const removeDateAction = (dateId) => {
  firebase()
    .ref(`2017-2018/dates/${dateId}`)
    .remove();
};

export const setSelectedWeek = selectedWeek => ({
  type: SET_SELECTED_WEEK,
  selectedWeek,
});

const findGroupeTaskCounter = (weeks, groupe, task) => {
  let counter = 0;

  weeks.forEach((week) => {
    const tmpTask = _.find(week.tasks, tas => tas.task._id === task._id);

    if (_.get(tmpTask, 'groupe') === groupe) {
      counter += 1;
    }
  });

  return counter;
};

const getInfos = (groupe, classes) => {
  const infos = {
    students: [],
    classe: '',
  };

  classes.forEach((classe) => {
    _.each(classe.students, (student) => {
      if (student.group === groupe) {
        infos.students.push(student.name);
        infos.classe = classe.name;
      }
    });
  });

  return infos;
};

export const createWeekAction = (currentWeek, classes, tasks, dates, weeks) => {
  const classesId = _.map(_.filter(dates, date => date.week === currentWeek.format('W/Y')), date => date.classeId);
  const allTasks = [..._.filter(classes, classe => classesId.indexOf(classe._id) >= 0), ...tasks];
  const newWeek = {
    _id: currentWeek.format('WY'),
    date: currentWeek.format('WY'),
    tasks: [],
  };


  _.forEach(allTasks, (task) => {
    if (tasks.indexOf(task) >= 0) {
      const groupsAvailable = _.uniq(_.flattenDeep([..._.filter(classes, classe =>
        classesId.indexOf(classe._id) !== -1).map(classe => _.map(classe.students, student => student.group))]));

      let groupeSelected = 'Pas de groupe disponible';
      let max = 1000;

      _.filter(groupsAvailable, group =>
        newWeek.tasks.map(({ groupe }) => groupe).indexOf(group) === -1).forEach((groupe) => {
        const counter = findGroupeTaskCounter(weeks, groupe, task);
        if (counter <= max) {
          max = counter;
          groupeSelected = groupe;
        }
      });

      newWeek.tasks.push({
        task,
        groupe: groupeSelected || 'Pas de groupe disponible',
        ...getInfos(groupeSelected, classes),
      });
    } else {
      const classe = _.find(classes, ({ name }) => name === task.name);
      const groupsAvailable = _.uniq(_.map(classe.students, student => student.group));

      let groupeSelected = 'Pas de groupe disponible';
      let max = 1000;

      _.filter(groupsAvailable, group =>
        newWeek.tasks.map(({ groupe }) => groupe).indexOf(group) === -1).forEach((groupe) => {
        const counter = findGroupeTaskCounter(weeks, groupe, task);

        if (counter <= max) {
          max = counter;
          groupeSelected = groupe;
        }
      });

      newWeek.tasks.push({
        task,
        ...getInfos(groupeSelected, classes),
        groupe: groupeSelected || 'Pas de groupe disponible',
      });
    }
  });

  firebase()
    .ref(`2017-2018/weeks/${newWeek.date}`)
    .set(newWeek);
};

export const fetchWeeksAction = weekId => (dispatch, getState) => {
  let ref = `2017-2018/weeks/${weekId}`;

  if (!weekId) {
    const state = getState();

    ref = `2017-2018/weeks/${getSelectedWeek(state).startOf('week').format('WY')}`;
  }


  firebase().ref(ref).once('value', (snapshot) => {
    const week = snapshot.val();

    if (week) {
      dispatch({
        type: FETCH_WEEK,
        week,
      });
    }
  });
};
