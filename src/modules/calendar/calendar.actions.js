import slug from "slug";
import firebase from "../../firebase";

import { uuidv4 } from "../../utils";

import {
	FETCH_DATES,
	ADD_DATE,
	REMOVE_DATE,
	
	GO_NEXT_WEEK,
	GO_PREVIOUS_WEEK,
	
	CREATE_WEEK,
	FETCH_WEEKS
} from "./calendar.constants";

export const fetchDatesAction = () => dispatch => 
	firebase
		.database()
		.ref("dates")
		.once("value")
		.then(function(snapshot) {
			dispatch({
				type: FETCH_DATES,
				dates: snapshot.val() ? Object.values(snapshot.val()) : []
			});
		});

export const addDateAction = date => dispatch => {
	firebase
		.database()
		.ref("dates/" + slug(date._id))
		.set(date)
		.then(() => dispatch({
			type: ADD_DATE,
			date
		}));
};

export const removeDateAction = date => dispatch => {
	firebase
		.database()
		.ref("dates/" + slug(date._id))
		.remove()
		.then(() => {
			dispatch({
				type: REMOVE_DATE,
				date
			});
		});
};

export const goNextWeekAction = () => ({
	type: GO_NEXT_WEEK
});

export const goPreviousWeekAction = () => ({
	type: GO_PREVIOUS_WEEK
});

export const createWeekAction = date => dispatch => {
	const week = {
		_id: uuidv4()
	};

	firebase
		.database()
		.ref("weeks/" + slug(week._id))
		.remove()
		.then(() => {
			dispatch({
				type: CREATE_WEEK,
				week
			});
		});
};

export const fetchWeeksAction = () => dispatch => {
	firebase
		.database()
		.ref("weeks")
		.once("value")
		.then(function(snapshot) {
			dispatch({
				type: FETCH_WEEKS,
				weeks: snapshot.val() ? Object.values(snapshot.val()) : []
			});
		});
};
