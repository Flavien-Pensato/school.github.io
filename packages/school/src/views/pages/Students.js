import React, { Component } from "react";

import Importation from "../../modules/school/components/importation.connector";
import Classes from "../../modules/school/components/classes.connector";

class Students extends Component {
	render() {
		return (
			<div className="pa3 pa5-ns">
				<Importation />
				<Classes />
			</div>
		);
	}
}

export default Students;
