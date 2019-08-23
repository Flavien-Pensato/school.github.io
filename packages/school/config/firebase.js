import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyB7W5Xjq5UTGllPEvlJW48xSGmSb-GBDMA',
  authDomain: 'school-81af1.firebaseapp.com',
  databaseURL: 'https://school-81af1.firebaseio.com',
  projectId: 'school-81af1',
  storageBucket: 'school-81af1.appspot.com',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
