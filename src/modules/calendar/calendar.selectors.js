import _ from "lodash";

export const getDates = ({ calendar }) => _.get(calendar, "dates");
