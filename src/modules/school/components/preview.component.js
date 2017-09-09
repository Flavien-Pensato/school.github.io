import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import _ from "lodash";

import ClasseInput from "./classeInput.connector";
import StudentInput from "./studentInput.connector";

class Preview extends Component {
	componentWillMount() {
		const { fetchStudents, preview } = this.props;

		fetchStudents(preview);
	}

	onClickAddStudent(e) {
		e.preventDefault();

		const { addStudent } = this.props;

		addStudent();
	}

	render() {
		const {
			preview,
			classe,
			students,
			resetPreviewClasse
		} = this.props;

		if (!preview) {
			return <Redirect to="/eleves" />;
		}

		return (
			<div className="pa4">
				<a
					href="#"
					onClick={e => {
						e.preventDefault();
						resetPreviewClasse();
					}}
				>
            Close
				</a>

				<ClasseInput {...classe} />

				<div className="measure center overflow-auto">
					<table className="f6 w-100 mw8 center" cellSpacing="0">
						<thead>
							<tr>
								<th className="fw6 bb b--black-20 tl pb3 pr3 w-60">Nom</th>
								<th className="fw6 bb b--black-20 tl pb3 pr3 w-20">Groue</th>
								<th className="fw6 bb b--black-20 tl pb3 pr3 w-20">Action</th>
							</tr>
						</thead>
						<tbody className="lh-copy">
							{
								_.map(students, (student, index) => <StudentInput key={index} {...student} />)
							}
						</tbody>
					</table>
				</div>
				<div className="measure center br2-ns ba b--black-10" >
					<input type="submit" className="f6 link dim ba bw2 ph3 pv2 mb2 dib dark-green" onClick={this.onClickAddStudent.bind(this)} value="Ajouter un eleve"/>
				</div> 
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

	fetchStudents: PropTypes.func.isRequired,
	
	resetPreviewClasse: PropTypes.func.isRequired,
};

export default Preview;
