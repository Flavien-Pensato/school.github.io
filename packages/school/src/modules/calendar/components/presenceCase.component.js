import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  <td className="pv3 pr3 bb b--black-20">
    <a href="#0" onClick={this.onClickTogglePresence} className={`f5 no-underline ${presence ? 'green' : 'black'} bg-animate hover-bg-black hover-white inline-flex items-center pa3 center`}>
      <span className="pl1">{presence ? 'Présent' : 'Absent'}</span>
    </a>
  </td>
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
