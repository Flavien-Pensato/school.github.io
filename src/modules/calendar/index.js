import _ from "lodash";
import moment from "moment";

import {
	FETCH_WEEKS,
	FETCH_DATES,

	ADD_DATE,
	REMOVE_DATE,

	GO_NEXT_WEEK,
	GO_PREVIOUS_WEEK,
} from "./calendar.constants";

const initialeState = {
	dates: [],
	weeks: [],
	selectedWeek: moment().startOf("week"),
};

export default function tasks(state = initialeState, action) {
	let dates;
  
	switch (action.type) {
	case FETCH_DATES:
		return { ...state, dates: action.dates };
	case FETCH_WEEKS:
		return { ...state, weeks: action.weeks };
	case ADD_DATE:
		return {
			...state,
			dates: [...state.dates, action.date],
		};
	case REMOVE_DATE:
		dates = [...state.dates];
		dates.splice(_.findIndex(dates, date => date._id === action.date._id), 1);

		return {
			...state,
			dates
		};
	case GO_NEXT_WEEK:
		return {
			...state,
			selectedWeek: state.selectedWeek.add("weeks", 1),
		};
	case GO_PREVIOUS_WEEK:
		return {
			...state,
			selectedWeek: state.selectedWeek.add("weeks", -1),
		};

	default:
		return state;
	}
}
