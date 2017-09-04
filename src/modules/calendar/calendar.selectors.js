import _ from "lodash";

export const getTasks = ({ calendar }) => _.get(calendar, "tasks");

export const getDates = ({ calendar }) => _.get(calendar, "dates");
