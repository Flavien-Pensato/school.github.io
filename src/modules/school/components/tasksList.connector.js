import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchTasksAction, addTaskAction, removeTaskAction } from "../school.actions";

import TasksList from "./tasksList.component";

import { getTasks  } from "../school.selectors";

const mapStateToProps = state => ({
	tasks: getTasks(state),
});

const mapDispatchToProps = dispatch => ({
	fetchTasks: () => dispatch(fetchTasksAction()),
	addTask: task => dispatch(addTaskAction(task)),
	removeTask: task => dispatch(removeTaskAction(task)),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(TasksList)
);
