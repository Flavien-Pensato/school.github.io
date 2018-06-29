import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CalendarButton, CalendarLink } from '@school/ui';

import { createWeekAction } from '../calendar.actions';

const WrapperStyle = styled.div`
  display: flex;
  max-width: 48rem;
  width: 100%;
  margin: 20px auto;
  justify-content: space-evenly;
`;

class HeaderCalendar extends Component {
	onClickPrint = (e) => {
	  e.preventDefault();

	  window.print();
	}

	render() {
	  const {
	    week,
	  } = this.props;

	  console.log(week.format('WY'));
	  console.log(week.clone().startOf('week').add('weeks', 1).format('WY'));
	  console.log(week.clone().startOf('week').add('weeks', -1).format('WY'));

	  return (
  <WrapperStyle>
    <CalendarLink to={week.clone().startOf('week').add('weeks', -1).format('WY')}>Semaine precedente</CalendarLink>
    <CalendarButton onClick={() => createWeekAction(week)}>Création de la semaine</CalendarButton>
    <CalendarLink to={week.clone().startOf('week').add('weeks', 1).format('WY')}>Semaine suivante</CalendarLink>
    <CalendarButton onClick={this.onClickPrint}>Imprimer</CalendarButton>
  </WrapperStyle>
	  );
	}
}

HeaderCalendar.defaultProps = {
  week: {},
};

HeaderCalendar.propTypes = {
  week: PropTypes.object,
};

export default HeaderCalendar;
