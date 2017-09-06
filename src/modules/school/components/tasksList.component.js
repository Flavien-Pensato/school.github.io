import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { uuidv4 } from "../../../utils";

class TasksList extends Component {
	componentDidMount() {
		const { fetchTasks } = this.props;

		fetchTasks();
	}
  
	onSubmitAddTask(e) {
		e.preventDefault();

		const { addTask } = this.props;
    
		addTask({
			_id: uuidv4(),
			name: e.target.name.value,
		});
	}
  
	onClickRemoveTask(task) {    
		const { removeTask } = this.props;
    
		removeTask(task);
	}

	render() {
		const { tasks } = this.props;
    
		return (
			<div className="pa3 pa5-ns">
				<ul className="list pl0 measure center">
					{_.map(tasks, (task, index) => <li className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30" key={index}>{task.name} <button className="bn fr f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-light-purple" onClick={this.onClickRemoveTask.bind(this, task)}>Supprimer</button></li>)}
				</ul>

				<form className="measure center br2-ns ba b--black-10" onSubmit={this.onSubmitAddTask.bind(this)}>
					<fieldset className="cf bn ma0 pa0">
						<div className="cf">
							<label className="clip" htmlFor="email-address">Email Address</label>
							<input name="name" type="text" className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-60-l br2-ns br--left-ns" />
							<input className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-40-l br2-ns br--right-ns" type="submit" value="Ajouter un nouvelle tache"/>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}
}

TasksList.propTypes = {
	tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
	fetchTasks: PropTypes.func.isRequired,
	addTask: PropTypes.func.isRequired,
	removeTask: PropTypes.func.isRequired,
};

export default TasksList;
