import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB7W5Xjq5UTGllPEvlJW48xSGmSb-GBDMA',
  authDomain: 'school-81af1.firebaseapp.com',
  databaseURL: 'https://school-81af1.firebaseio.com',
  projectId: 'school-81af1',
  storageBucket: 'school-81af1.appspot.com',
};

firebase.initializeApp(config);

// const tabCollections = [{
// 	ref: firebase.database().ref('2017-2018/classes'),
// 	action: fetchClassesAction,
// }, {
// 	ref: firebase.database().ref('2017-2018/dates'),
// 	action: fetchDatesAction,
// }, {
// 	ref: firebase.database().ref('2017-2018/students'),
// 	action: fetchStudentsAction,
// }, {
// 	ref: firebase.database().ref('2017-2018/tasks'),
// 	action: fetchTasksAction,
// }, {
// 	ref: firebase.database().ref('2017-2018/weeks'),
// 	action: fetchWeeksAction,
// }];

// tabCollections.forEach((collection) => {
// 	collection.ref.on('value', (snapshot) => {
// 		store.dispatch(collection.action(snapshot.val() ? Object.values(snapshot.val()) : []));
// 	});
// });


export default firebase;
