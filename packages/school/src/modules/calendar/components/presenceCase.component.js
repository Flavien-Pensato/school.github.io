import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Item = styled.div`
  height: 50px;
`;

class PresenceCase extends Component {
	onClickTogglePresence = (e) => {
	  e.preventDefault();

	  const {
	    presence, date, classeId, editDate,
	  } = this.props;

	  if (!presence) {
	    editDate({
	      ...date,
	      classes: [...date.classes, classeId],
	    });
	  } else {
	    editDate({
	      ...date,
	      classes: date.classes.filter(item => item !== classeId),
	    });
	  }
	}

	render() {
	  const { presence } = this.props;

	  return (
  <Item className="pa3 bb b--black-20">
    <a href="#0" onClick={this.onClickTogglePresence} className={`f5 no-underline ${presence ? 'green' : 'black'} bg-animate hover-bg-black hover-white items-center center`}>
      <span className="pl1">{presence ? 'Présent' : 'Absent'}</span>
    </a>
  </Item>
	  );
	}
}

PresenceCase.propTypes = {
  classeId: PropTypes.string.isRequired,
  presence: PropTypes.bool.isRequired,
  date: PropTypes.object.isRequired,
  editDate: PropTypes.func.isRequired,
};

export default PresenceCase;
