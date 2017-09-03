import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TasksList from "./tasksList.component";

import { getTasks } from "../calendar.selectors";
import { getClasses } from "../../school/school.selectors";
import { fetchTasksAction } from "../calendar.actions";
import { fetchClassesAction } from "../../school/school.actions";

const mapStateToProps = state => ({
	tasks: getTasks(state),
	classes: getClasses(state),
});

const mapDispatchToProps = dispatch => ({
	fetchTasks: () => dispatch(fetchTasksAction()),
	fetchClasses: () => dispatch(fetchClassesAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TasksList));
