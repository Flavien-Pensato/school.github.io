import React, { Component } from "react";

import HeaderCalendar from "../../modules/calendar/components/headerCalendar.connector";
import BodyCalendar from "../../modules/calendar/components/bodyCalendar.connector";

class Home extends Component {
	render() {
		return (
			<div className="w-100 mw8 center">
				<HeaderCalendar/>
				<BodyCalendar/>
			</div>
		);
	}
}

export default Home;
