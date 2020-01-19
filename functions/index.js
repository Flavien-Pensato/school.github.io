// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const _ = require('lodash');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp();

const weeksRef = admin.database().ref('/weeks');
const studentsRef = admin.database().ref('/students');
const groupesRef = admin.database().ref('/groupes');
const classesRef = admin.database().ref('/classes');
const tasksRef = admin.database().ref('/tasks');
const datesRef = admin.database().ref('/dates');

exports.removeStudentsOfClasseDeleted = functions.database
  .ref('/{schoolYear}/classes/{classeId}')
  .onDelete(async (snapshot, context) => {
    const schoolYear = context.params.schoolYear;
    const classeId = context.params.classeId;
    const studentsRef = admin.database().ref(`/${schoolYear}/students`);

    console.log(`All students from the classeId ${classeId} will be removed`);

    const snapshotOfStudentsToRemove = await studentsRef
      .orderByChild('classeId')
      .equalTo(classeId)
      .once('value');

    return snapshotOfStudentsToRemove.forEach(snapshot => {
      studentsRef.child(snapshot.key).remove();
    });
  });

exports.movingStudentsBetweenGroupe = functions.database
  .ref('/{schoolYear}/students/{studentId}/groupe')
  .onUpdate(async (change, context) => {
    const schoolYear = context.params.schoolYear;
    const studentId = context.params.studentId;

    const groupeAfter = change.after.val();
    const groupeBefore = change.before.val();

    if (groupeBefore !== groupeAfter) {
      const groupesRef = admin.database().ref(`/${schoolYear}/groupes`);
      const refClasseId = await admin
        .database()
        .ref(`/${schoolYear}/students/${studentId}`)
        .child('classeId')
        .once('value');

      const PromiseArray = [];

      if (groupeAfter !== 0) {
        PromiseArray.push(
          groupesRef
            .child(groupeAfter)
            .child('students')
            .child(studentId)
            .set(true),
        );

        if (refClasseId.exists()) {
          PromiseArray.push(
            groupesRef
              .child(groupeAfter)
              .child('classeId')
              .set(refClasseId.val()),
          );
        }
      }

      if (groupeBefore !== 0) {
        PromiseArray.push(
          groupesRef
            .child(groupeBefore)
            .child('students')
            .child(studentId)
            .remove(),
        );
      }

      await PromiseArray;
    }

    return null;
  });

exports.removingStudentFromGroupe = functions.database
  .ref('/{schoolYear}/students/{studentId}')
  .onDelete((snapshot, context) => {
    const student = snapshot.val();
    const schoolYear = context.params.schoolYear;
    const studentId = context.params.studentId;

    console.log(`Will remove studentId ${studentId} from his groupe number ${student.groupe}`);

    return admin
      .database()
      .ref(`/${schoolYear}/groupes`)
      .child(student.groupe)
      .child('students')
      .child(snapshot.key)
      .remove();
  });

exports.removingStudentFromGroupe = functions.database
  .ref('/{schoolYear}/groupes/{groupeId}/tasks/{taskId}')
  .onDelete((snapshot, context) => {
    const student = snapshot.val();
    const schoolYear = context.params.schoolYear;
    const studentId = context.params.studentId;

    console.log(`Will remove studentId ${studentId} from his groupe number ${student.groupe}`);

    return admin
      .database()
      .ref(`/${schoolYear}/groupes`)
      .child(student.groupe)
      .child('students')
      .child(snapshot.key)
      .remove();
  });

exports.updatingGroupeTask = functions.database
  .ref('/{schoolYear}/weeks/{weekId}/tasks/{taskId}')
  .onWrite(async (change, context) => {
    const taskAfter = change.after.val();
    const taskBefore = change.before.val();
    const task = taskAfter ? taskAfter : taskBefore;
    const isCreated = taskAfter ? true : false;

    const schoolYear = context.params.schoolYear;
    const taskId = context.params.taskId;

    const snapshotLastValue = await admin
      .database()
      .ref(`/${schoolYear}/groupes`)
      .child(task.groupe)
      .child('tasks')
      .child(taskId)
      .once('value');
    const data = snapshotLastValue.val() | 0;

    return admin
      .database()
      .ref(`/${schoolYear}/groupes`)
      .child(task.groupe)
      .child('tasks')
      .child(taskId)
      .set(data + (isCreated ? 1 : -1));
  });

exports.updatingGroupeTotal = functions.database
  .ref('/{schoolYear}/groupes/{groupeId}/tasks/{taskId}')
  .onWrite(async (change, context) => {
    const groupeId = context.params.groupeId;
    const taskAfter = change.after.val() || 0;
    const taskBefore = change.before.val() || 0;
    const isUp = taskAfter > taskBefore ? true : false;

    const schoolYear = context.params.schoolYear;
    const taskId = context.params.taskId;

    const snapshotLastValue = await admin
      .database()
      .ref(`/${schoolYear}/groupes`)
      .child(groupeId)
      .child('total')
      .once('value');

    const data = snapshotLastValue.val() | 0;

    return admin
      .database()
      .ref(`/${schoolYear}/groupes`)
      .child(groupeId)
      .child('total')
      .set(data + (isUp ? 1 : -1));
  });

