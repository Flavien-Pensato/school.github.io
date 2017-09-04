import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import ClasseInput from "./classeInput.connector";
import StudentInput from "./studentInput.connector";

class Preview extends Component {
	render() {
		const {
			preview,
			classe,
			students,
			addStudent,
			resetPreviewClasse
		} = this.props;

		if (!preview) {
			return <Redirect to="/eleves" />;
		}

		return (
			<div>
				<a
					href="#"
					onClick={e => {
						e.preventDefault();
						resetPreviewClasse();
					}}
				>
            Close
				</a>
				<ul>
					<li>
						<ClasseInput {...classe} />
					</li>
					{students.map((student, key) =>
						<li key={key}>
							<StudentInput {...student} />
						</li>
					)}
					<li>
						<button
							onClick={e => {
								e.preventDefault();
								addStudent();
							}}
						>
                Add Student
						</button>
					</li>
				</ul>
			</div>
		);
	}
}

Preview.propTypes = {
	preview: PropTypes.string,
	classe: PropTypes.object,
	students: PropTypes.arrayOf(PropTypes.object).isRequired,

	addStudent: PropTypes.func.isRequired,
	editStudent: PropTypes.func.isRequired,
	removeStudent: PropTypes.func.isRequired,

	resetPreviewClasse: PropTypes.func.isRequired,
};

export default Preview;
