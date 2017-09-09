import React, { Component } from "react";
import PropTypes from "prop-types";

class HeaderCalendar extends Component {
	render() {    
		const { goNextWeek, goPreviousWeek } = this.props;
    
		return (
			<div>
				<button onClick={goPreviousWeek.bind(this)}>Previsou</button>
				<button onClick={goNextWeek.bind(this)}>Next</button>
			</div>
		);
	}
}

HeaderCalendar.propTypes = {
	goNextWeek: PropTypes.func.isRequired,
	goPreviousWeek: PropTypes.func.isRequired,
};

export default HeaderCalendar;
