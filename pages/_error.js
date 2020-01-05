import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { A, Div } from '../elements/';

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
    if (this.props.statusCode === 404) {
      Router.push({
        pathname: '/home',
      });

      return null;
    }

    return (
      <Div display="flex" alignItems="center" height="100vh" padding="20px">
        <div>
          {this.props.statusCode
            ? `Une Erreur ${this.props.statusCode} est apparue sur le server.`
            : 'Une Error est apparue.'}
          <p>
            <br />
            <br />
            Retour sur&nbsp;
            <A href="/home">l&apos;Accueil</A>
          </p>
        </div>
      </Div>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
};

export default Error;
