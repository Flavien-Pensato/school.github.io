import _ from 'lodash';
import firebase from '../../config/firebase';

import {
  FETCH_DATES,
  FETCH_WEEKS,

  GO_NEXT_WEEK,
  GO_PREVIOUS_WEEK,
} from './calendar.constants';

export const fetchDatesAction = dates => 	({
  type: FETCH_DATES,
  dates,
});

export const addDateAction = (date) => {
  firebase
    .database()
    .ref(`2017-2018/dates/${date._id}`)
    .set(date);
};

export const removeDateAction = (dateId) => {
  firebase
    .database()
    .ref(`2017-2018/dates/${dateId}`)
    .remove();
};

export const goNextWeekAction = () => ({
  type: GO_NEXT_WEEK,
});

export const goPreviousWeekAction = () => ({
  type: GO_PREVIOUS_WEEK,
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

  firebase
    .database()
    .ref(`2017-2018/weeks/${newWeek.date}`)
    .set(newWeek);
};

export const fetchWeeksAction = weeks => ({
  type: FETCH_WEEKS,
  weeks,
});
