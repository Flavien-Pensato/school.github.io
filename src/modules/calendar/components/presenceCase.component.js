import React, { Component } from "react";
import PropTypes from "prop-types";

import { uuidv4 } from "../../../utils";

class PresenceCase extends Component {
	onClickTogglePresence(e) {
		e.preventDefault();
    
		const { addDate, date, removeDate, week, classeId } = this.props;
    
		if (!date) {
			addDate({
				_id: uuidv4(),
				week,
				classeId
			});  
		} else {
			removeDate(date);        
		}
    
	}

	render() {    
		const { date } = this.props;
    
		return <td onClick={this.onClickTogglePresence.bind(this)}>{date ? "true": "false"}</td>;
	}
}

PresenceCase.propTypes = {
	removeDate: PropTypes.func.isRequired,
	addDate: PropTypes.func.isRequired,
	week: PropTypes.string.isRequired,
	classeId: PropTypes.string.isRequired,
	date: PropTypes.object,
};

export default PresenceCase;
