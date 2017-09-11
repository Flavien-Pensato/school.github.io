import slug from "slug";
import firebase from "../../firebase";

import { uuidv4 } from "../../utils";

import {
	FETCH_DATES,
	
	GO_NEXT_WEEK,
	GO_PREVIOUS_WEEK,
	
	CREATE_WEEK,
	FETCH_WEEKS
} from "./calendar.constants";

export const fetchDatesAction = dates => 	({
	type: FETCH_DATES,
	dates
});

export const addDateAction = date => {
	firebase
		.database()
		.ref(`2017-2018/dates/${date._id}`)
		.set(date);
};

export const removeDateAction = dateId => {
	firebase
		.database()
		.ref(`2017-2018/dates/${dateId}`)
		.remove();
};

export const goNextWeekAction = () => ({
	type: GO_NEXT_WEEK
});

export const goPreviousWeekAction = () => ({
	type: GO_PREVIOUS_WEEK
});

export const createWeekAction = date => {
	const week = {
		_id: uuidv4()
	};

	firebase
		.database()
		.ref("weeks/" + slug(week._id))
		.remove();
};

export const fetchWeeksAction = weeks => ({
	type: FETCH_WEEKS,
	weeks
});
