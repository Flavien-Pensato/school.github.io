import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";

import PresenceCase from "./presenceCase.connector";

class Table extends Component {
	componentWillMount() {
		const { fetchClasses, fetchDates } = this.props;

		fetchClasses();
		fetchDates();
	}

	renderClassesHeader() {
		const { classes } = this.props;

		return _.map(_.orderBy(classes, [classe => classe.name.toLowerCase()], ["async"]), classe => <th key={classe.name}>{classe.name}</th>);
	}

	renderTasksBody() {
		const tab = new Array(10);
		const { classes, dates } = this.props;
		let weekOfYear = moment().week() - 1;

		return (
			<tbody>
				{_.map(tab, (res, index) => {
					weekOfYear += 1;
					return <tr key={index}>
						<td>
        du&nbsp;{moment().week(weekOfYear).startOf("week").format("dddd D MMMM")}
							<br/>
        au&nbsp;
							{moment().week(weekOfYear).startOf("week").add("days", 4).format("dddd D MMMM")}
						</td>
						{_.map(classes, (classe, index) => <PresenceCase key={index} toggle={_.find(dates, date => date.week === moment().week(weekOfYear).format("w/YYYY")) ? true : false} classeId={classe._id} week={moment().week(weekOfYear).format("w/YYYY")} />)}
					</tr>
					;
				})}
			</tbody>

		);
	}

	render() {
    
		return (
			<table>
				<thead>
					<tr>
						<th>Semaine</th>
						{this.renderClassesHeader()}
					</tr>
				</thead>
				{this.renderTasksBody()}
			</table>
		);
	}
}

Table.propTypes = {
	fetchClasses: PropTypes.func.isRequired,
	classes: PropTypes.arrayOf(PropTypes.object).isRequired,

	fetchDates: PropTypes.func.isRequired,
	dates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
