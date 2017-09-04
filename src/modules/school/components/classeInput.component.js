import React, { Component } from "react";
import PropTypes from "prop-types";

import { uuidv4 } from "../../../utils";

class ClasseInput extends Component {
	render() {
		const { name, _id, editClasse } = this.props;
        
		return <div>
			<input
				type="text"
				placeholder="Nom de la classe"
				value={name}
				onChange={e => {
					e.preventDefault();

					editClasse({
						_id,
						name: e.currentTarget.value
					});
				}}
				name="name"
				required
			/>
		</div>;
	}
}

ClasseInput.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	
	editClasse: PropTypes.func.isRequired,
};

ClasseInput.defaultProps = {
	_id: uuidv4(),
	name: "Nom de la classe",
};

export default ClasseInput;