const getGroupesByClasseId = async classeId => {
  if (classeId) {
    const snapshotGroupes = await admin
      .database()
      .ref('/2019-2020/groupes')
      .orderByChild('classeId')
      .equalTo(classeId)
      .once('value');

    if (snapshotGroupes.exists()) {
      const groupesSnaps = [];
      // Get all classes enable this week
      snapshotGroupes.forEach(snapshotGroupe => {
        groupesSnaps.push(snapshotGroupe);
      });

      return Promise.all(_.map(groupesSnaps, async groupe => ({ ...groupe.val(), groupeId: Number(groupe.key) })));
    }
  }

  return [];
};

const selectGroupeByForTask = (groupes, taskId) => {
  console.log('SelectGroupeByForTask =>');

  if (groupes && taskId) {
    let groupeSelected;

    _.forEach(groupes, groupe => {
      if (groupe.tasks && groupe.tasks[taskId]) {
        if (groupeSelected ? groupeSelected.tasks[taskId] > groupe.tasks[taskId] : true) {
          groupeSelected = groupe;
        }
      } else {
        groupeSelected = groupe;
      }
    });

    return groupeSelected;
  }

  return undefined;
};

exports.generate = functions.https.onCall(async (week, context) => {
  if (!week || week.disable) {
    console.log("Week is no enable or doesn't exits");

    return null;
  }

  const database = admin.database();

  await database
    .ref('/2019-2020/weeks/')
    .child(week.from)
    .child('tasks')
    .remove();

  const snapshotTasks = await database.ref('/2019-2020/tasks').once('value');
  const snapshotClasses = await database.ref('/2019-2020/classes').once('value');

  const snapshotClassesOfTheWeek = [];
  const snapshotTasksOfTheWeek = [];

  // Get all classes enable this week
  _.forEach(week.classes, (value, classeId) => {
    if (snapshotClasses.child(classeId).exists()) {
      snapshotClassesOfTheWeek.push(snapshotClasses.child(classeId));
    }
  });

  // Get all classes enable this week
  snapshotTasks.forEach(snapshotTask => {
    snapshotTasksOfTheWeek.push(snapshotTask);
  });

  const groupes = [];

  await Promise.all(
    _.map(snapshotClassesOfTheWeek, async snapshotClasseOfTheWeek => {
      const groupesOfClasse = await getGroupesByClasseId(snapshotClasseOfTheWeek.key);

      _.forEach(groupesOfClasse, groupe => groupes.push(groupe));
    }),
  );

  const groupesFiltered = _.reverse(_.sortBy(groupes, ['total']));

  _.remove(groupesFiltered, groupe => {
    return Number(groupe.groupeId) === 0;
  });

  const tasks = {};

  // Assign Classe Task
  await Promise.all(
    _.map(snapshotClassesOfTheWeek, async snapshotClasseOfTheWeek => {
      const groupes = groupesFiltered.filter(groupe => groupe.classeId === snapshotClasseOfTheWeek.key);

      const selectedGroupe = selectGroupeByForTask(groupes, snapshotClasseOfTheWeek.key);
      let selectedStudents;

      if (selectedGroupe) {
        _.remove(groupesFiltered, groupe => {
          return Number(groupe.groupeId) === Number(selectedGroupe.groupeId);
        });

        selectedStudents = await admin
          .database()
          .ref('/2019-2020/students')
          .orderByChild('groupe')
          .equalTo(Number(selectedGroupe.groupeId))
          .once('value');
      }

      tasks[snapshotClasseOfTheWeek.key] = {
        task: await snapshotClasseOfTheWeek.child('name').val(),
        groupe: selectedGroupe ? Number(selectedGroupe.groupeId) : 'Pas de groupe disponible.',
        classe: await snapshotClasseOfTheWeek.child('name').val(),
        students: selectedStudents ? _.map(await selectedStudents.val(), student => student.name).join(', ') : [],
      };

      return Promise.resolve();
    }),
  );

  // Assign Tasks
  await Promise.all(
    _.map(snapshotTasksOfTheWeek, async snapshotTaskOfTheWeek => {
      console.log('Task id :' + snapshotTaskOfTheWeek.key);
      const selectedGroupe = selectGroupeByForTask(groupesFiltered, snapshotTaskOfTheWeek.key);
      console.log(`Boucle selected groupe => ${selectedGroupe}`);
      let selectedStudents;

      if (selectedGroupe) {
        _.remove(groupesFiltered, groupe => {
          return Number(groupe.groupeId) === Number(selectedGroupe.groupeId);
        });

        selectedStudents = await admin
          .database()
          .ref('/2019-2020/students')
          .orderByChild('groupe')
          .equalTo(Number(selectedGroupe.groupeId))
          .once('value');
      }

      tasks[snapshotTaskOfTheWeek.key] = {
        task: await snapshotTaskOfTheWeek.child('name').val(),
        groupe: selectedGroupe ? Number(selectedGroupe.groupeId) : 'Pas de groupe disponible.',
        classe: await snapshotClasses
          .child(selectedGroupe.classeId)
          .child('name')
          .val(),
        students: selectedStudents ? _.map(await selectedStudents.val(), student => student.name).join(', ') : [],
      };

      return Promise.resolve();
    }),
  );

  await database
    .ref('/2019-2020/weeks/')
    .child(week.from)
    .child('tasks')
    .set(tasks);
  console.log('Tasks: ' + JSON.stringify(tasks));

  return tasks;
});
