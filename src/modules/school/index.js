import {
	SELECT_CLASSE,
	FETCH_CLASSES,
	FETCH_STUDENTS,
	RESET_PREVIEW_CLASSE,

	FETCH_TASKS,
} from "./school.constants";

const initialeState = {
	classes: [],
	students: [],
	tasks: [],
	preview: null,
};

export default function school(state = initialeState, action) {	
	switch (action.type) {
	case SELECT_CLASSE:
		return { ...state, preview: action.preview };
	case FETCH_CLASSES:
		return { ...state, classes: action.classes };
	case FETCH_STUDENTS:
		return { ...state, students: action.students };
	case FETCH_TASKS:
		return { ...state, tasks: action.tasks };
	case RESET_PREVIEW_CLASSE:
		return {
			...state,
			preview: undefined
		};
	default:
		return state;
	}
}
