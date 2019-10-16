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

const asyncForEach = async (dataSnapshot, childFunction, rest) => {
  const toWait = [];

  dataSnapshot.forEach(childSnapshot => {
    toWait.push(childFunction(childSnapshot, rest));
  });

  await Promise.all(toWait);
};

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

const handleUpdateGroupeTask = async (groupeSnapshot, { task, isBefore }) => {
  const groupe = groupeSnapshot.val();

  if (groupe.number === task.groupeName) {
    console.log(`${isBefore ? 'Before' : 'After'}: Groupe: ${groupe.number} - ${task.groupeName}`);
    console.log(groupeSnapshot.val());

    await admin
      .database()
      .ref('/groupes/' + groupeSnapshot.key + '/tasks/' + task.id)
      .update(groupe[task.id] > 0 ? groupe[task.id] + (isBefore ? -1 : 1) : 1);
  }
};

const handleTasks = async (taskSnapshot, { schoolYear, isBefore }) => {
  const groupesSnapshot = await groupesRef
    .orderByChild('schoolYear')
    .equalTo(schoolYear)
    .once('value');

  console.log(`School Year: ${schoolYear}`);

  if (groupesSnapshot.exists()) {
    await asyncForEach(groupesSnapshot, handleUpdateGroupeTask, { task: taskSnapshot.val(), isBefore });
  }
};

const getGroupesByClasseId = async classeId => {
  if (classeId) {
    const snapshotGroupes = await admin
      .database()
      .ref('/2019-2020/groupes')
      .orderByChild('classeId')
      .equalTo(classeId)
      .once('value');

    return _.sortBy(_.map(snapshotGroupes.val(), (groupe, groupeId) => ({ ...groupe, groupeId })), ['total']);
  }

  return [];
};

