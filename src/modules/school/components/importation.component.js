import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

class Importation extends Component {
	submitFile(event) {
		event.preventDefault();

		const { importFile } = this.props;

		if (event.target.file.files.length) {
			const file = event.target.file.files[0];
			const fileReader = new FileReader();

			fileReader.onload = function(e) {
				const bytes = new Uint8Array(e.target.result);
				const length = bytes.byteLength;

				let binary = "";

				for (let i = 0; i < length; i++) {
					binary += String.fromCharCode(bytes[i]);
				}

				importFile(binary);
			};
			fileReader.readAsArrayBuffer(file);
		}
	}
	render() {
		const { preview } = this.props;

		if (preview) {
			return <Redirect to="/preview" />;
		}

		return (
			<div>
				<form onSubmit={this.submitFile.bind(this)}>
					<input type="file" name="file" />
					<input type="submit" value="importer" />
				</form>
			</div>
		);
	}
}

Importation.propTypes = {
	importFile: PropTypes.func.isRequired,
	preview: PropTypes.string,
};

export default Importation;
