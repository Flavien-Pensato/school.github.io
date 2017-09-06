import React, { Component } from "react";
import PropTypes from "prop-types";

import { uuidv4 } from "../../../utils";

class StudentInput extends Component {
	render() {
		const { name, group, classeId, _id, editStudent, removeStudent } = this.props;
        
		return (
			<tr>
				<td className="pv3 pr3 bb b--black-20">
					<input
						className="pa2 input-reset ba bg-transparent w-100 measure"
						type="text"
						name="name"
						defaultValue={name} onChange={e => {
							e.preventDefault();
							editStudent({
								_id,
								group,
								classeId,
								name: e.currentTarget.value
							});
						}}/>
				</td>
				<td className="pv3 pr3 bb b--black-20">
					<input className="pa2 input-reset ba bg-transparent w-100 measure" type="number" name="name" defaultValue={group} onChange={e => {
						e.preventDefault();
						editStudent({
							_id,
							group: parseInt(e.currentTarget.value),
							classeId,
							name
						});
					}}/>
				</td>
				<td className="pv3 pr3 bb b--black-20">
					<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="button" onClick={e => {
						e.preventDefault();
						removeStudent({
							_id,
							group: parseInt(e.currentTarget.value),
							classeId,
							name
						});
					}} value="Supprimer"/>
				</td>
			</tr>
		);
	}
}

StudentInput.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	group: PropTypes.number.isRequired,
	classeId: PropTypes.string.isRequired,
	
	editStudent: PropTypes.func.isRequired,
	removeStudent: PropTypes.func.isRequired,
};

StudentInput.defaultProps = {
	_id: uuidv4(),
	name: "Nom de l'étudiant",
	group: -1,
};

export default StudentInput;
