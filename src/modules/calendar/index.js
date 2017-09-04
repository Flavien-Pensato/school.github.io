import _ from "lodash";

import {
	FETCH_DATES,

	ADD_DATE,
	REMOVE_DATE,
} from "./calendar.constants";

const initialeState = {
	tasks: [],
	dates: [],
};

export default function tasks(state = initialeState, action) {
	let dates;
  
	switch (action.type) {
	case FETCH_DATES:
		return { ...state, dates: action.dates };
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

	default:
		return state;
	}
}
