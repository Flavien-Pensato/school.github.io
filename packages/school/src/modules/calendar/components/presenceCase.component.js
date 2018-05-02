import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { uuidv4 } from '../../../utils';
import { addDateAction, removeDateAction } from '../calendar.actions';

class PresenceCase extends Component {
	onClickTogglePresence = (e) => {
	  e.preventDefault();

	  const { date, week, classeId } = this.props;

	  if (!date) {
	    addDateAction({
	      _id: uuidv4(),
	      week,
	      classeId,
	    });
	  } else {
	    removeDateAction(date._id);
	  }
	}

	render() {
	  const { date } = this.props;

	  return (
  <td className="pv3 pr3 bb b--black-20">
    <a href="#0" onClick={this.onClickTogglePresence} className={`f5 no-underline ${date ? 'green' : 'black'} bg-animate hover-bg-black hover-white inline-flex items-center pa3 center`}>
      <span className="pl1">{date ? 'Présent' : 'Absent'}</span>
    </a>
  </td>
	  );
	}
}

PresenceCase.defaultProps = {
  date: {},
};

PresenceCase.propTypes = {
  week: PropTypes.string.isRequired,
  classeId: PropTypes.string.isRequired,
  date: PropTypes.object,
};

export default PresenceCase;
