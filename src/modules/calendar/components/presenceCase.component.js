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
    
		return <td className="pv3 pr3 bb b--black-20">
			<a href="#0" onClick={this.onClickTogglePresence.bind(this)} className={`f5 no-underline ${date ? "green": "black"} bg-animate hover-bg-black hover-white inline-flex items-center pa3 center`}>
				<span className="pl1">{date ? "Présent": "Absent"}</span>
			</a>
		</td>;
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
