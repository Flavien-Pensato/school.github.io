import _ from "lodash";

import {
	FETCH_TASKS,

	ADD_TASK,
	REMOVE_TASK,
} from "./calendar.constants";

const initialeState = {
	tasks: [],
};

export default function tasks(state = initialeState, action) {
	let tasks;
  
	switch (action.type) {
	case FETCH_TASKS:
		return { ...state, tasks: action.tasks };
	case ADD_TASK:
		return {
			...state,
			tasks: [...state.tasks, action.task],
		};
	case REMOVE_TASK:
		tasks = [...state.tasks];
		tasks.splice(_.findIndex(tasks, task => task._id === action.task._id), 1);

		return {
			...state,
			tasks
		};

	default:
		return state;
	}
}
