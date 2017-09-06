import _ from "lodash";

import {
	IMPORT_CLASSE,
	FETCH_CLASSES,
	FETCH_STUDENTS,
	RESET_PREVIEW_CLASSE,

	ADD_CLASSE,
	EDIT_CLASSE,
	REMOVE_CLASSE,

	FETCH_TASKS,
	ADD_TASK,
	REMOVE_TASK,

	ADD_STUDENT,
	EDIT_STUDENT,
	REMOVE_STUDENT,
} from "./school.constants";

const initialeState = {
	classes: [],
	students: [],
	tasks: [],
	preview: null,
};

export default function school(state = initialeState, action) {
	let students;
	let classes;
	let tasks;
	
	switch (action.type) {
	case IMPORT_CLASSE:
		return { ...state, preview: action.preview };
	case FETCH_CLASSES:
		return { ...state, classes: action.classes };
	case FETCH_STUDENTS:
		return { ...state, students: _.unionBy(action.students, state.students, "_id")};
	case RESET_PREVIEW_CLASSE:
		return {
			...state,
			preview: undefined
		};

	case ADD_CLASSE:
		return {
			...state,
			classes: [...state.classes, action.classe],
			preview: action.classe._id,
		};
	case EDIT_CLASSE:
		classes = [...state.classes];
		classes.splice(_.findIndex(classes, classe => classe._id === action.classe._id), 1, action.classe);

		return {
			...state,
			classes
		};
	case REMOVE_CLASSE:
		classes = [...state.classes];
		classes.splice(_.findIndex(classes, classe => classe._id === action.classe._id), 1);

		return {
			...state,
			classes
		};

	case ADD_STUDENT:
		return {
			...state,
			students: [...state.students, action.student],
			preview: action.student.classeId,
		};
	case EDIT_STUDENT:
		students = [...state.students];
		students.splice(_.findIndex(students, student => student._id === action.student._id), 1, action.student);

		return {
			...state,
			students
		};
	case REMOVE_STUDENT:
		students = [...state.students];
		students.splice(_.findIndex(students, student => student._id === action.student._id), 1);

		return {
			...state,
			students
		};

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
