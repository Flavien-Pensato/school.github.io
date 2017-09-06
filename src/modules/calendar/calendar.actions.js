import slug from "slug";

import { FETCH_DATES, ADD_DATE, REMOVE_DATE } from "./calendar.constants";
import firebase from "../../firebase";

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
