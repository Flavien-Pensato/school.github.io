import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Classes extends Component {
	componentWillMount() {
		const { fetchClasses } = this.props;

		fetchClasses();
	}

	render() {
		const { classes, setPreview } = this.props;

		return (
			<div>
				<ul className="list pl0 measure center">
					{_.map(classes, (classe, index) => <li className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30" key={index}>
						{classe.name}
						<button 
							className="bn fr f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-light-purple" 
							onClick={e => {
								e.preventDefault();
								setPreview(classe._id);
							}}>
							Modifier la classe
						</button>
					</li>)}
				</ul>
			</div>
		);
	}
}

Classes.propTypes = {
	fetchClasses: PropTypes.func.isRequired,
	setPreview: PropTypes.func.isRequired,
	
	classes: PropTypes.arrayOf(PropTypes.object),
	match: PropTypes.object,
};

export default Classes;
