import XLSX from "xlsx";
import slug from "slug";
import _ from "lodash";

import { uuidv4 } from "../../utils";
import firebase from "../../firebase";

import {
	IMPORT_CLASSE,
	FETCH_CLASSES,
	FETCH_STUDENTS,
	RESET_PREVIEW_CLASSE,
	
	ADD_CLASSE,
	EDIT_CLASSE,
	REMOVE_CLASSE,
	
	ADD_STUDENT,
	EDIT_STUDENT,
	REMOVE_STUDENT,
} from "./school.constants";

export function importFileAction(binary) {
	return function(dispatch) {
		const oFile = XLSX.read(binary, {
			type: "binary"
		});

		const worksheet = oFile.Sheets[oFile.SheetNames[0]];
		const text = _.replace(
			XLSX.utils.sheet_to_csv(worksheet, { raw: true }),
			new RegExp(",|\"", "g"),
			" "
		);

		const classeId = uuidv4();

		dispatch(addClasseAction({
			_id: classeId,
			name: "",
			createdAt: new Date()
		}));
		
		_.split(text, "\n").map(line => dispatch(addStudentAction({
			_id: uuidv4(),
			name: line.trim(),
			classeId,
		})));
	};
}

export function setPreviewAction(preview) {
	return {
		type: IMPORT_CLASSE,
		preview
	};
}

export function fetchClassesAction() {
	return function(dispatch) {
		firebase.database().ref("classes").once("value").then(function(snapshot) {
			dispatch({
				type: FETCH_CLASSES,
				classes: snapshot.val() ? Object.values(snapshot.val()) : []
			});
		});
	};
}

export function addClasseAction(classe) {
	return function(dispatch) {
		firebase
			.database()
			.ref("classes/" + slug(classe._id))
			.set(classe)
			.then(() => {
				dispatch({
					type: ADD_CLASSE,
					classe
				});
			});
	};
}

export function editClasseAction(classe) {
	return function(dispatch) {
		firebase
			.database()
			.ref("classes/" + slug(classe._id))
			.set(classe)
			.then(() => {
				dispatch({
					type: EDIT_CLASSE,
					classe
				});
			});
	};
}

export function removeClasseAction(classe) {
	return function(dispatch) {
		firebase
			.database()
			.ref("classes/" + slug(classe._id))
			.set(classe)
			.then(() => {
				dispatch({
					type: REMOVE_CLASSE,
					classe
				});
			});
	};
}

export const resetPreviewClasseAction = () => ({
	type: RESET_PREVIEW_CLASSE
});

export function fetchStudentsAction(classeId) {
	return function(dispatch) {
		firebase.database().ref("students").orderByChild("classeId").equalTo(classeId).once("value").then(function(snapshot) {
			dispatch({
				type: FETCH_STUDENTS,
				students: snapshot.val() ? Object.values(snapshot.val()) : []
			});
		});
	};
}

export function addStudentAction(student) {
	return function(dispatch) {
		firebase
			.database()
			.ref("students/" + slug(student._id))
			.set(student)
			.then(() => {
				dispatch({
					type: ADD_STUDENT,
					student
				});
			});
	};
}

export function editStudentAction(student) {
	return function(dispatch) {
		firebase
			.database()
			.ref("students/" + slug(student._id))
			.update(student)
			.then(() => {
				dispatch({
					type: EDIT_STUDENT,
					student
				});
			});
	};
}

export function removeStudentAction(student) {
	return function(dispatch) {
		firebase
			.database()
			.ref("students/" + slug(student._id))
			.remove()
			.then(() => {
				dispatch({
					type: REMOVE_STUDENT,
					student
				});
			});
	};
}
