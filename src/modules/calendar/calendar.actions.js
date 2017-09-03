import slug from "slug";

import { FETCH_DATE, ADD_DATE, REMOVE_DATE,	FETCH_TASKS, ADD_TASK, REMOVE_TASK } from "./calendar.constants";
import firebase from "../../firebase";

export const fetchDates = () => ({
	type: FETCH_DATE,
});

export const addDate = date => dispatch => {
	firebase.database().ref("dates/" + slug(date._id))
		.set(date)
		.then(() => dispatch({
			type: ADD_DATE,
			date
		}));
};

export const removeDate = date => dispatch => {
	firebase.database()
		.ref("dates/" + slug(date._id))
		.remove()
		.then(() => {
			dispatch({
				type: REMOVE_DATE,
				date
			});
		});
};

export function fetchTasksAction() {
	return function(dispatch) {
		firebase.database().ref("tasks").once("value").then(function(snapshot) {
			dispatch({
				type: FETCH_TASKS,
				tasks: snapshot.val() ? Object.values(snapshot.val()) : []
			});
		});
	};
}

export const addTaskAction = task => dispatch => {
	firebase
		.database()
		.ref("tasks/" + slug(task._id))
		.set(task)
		.then(() => {
			dispatch({
				type: ADD_TASK,
				task
			});
		});
};

export const removeTaskAction = task => dispatch => {
	firebase
		.database()
		.ref("tasks/" + slug(task._id))
		.set(task)
		.then(() => {
			dispatch({
				type: REMOVE_TASK,
				task
			});
		});
};
