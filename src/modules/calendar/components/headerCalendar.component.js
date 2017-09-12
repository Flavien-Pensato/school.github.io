import React, { Component } from "react";
import PropTypes from "prop-types";

import { createWeekAction } from "../calendar.actions";

class HeaderCalendar extends Component {
	render() {    
		const { goNextWeek, goPreviousWeek, classes, tasks, dates } = this.props;
    
		return (
			<div>
				<button onClick={createWeekAction.bind(this, "37/2017", classes, tasks, dates)}>Generate</button>
				<button onClick={goPreviousWeek.bind(this)}>Previous</button>
				<button onClick={goNextWeek.bind(this)}>Next</button>
			</div>
		);
	}
}

HeaderCalendar.propTypes = {
	classes: PropTypes.array,
	tasks: PropTypes.array,
	dates: PropTypes.array,
	
	goNextWeek: PropTypes.func.isRequired,
	goPreviousWeek: PropTypes.func.isRequired,
};

export default HeaderCalendar;
