const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp();

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
 
const createWeekAction = (classes, tasks, date, weeks) => {	
  const classesId = date.classes;	
  const allTasks = [...(_.filter(classes, classe => classesId.indexOf(classe._id) >= 0)), ...tasks];	
  const newWeek = {	
    tasks: [],
  };	

   _.forEach(allTasks, (task) => {	
    if (tasks.indexOf(task) >= 0) {	
      const groupsAvailable = _.uniq(_.flattenDeep([
        ..._.filter(classes, classe => classesId.indexOf(classe._id) !== -1).map(classe => _.map(classe.students, student => student.group))
      ]));	
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

  return newWeek; 	
};

const red = data => _.reduce(data, (acc, value, key) => {
  acc.push(value);

  return acc;
}, []);

exports.generateNewWeek = functions.database.ref('/weeks/').onCreate(async (snapshot, context) => {
  let original = snapshot.val();

  original = original[Object.keys(original)[0]];

  console.log('ORIGINAL', original);

  let weeks = await admin.database().ref('/weeks/').once('value');
  let students = await admin.database().ref('/students/').once('value');
  let classes = await admin.database().ref('/classes/').orderByChild('schoolYear').equalTo(original.schoolYear).once('value');
  let tasks = await admin.database().ref('/tasks/').once('value');
  let date = await admin.database().ref('/dates/').orderByChild('from').equalTo(original.date).once('value');
  
  weeks = red(weeks.val());
  students = red(students.val());
  classes = red(classes.val());
  tasks = red(tasks.val());
  date = red(date.val());

  console.log('DATA', date);

  const newWeek = createWeekAction(classes, tasks, date, weeks)

  console.log('NEW WEEK', newWeek);

  return admin.database().ref(`/weeks/${newWeek._id}`).set({ ...original, ...newWeek });
});
