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
			<form className="measure center br2-ns ba b--black-10" onSubmit={this.submitFile.bind(this)}>
				<fieldset className="cf bn ma0 pa0">
					<div className="cf">
						<input name="file" type="file" className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-60-l br2-ns br--left-ns" />
						<input className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-30-l br2-ns br--right-ns" type="submit" value="Importer un fichier"/>
					</div>
				</fieldset>
			</form>
		);
	}
}

Importation.propTypes = {
	importFile: PropTypes.func.isRequired,
	preview: PropTypes.string,
};

export default Importation;