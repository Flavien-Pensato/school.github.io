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

		return _.map(_.orderBy(classes, [classe => classe.name.toLowerCase()], ["async"]), classe => <th className="fw6 bb b--black-20 pb3 pr3" key={classe.name}>{classe.name}</th>);
	}

	renderTasksBody() {
		const tab = new Array(10);
		const { classes, dates } = this.props;
		let weekOfYear = moment().week() - 1;

		return (
			<tbody className="lh-copy tc">
				{_.map(tab, (res, index) => {
					weekOfYear += 1;
					return <tr key={index}>
						<td className="pv3 pr3 bb b--black-20 tl">
        Du&nbsp;{moment().week(weekOfYear).startOf("week").format("dddd D MMMM")}
							<br/>
        Au&nbsp;
							{moment().week(weekOfYear).startOf("week").add("days", 4).format("dddd D MMMM")}
						</td>
						{_.map(classes, (classe, index) => <PresenceCase key={index} date={_.find(dates, date => date.week === moment().week(weekOfYear).format("w/YYYY"))} classeId={classe._id} week={moment().week(weekOfYear).format("w/YYYY")} />)}
					</tr>
					;
				})}
			</tbody>

		);
	}

	render() {
    
		return (
			<div className="pa4">
				<div className="overflow-auto">
					<table className="f6 w-100 mw8 center" cellSpacing="0">
						<thead>
							<tr>
								<th className="fw6 bb b--black-20 pb3 pr3 tl">Semaine</th>
								{this.renderClassesHeader()}
							</tr>
						</thead>
						{this.renderTasksBody()}
					</table>
				</div>
			</div>
		
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
