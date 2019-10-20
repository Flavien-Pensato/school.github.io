import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Item = styled.div`
  height: 50px;
`;

class PresenceCase extends Component {
  onClickTogglePresence = event => {
    event.preventDefault();

    const { toggleClasse, classeId } = this.props;

    toggleClasse(classeId);
  };

  render() {
    const { presence } = this.props;

    return (
      <Item
        onClick={this.onClickTogglePresence}
        className={`pa3 bb b--black-20 f5 no-underline  bg-animate  hover-bg-black hover-white items-center center ${
          presence ? 'green' : 'black'
        }`}
      >
        <span className="f5 no-underline bg-animate ">{presence ? 'Présent' : 'Absent'}</span>
      </Item>
    );
  }
}

PresenceCase.propTypes = {
  classeId: PropTypes.string.isRequired,
  presence: PropTypes.bool.isRequired,
  toggleClasse: PropTypes.func.isRequired,
};

export default PresenceCase;
