import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Box } from 'theme-ui';

class PresenceCase extends Component {
  onClickTogglePresence = (event) => {
    event.preventDefault();

    const { toggleClasse, classeId } = this.props;

    toggleClasse(classeId);
  };

  render() {
    const { presence } = this.props;

    return (
      <Box onClick={this.onClickTogglePresence} color={presence ? 'white' : 'black'}>
        {presence ? 'Présent' : 'Absent'}
      </Box>
    );
  }
}

PresenceCase.propTypes = {
  classeId: PropTypes.string.isRequired,
  presence: PropTypes.bool.isRequired,
  toggleClasse: PropTypes.func.isRequired,
};

export default PresenceCase;
