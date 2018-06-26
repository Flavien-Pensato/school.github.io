import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createWeekAction } from '../calendar.actions';

class HeaderCalendar extends Component {
	onClickPrint = (e) => {
	  e.preventDefault();

	  window.print();
	}

	render() {
	  const {
	    currentWeek, goNextWeek, goPreviousWeek,
	  } = this.props;

	  return (
  <div>
    <div className="flex items-center justify-between w-100 mv3">
      <a href="#0" onClick={goPreviousWeek} className="f5 no-underline black bg-animate bg-dark-blue inline-flex items-center pa2 ba border-box mr4">
        <span className="pl1">Semaine precedente</span>
      </a>
      <a href="#0" onClick={() => createWeekAction(currentWeek)} className="f5 no-underline black bg-animate white bg-dark-blue inline-flex items-center pa2 ba border-box">
        <span className="pr1">Création de la semaine</span>
      </a>
      <a href="#0" onClick={goNextWeek} className="f5 no-underline black bg-animate bg-dark-blue inline-flex items-center pa2 ba border-box">
        <span className="pr1">Semaine suivante</span>
      </a>
      <a href="#0" onClick={this.onClickPrint} className="f5 no-underline black bg-animate bg-dark-blue inline-flex items-center pa2 ba border-box">
        <span className="pr1">Imprimer</span>
      </a>
    </div>
  </div>
	  );
	}
}

HeaderCalendar.defaultProps = {
  currentWeek: {},
};

HeaderCalendar.propTypes = {
  currentWeek: PropTypes.object,

  goNextWeek: PropTypes.func.isRequired,
  goPreviousWeek: PropTypes.func.isRequired,
};

export default HeaderCalendar;
