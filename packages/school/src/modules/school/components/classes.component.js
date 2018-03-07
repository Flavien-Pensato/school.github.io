import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { removeClasseAction } from "../school.actions";

class Classes extends Component {
	render() {
		const { classes, setPreview } = this.props;

		return (
			<div>
				<ul className="list pl0 measure center">
					{_.map(_.orderBy(
						classes,
						[classe => classe.name.toLowerCase()], ["asyn"]), (classe, index) => <li className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30" key={index}>
						{classe.name}
						<button 
							className="bn fr f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-red" 
							onClick={e => {
								e.preventDefault();

								removeClasseAction(classe._id);
							}}>
							Supprimer
						</button>
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
	setPreview: PropTypes.func.isRequired,
	
	classes: PropTypes.arrayOf(PropTypes.object),
	match: PropTypes.object,
};

export default Classes;
