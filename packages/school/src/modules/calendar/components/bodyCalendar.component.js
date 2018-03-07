import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class BodyCalendar extends Component {
	render() {    
		const { currentWeek,  weeks } = this.props;

		const week = _.find(weeks, week => week._id === currentWeek.format("WY"));

		return (
			<div id="planning">
				{
					week ?
						<table className="f7 w-100 center" cellSpacing="0">
							<thead>
								<tr>
									<th className="fw6 bb b--black-20 tl pb3 pr3">Tâche</th>
									<th className="fw6 bb b--black-20 tl pb3 pr3">Classe</th>
									<th className="fw6 bb b--black-20 tl pb3 pr3">Groupe</th>
									<th className="fw6 bb b--black-20 tl pb3 pr3">Étudiants</th>
								</tr>
							</thead>
							<tbody className="lh-copy">
								{week.tasks.map((task, index) => <tr key={index}>
									<td className="pv2 pr3 bb b--black-20">{task.task.name.replace(/ /g, "\u00a0")}</td>
									<td className="pv2 pr3 bb b--black-20">{task.classe.replace(/ /g, "\u00a0")}</td>
									<td className="pv2 pr3 bb b--black-20">{task.groupe}</td>
									<td className="pv2 pr3 bb b--black-20">{task.students ? task.students.join(", ") : ""}</td>
								</tr>)}
							</tbody>
						</table>
						: <span>Pas de semaine programmée</span>
				}
			</div>
		);
	}
}

BodyCalendar.propTypes = {
	weeks: PropTypes.array,
	currentWeek: PropTypes.object,
};

export default BodyCalendar;
