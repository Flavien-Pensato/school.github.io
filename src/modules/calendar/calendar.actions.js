import slug from "slug";
import _ from "lodash";
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

export const createWeekAction = (currentDate, classes, tasks, dates) => {
	const classesId = _.map(_.filter(dates, date => date.week === currentDate), date => date.classeId);
	const allTasks = [...tasks, ..._.filter(classes, classe => classesId.indexOf(classe._id) >= 0)];

	console.log(allTasks);
	// const week = {
	// 	_id: uuidv4()
	// };

	// firebase
	// 	.database()
	// 	.ref("weeks/" + slug(week._id))
	// 	.remove();
};

export const fetchWeeksAction = weeks => ({
	type: FETCH_WEEKS,
	weeks
});
