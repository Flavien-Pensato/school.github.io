import _ from "lodash";

export const getPreview = ({ school }) => _.get(school, "preview");

export const getClasse = ({ school }, classeId) => _.find(
	_.get(school, "classes", []), classe => classe._id === classeId
);

export const getStudents = ({ school }, classId) => _.orderBy(
	_.filter(
		_.get(school, "students", []),
		student => student.classeId === classId),
	[student => student.name.toLowerCase()], ["asyn"]);

export const getClasses = ({ school }) => _.get(school, "classes", []);

export const getTasks = ({ school }) => _.orderBy(_.get(school, "tasks"), [task => task.name.toLowerCase()], ["asyn"]);
