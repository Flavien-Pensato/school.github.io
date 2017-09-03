import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import ClasseInput from "./classeInput.connector";
import StudentInput from "./studentInput.connector";

class Preview extends Component {
	submitClasse(event) {
		event.preventDefault();

		// const { preview } = this.props;

		// editClasse({
		// 	_id: uuidv4(),
		// 	name: event.target.name.value,
		// 	createdAt: new Date()
		// });

		// _.each(preview.students, student => {
		// 	editStudent({
		// 		_id: uuidv4(),
		// 		...student
		// 	});
		// });
	}

	render() {
		const {
			preview,
			classe,
			students,
			addStudent,
			resetClasse
		} = this.props;

		if (!preview) {
			return <Redirect to="/eleves" />;
		}

		return (
			<div>
				<form onSubmit={this.submitClasse.bind(this)}>
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							resetClasse();
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
					<input type="submit" value="Enregistrer" />
				</form>
			</div>
		);
	}
}

Preview.propTypes = {
	preview: PropTypes.string,
	classe: PropTypes.object.isRequired,
	students: PropTypes.arrayOf(PropTypes.object).isRequired,
	addStudent: PropTypes.func.isRequired,
	editStudent: PropTypes.func.isRequired,
	removeStudent: PropTypes.func.isRequired,
	resetClasse: PropTypes.func.isRequired,
};

export default Preview;
