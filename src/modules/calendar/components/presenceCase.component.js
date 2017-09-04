import React, { Component } from "react";
import PropTypes from "prop-types";

import { uuidv4 } from "../../../utils";

class PresenceCase extends Component {
	onClickTogglePresence(e) {
		e.preventDefault();
    
		const { addDate, toggle, removeDate, week, classeId } = this.props;
    
		if (!toggle) {
			addDate({
				_id: uuidv4(),
				week,
				classeId
			});  
		} else {
			removeDate({
				_id: uuidv4(),
				week,
				classeId
			});        
		}
    
	}

	render() {    
		const { toggle } = this.props;
    
		return <td onClick={this.onClickTogglePresence.bind(this)}>{toggle.toString()}</td>;
	}
}

PresenceCase.propTypes = {
	removeDate: PropTypes.func.isRequired,
	addDate: PropTypes.func.isRequired,
	week: PropTypes.string.isRequired,
	classeId: PropTypes.string.isRequired,
	toggle: PropTypes.bool.isRequired,
};

export default PresenceCase;
