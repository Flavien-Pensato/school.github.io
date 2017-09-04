import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";

class Classes extends Component {
	componentWillMount() {
		const { fetchClasses, fetchStudents, match } = this.props;

		fetchClasses();

		if (_.get(match, "params.id")) {
			fetchStudents(match.params.id);			
		}
	}

	componentWillReceiveProps(nextProps) {
		const { match, fetchStudents } = this.props;

		if (_.get(match, "params.id") !== _.get(nextProps, "match.params.id")) {
			fetchStudents(_.get(nextProps, "match.params.id"));			
		}
	}

	render() {
		const { classes, students, match, setPreview } = this.props;

		return (
			<div>
				<div className="classes-list">
					<ul>
						{classes.map((classe, index) =>
							<li key={index}>
								<Link
									to={{
										pathname: "/eleves/".concat(classe._id)
									}}
								>
									{`${classe.name}`}
								</Link>
							</li>
						)}
					</ul>
				</div>
				<div className="students-list">
					<ul>
						{_.filter(students, student => student.classeId === _.get(match, "params.id")).map((student, index) =>
							<li key={index}>
								{`${student.name} ${student.group >= 0 ? student.group : ""}`} 
							</li>
						)}
					</ul>
					{match.params.id &&
												<button
													onClick={e => {
														e.preventDefault();
														setPreview(match.params.id);
													}}
												>
													Modifier la classe
												</button>}
				</div>
			</div>
		);
	}
}

Classes.propTypes = {
	fetchClasses: PropTypes.func.isRequired,
	fetchStudents: PropTypes.func.isRequired,
	setPreview: PropTypes.func.isRequired,
	
	classes: PropTypes.arrayOf(PropTypes.object),
	students: PropTypes.arrayOf(PropTypes.object),
	match: PropTypes.object,
};

export default Classes;
