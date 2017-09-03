import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class TasksList extends Component {
	componentWillMount() {
		const { fetchTasks, fetchClasses } = this.props;

		fetchTasks();
		fetchClasses();
	}

	render() {
		const { tasks, classes } = this.props;

		if (tasks.length > 0) {
			return (
				<div className="wrapper">
					<div className="item item-header item-week">Semaine</div>
					{_.map(_.orderBy(tasks, [task => task.name.toLowerCase()], ["async"]), task => <div key={task.name} className="item item-header item-classe">{task.name}</div>)}
					{_.map(_.orderBy(classes, [classe => classe.name.toLowerCase()], ["async"]), classe => <div key={classe.name} className="item item-header item-classe">{classe.name}</div>)}
				</div>
			);			
		} else {
			return null;
		}
	}
}

TasksList.propTypes = {
	tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
	classes: PropTypes.arrayOf(PropTypes.object).isRequired,
	fetchTasks: PropTypes.func.isRequired,
	fetchClasses: PropTypes.func.isRequired
};

export default TasksList;