const selectGroupeByForTask = (groupes, taskId) => {
  if (groupes && taskId) {
    let groupeSelected;

    _.forEach(groupes, groupe => {
      if (groupe.tasks && groupe.tasks[taskId]) {
        if (groupeSelected ? groupeSelected.tasks[taskId] : 0 > groupe.tasks[taskId]) {
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

  const snapshotTasks = await database.ref('/2019-2020/tasks').once('value');
  const snapshotClasses = await database.ref('/2019-2020/classes').once('value');

  const snapshotClassesOfTheWeek = [];

  // Get all classes enable this week
  _.forEach(week.classes, (value, classeId) => {
    if (snapshotClasses.child(classeId).exists()) {
      snapshotClassesOfTheWeek.push(snapshotClasses.child(classeId));
    }
  });

  const tasks = {};

  // Assign Classe Task
  _.forEach(snapshotClassesOfTheWeek, async snapshotClasseOfTheWeek => {
    const groupes = getGroupesByClasseId(snapshotClasseOfTheWeek.key);

    const selectedGroupe = selectGroupeByForTask(groupes, snapshotClasseOfTheWeek.key);
    console.log(selectedGroupe);
    const selectedStudents = await admin
      .database()
      .ref('/2019-2020/students')
      .orderByChild('groupe')
      .equalTo(selectedGroupe ? selectedGroupe.groupeId : null)
      .once('value');

    tasks[snapshotClasseOfTheWeek.key] = {
      groupe: selectedGroupe ? selectedGroupe : 'Pas de groupe disponible.',
      classe: snapshotClasseOfTheWeek.child('name').val(),
      students: selectedStudents.val(),
    };
  });

  console.log(tasks);

  return null;
});

exports.addWeek = functions.https.onCall(async (data, context) => {
  const datesSnapshot = await datesRef
    .orderByChild('from')
    .equalTo(data.from)
    .once('value');
  const dates = datesSnapshot.val() ? Object.values(datesSnapshot.val()) : [];
  const date = dates[0];

  const classesSnapshot = await classesRef
    .orderByChild('schoolYear')
    .equalTo(data.schoolYear)
    .once('value');
  const classes = classesSnapshot.val() ? Object.values(classesSnapshot.val()) : [];

  const weeksSnapshot = await weeksRef
    .orderByChild('from')
    .equalTo(data.from)
    .once('value');
  const weeks = [];

  if (weeksSnapshot.exists()) {
    weeksSnapshot.forEach(week => {
      weeks.push({ key: week.key, values: week.val() });
    });
  }

  const studentsSnapshot = await studentsRef
    .orderByChild('schoolYear')
    .equalTo(data.schoolYear)
    .once('value');
  const students = studentsSnapshot.val() ? Object.values(studentsSnapshot.val()) : [];

  const groupesSnapshot = await groupesRef
    .orderByChild('schoolYear')
    .equalTo(data.schoolYear)
    .once('value');
  const groupes = [];

  if (groupesSnapshot.exists()) {
    groupesSnapshot.forEach(groupe => {
      groupes.push({ key: groupe.key, values: groupe.val() });
    });
  }

  const tasksSnapshot = await tasksRef.once('value');
  const tasks = tasksSnapshot.val() ? Object.values(tasksSnapshot.val()) : [];

  let groupesOfTheWeek = [];

  classesSnapshot.forEach(snapshotClasse => {
    if ((date.classes || []).indexOf(snapshotClasse.key) >= 0) {
      const groupesExist = groupes.filter(groupe => groupe.values.classeId === snapshotClasse.key);

      if (groupesExist) {
        groupesOfTheWeek.push(...groupesExist);
      }
    }
  });

  const tasksOfTheWeek = {};

  console.log(`Groupe of the week ${groupesOfTheWeek}`);

  classesSnapshot.forEach(snapshotClasse => {
    const classe = snapshotClasse.val();

    if ((date.classes || []).indexOf(snapshotClasse.key) >= 0) {
      let groupeSelected;
      let minGroupeSelected = 1000;

      groupesOfTheWeek
        .filter(groupe => groupe.values.classeId === snapshotClasse.key)
        .forEach(groupe => {
          if (minGroupeSelected > (groupe.values.tasks ? groupe.values.tasks[snapshotClasse.key] : 0)) {
            groupeSelected = groupe.values;
            minGroupeSelected = groupe.values.tasks ? groupe.values.tasks[snapshotClasse.key] : 0;
          }
        });

      if (groupeSelected) {
        tasksOfTheWeek[snapshotClasse.key] = {
          classe: classe.name,
          task: classe.name,
          groupeName: groupeSelected.number,
        };

        groupesOfTheWeek = groupesOfTheWeek.filter(groupe => groupe.values.number !== groupeSelected.number);
      } else {
        tasksOfTheWeek[snapshotClasse.key] = undefined;
      }
    }
  });

  tasksSnapshot.forEach(snapshotTask => {
    const task = snapshotTask.val();
    let groupeSelected;
    let minGroupeSelected = 1000;

    groupesOfTheWeek.forEach(groupe => {
      if (minGroupeSelected > (groupe.values.tasks ? groupe.values.tasks[snapshotTask.key] : 0)) {
        groupeSelected = groupe.values;
        minGroupeSelected = groupe.values.tasks ? groupe.values.tasks[snapshotTask.key] : 0;
      }
    });

    if (groupeSelected) {
      let classe;

      classesSnapshot.forEach(snapshotClasse => {
        if (snapshotClasse.key === groupeSelected.classeId) {
          classe = snapshotClasse.val();
        }
      });

      tasksOfTheWeek[snapshotTask.key] = {
        task: task.name,
        classe: classe.name,
        groupeName: groupeSelected.number,
      };

      groupesOfTheWeek = groupesOfTheWeek.filter(groupe => groupe.values.number !== groupeSelected.number);
    } else {
      tasksOfTheWeek[snapshotTask.key] = undefined;
    }
  });

  console.log(tasksOfTheWeek);

  const week = Object.keys(tasksOfTheWeek).reduce(
    (acc, value) => {
      const task = tasksOfTheWeek[value];

      if (task) {
        acc.tasks[value] = {
          id: value,
          ...task,
          students: students.filter(student => student.groupe === task.groupeName),
        };
      }

      return acc;
    },
    {
      tasks: {},
      from: data.from,
      schoolYear: data.schoolYear,
    },
  );

  const weekExist = weeks.find(week => week.values.from === data.from);

  if (weekExist) {
    admin
      .database()
      .ref(`/weeks/${weekExist.key}`)
      .update(week);
  } else {
    const { key } = weeksRef.push();

    admin
      .database()
      .ref(`/weeks/${key}`)
      .set(week);
  }

  return week;
});
