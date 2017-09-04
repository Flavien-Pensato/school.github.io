import React, { Component } from "react";

import Table from "../../modules/calendar/components/table.connector";

import "./Calendar.css";

class Calendar extends Component {
	render() {
		return (
			<div className="collection-calendar">
				<Table />
			</div>
		);
	}
}

export default Calendar;
