import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { Box } from 'theme-ui';

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
      <Box display="flex" alignItems="center" height="100vh" padding="20px">
        <div>
          {this.props.statusCode
            ? `Une Erreur ${this.props.statusCode} est apparue sur le server.`
            : 'Une Error est apparue.'}
          <p>
            <br />
            <br />
            Retour sur&nbsp;
            <Link href="/">l&apos;Accueil</Link>
          </p>
        </div>
      </Box>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Error);
