// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

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

// Get the data on a post that has changed
exports.makeGroupes = functions.database.ref('/students/{studentId}').onWrite(async (change, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const studentAfter = change.after.val();
  const studentBefore = change.before.val();

  if (studentAfter.groupe !== studentBefore.groupe) {
    const snapshot = await groupesRef
      .orderByChild('schoolYear')
      .equalTo(studentAfter.schoolYear)
      .once('value');
    let groupeAfter;
    let groupeBefore;

    if (snapshot.exists()) {
      snapshot.forEach(groupe => {
        const values = groupe.val();
        if (values.number === studentAfter.groupe) {
          groupeAfter = { key: groupe.key, values };
        }

        if (values.number === studentBefore.groupe) {
          groupeBefore = { key: groupe.key, values };
        }
      });
    }

    if (!groupeAfter) {
      const newGroupeRef = groupesRef.push().key;

      admin
        .database()
        .ref(`/groupes/${newGroupeRef}`)
        .set({
          number: studentAfter.groupe,
          classeId: studentAfter.classeId,
          schoolYear: studentAfter.schoolYear,
          students: [context.params.studentId],
        });
    } else if (groupeAfter.values.students) {
      admin
        .database()
        .ref(`/groupes/${groupeAfter.key}`)
        .update({
          classeId: studentAfter.classeId,
          students: [...groupeAfter.values.students, context.params.studentId],
        });
    } else {
      admin
        .database()
        .ref(`/groupes/${groupeAfter.key}`)
        .remove();
    }

    if (groupeBefore) {
      if (groupeBefore.values.students.indexOf(context.params.studentId) >= 0) {
        groupeBefore.values.students.splice(groupeBefore.values.students.indexOf(context.params.studentId), 1);
      }

      admin
        .database()
        .ref('/groupes/' + groupeBefore.key)
        .update({
          students: groupeBefore.values.students,
          classeId: studentBefore.classeId,
        });
    }
  }

  return null;
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

exports.updateGroupes = functions.database.ref('/weeks/{weekId}').onWrite(async change => {
  if (change.before.exists()) {
    return null;
  }
  // Exit when the data is deleted.
  if (!change.after.exists()) {
    return null;
  }

  const weekAfter = change.after.val();
  const weekBefore = change.before.val();

  // Remove taks
  if (change.before.hasChild('tasks')) {
    console.log(`Before: have tasks array`);

    await asyncForEach(change.before.child('tasks'), handleTasks, {
      schoolYear: weekBefore.schoolYear,
      isBefore: true,
    });
  }

  // Add taks
  if (change.after.hasChild('tasks')) {
    console.log(`After: have tasks array`);

    await asyncForEach(change.after.child('tasks'), handleTasks, {
      schoolYear: weekAfter.schoolYear,
      isBefore: false,
    });
  }

  return null;
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
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
