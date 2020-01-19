import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Span } from '../elements';

class PresenceCase extends Component {
  onClickTogglePresence = event => {
    event.preventDefault();

    const { toggleClasse, classeId } = this.props;

    toggleClasse(classeId);
  };

  render() {
    const { presence } = this.props;

    return (
      <Span onClick={this.onClickTogglePresence} color={presence ? 'green' : 'black'}>
        {presence ? 'Présent' : 'Absent'}
      </Span>
    );
  }
}

PresenceCase.propTypes = {
  classeId: PropTypes.string.isRequired,
  presence: PropTypes.bool.isRequired,
  toggleClasse: PropTypes.func.isRequired,
};

export default PresenceCase;
