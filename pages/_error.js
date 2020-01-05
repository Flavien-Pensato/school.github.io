import React from 'react';
import PropTypes from 'prop-types';

import A from '../elements/A';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    if (res) {
      return {
        statusCode: res.statusCode,
      };
    }

    if (err) {
      return {
        statusCode: err.statusCode,
      };
    }

    return { statusCode: null };
  }

  render() {
    return (
      <p>
        {this.props.statusCode ? `An error ${this.props.statusCode} occurred on server` : 'An error occurred on client'}

        <A href="/home">Accueil</A>
      </p>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
};

export default Error;
