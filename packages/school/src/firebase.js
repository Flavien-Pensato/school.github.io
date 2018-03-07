import * as firebase from "firebase";

const config = {
	apiKey: "AIzaSyB7W5Xjq5UTGllPEvlJW48xSGmSb-GBDMA",
	authDomain: "school-81af1.firebaseapp.com",
	databaseURL: "https://school-81af1.firebaseio.com",
	projectId: "school-81af1",
	storageBucket: "school-81af1.appspot.com"
};

firebase.initializeApp(config);

export default firebase;
