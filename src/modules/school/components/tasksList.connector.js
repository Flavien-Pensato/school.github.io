import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TasksList from "./tasksList.component";

import { getTasks  } from "../school.selectors";

const mapStateToProps = state => ({
	tasks: getTasks(state),
});

export default withRouter(
	connect(mapStateToProps)(TasksList)
);
