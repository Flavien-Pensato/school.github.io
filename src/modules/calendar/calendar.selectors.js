import _ from "lodash";

export const getTasks = ({ calendar }) => _.get(calendar, "tasks");
