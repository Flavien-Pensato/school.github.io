import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import classname from "classname";

import "./toaster.style.css";

class Toaster extends Component {
	render() {
		const { toaster } = this.props;

		return (
			<div
				className={classname("toaster", {
					"toaster--show": !_.isEmpty(toaster)
				})}
			>
				<span>
					{toaster.message}
				</span>
			</div>
		);
	}
}

Toaster.propTypes = {
	toaster: PropTypes.object.isRequired
};

export default Toaster;
