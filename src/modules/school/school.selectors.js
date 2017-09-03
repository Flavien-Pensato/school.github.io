import _ from "lodash";

export const getPreview = ({ school }) => _.get(school, "preview");

export const getClasse = ({ school }, classeId) => _.find(
	_.get(school, "classes", []), classe => classe._id === classeId
);

export const getStudents = ({ school }) => _.get(school, "students", []);

export const getClasses = ({ school }) => _.get(school, "classes", []);
