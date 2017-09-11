import React, { Component } from "react";
import PropTypes from "prop-types";

import { uuidv4 } from "../../../utils";
import { editClasseAction } from "../school.actions";

class ClasseInput extends Component {
	onChangeClassName(e) {
		const { _id } = this.props;

		console.log(e.currentTarget.value, _id);
		editClasseAction(_id, "name", e.currentTarget.value);
	}

	render() {
		const { name } = this.props;
        
		return (
			<form className="measure center br2-ns ba b--black-10" onSubmit={e => e.preventDefault()}>
				<fieldset className="cf bn ma0 pa0">
					<div className="cf">
						<input name="name" type="text" className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-100-m w-100-l br2-ns br--left-ns" defaultValue={name} onChange={this.onChangeClassName.bind(this)}/>
					</div>
				</fieldset>
			</form>
		);
	}
}

ClasseInput.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

ClasseInput.defaultProps = {
	_id: uuidv4(),
	name: "Nom de la classe",
};

export default ClasseInput;
