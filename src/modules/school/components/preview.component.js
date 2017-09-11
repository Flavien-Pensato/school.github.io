import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import _ from "lodash";

import { uuidv4 } from "../../../utils";

import ClasseInput from "./classeInput.component";
import StudentInput from "./studentInput.component";

import { addStudentAction } from "../school.actions";

class Preview extends Component {
	onClickAddStudent(e) {
		e.preventDefault();

		const { preview } = this.props;

		addStudentAction({
			_id: uuidv4(),
			name: "XXX",
			classeId: preview 
		});
	}

	render() {
		const {
			preview,
			classe,
			resetPreviewClasse
		} = this.props;

		if (!preview && !classe) {
			return <Redirect to="/eleves" />;
		}

		const students = _.orderBy(
			classe.students,
			[student => student.name.toLowerCase()], ["asyn"]);

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
								_.map(students, student => <StudentInput key={student._id} {...student} />)
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
	
	resetPreviewClasse: PropTypes.func.isRequired,
};

export default Preview;
