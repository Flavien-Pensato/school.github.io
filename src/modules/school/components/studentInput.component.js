import React, { Component } from "react";
import PropTypes from "prop-types";

import { uuidv4 } from "../../../utils";

class StudentInput extends Component {
	render() {
		const { name, group, _id, editStudent, removeStudent } = this.props;
        
		return <div>
			<input
				type="text"
				value={name}
				onChange={e => {
					e.preventDefault();
					editStudent({
						_id,
						group,
						name: e.currentTarget.value
					});
				}}
			/>
			<input
				type="number"
				value={group}
				onChange={e => {
					e.preventDefault();
					editStudent({
						_id,
						group: parseInt(e.currentTarget.value),
						name
					});
				}}
			/>
			<button
				onClick={e => {
					e.preventDefault();
					removeStudent(_id);
				}}
			>Delete</button>
		</div>;
	}
}

StudentInput.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	group: PropTypes.number.isRequired,
    
	editStudent: PropTypes.func.isRequired,
	removeStudent: PropTypes.func.isRequired,
};

StudentInput.defaultProps = {
	_id: uuidv4(),
	name: "Nom de l'étudiant",
	group: -1,
};

export default StudentInput;
