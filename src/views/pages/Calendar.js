import React, { Component } from "react";

import TasksList from "../../modules/calendar/components/tasksList.connector";

import "./Calendar.css";

class Calendar extends Component {
	render() {
		return (
			<div className="collection-calendar">
				<TasksList />
				<div className="wrapper">
					<div className="item item-week">1</div>
					<div className="item item-classe">3eme A</div>
				</div>
			</div>
		);
	}
}

export default Calendar;
