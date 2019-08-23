import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class StudentsImport extends Component {
  submitFile = event => {
    event.preventDefault();

    const {
      importFile,
      match: {
        params: { classeId },
      },
    } = this.props;

    if (event.target.file.files.length) {
      const file = event.target.file.files[0];
      const fileReader = new FileReader();

      fileReader.onload = e => {
        const bytes = new Uint8Array(e.target.result);
        const length = bytes.byteLength;

        let binary = '';

        // eslint-disable-next-line
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }

        importFile(binary, classeId);
      };
      fileReader.readAsArrayBuffer(file);
    }
  };

  render() {
    return (
      <form className="measure center br2-ns ba b--black-10" onSubmit={this.submitFile}>
        <fieldset className="cf bn ma0 pa0">
          <div className="cf">
            <input
              name="file"
              type="file"
              className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-60-l br2-ns br--left-ns"
            />
            <input
              className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-30-l br2-ns br--right-ns"
              type="submit"
              value="Importer un fichier"
            />
          </div>
        </fieldset>
      </form>
    );
  }
}

StudentsImport.propTypes = {
  importFile: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
};
