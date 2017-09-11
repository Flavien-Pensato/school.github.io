import React, { Component } from "react";
import PropTypes from "prop-types";

import { editStudentAction, removeStudentAction } from "../school.actions";

import { uuidv4 } from "../../../utils";

class StudentInput extends Component {
	render() {
		const { name, group, classeId, _id } = this.props;
        
		return (
			<tr>
				<td className="pv3 pr3 bb b--black-20">
					<input
						className="pa2 input-reset ba bg-transparent w-100 measure"
						type="text"
						name="name"
						value={name} onChange={e => {
							e.preventDefault();

							if (e.currentTarget.value) {
								editStudentAction(classeId, _id, "name", e.currentTarget.value);
							}
						}}/>
				</td>
				<td className="pv3 pr3 bb b--black-20">
					<input className="pa2 input-reset ba bg-transparent w-100 measure" type="number" name="name" value={group} onChange={e => {
						e.preventDefault();

						if (parseInt(e.currentTarget.value)) {
							editStudentAction(classeId, _id, "group", parseInt(e.currentTarget.value));
						}
					}}/>
				</td>
				<td className="pv3 pr3 bb b--black-20">
					<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="button" onClick={e => {
						e.preventDefault();
						
						removeStudentAction(classeId, _id);
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
};

StudentInput.defaultProps = {
	_id: uuidv4(),
	name: "Nom de l'étudiant",
	group: -1,
};

export default StudentInput;
