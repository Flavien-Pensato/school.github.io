import React, { Component } from "react";

import TasksList from "../../modules/school/components/tasksList.connector";

class Tasks extends Component {
	render() {
		return (
			<div className="vh-85">
				<TasksList />
			</div>
		);
	}
}

export default Tasks;
