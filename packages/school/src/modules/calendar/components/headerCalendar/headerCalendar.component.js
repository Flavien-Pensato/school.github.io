import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CalendarButton, CalendarLink } from '@school/ui';

const WrapperStyle = styled.div`
  display: flex;
  max-width: 48rem;
  width: 100%;
  margin: 20px auto;
  justify-content: space-between;

  @media (max-width: 700px) {
    justify-content: space-evenly;
  }
`;

const SvgLogo = styled.svg`
  display: none;

  @media (max-width: 700px) {
    display: inline;
    right: 20px;
    top: 20px;
    height: 24px;
    width: 24px;
  }
`;

const Item = styled.div`
  width: auto;

  @media (max-width: 700px) {
    border: 1px solid black;
    border-radius: 100%;
    width: 46px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Refresh = () => (
  <SvgLogo>
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgLogo>
);

const Previous = () => (
  <SvgLogo>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgLogo>
);

const Next = () => (
  <SvgLogo>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgLogo>
);

const Print = () => (
  <SvgLogo>
    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgLogo>
);

class HeaderCalendar extends Component {
	onClickPrint = (e) => {
	  e.preventDefault();

	  window.print();
	}

	render() {
	  const {
	    week,
	  } = this.props;

	  return (
  <WrapperStyle>
    <Item>
      <CalendarLink to={`/home/${week.clone().startOf('week').add(-1, 'weeks').format('WY')}`}>
        <span>Semaine precedente</span>
        <Previous />
      </CalendarLink>
    </Item>
    <Item>
      <CalendarButton onClick={() => this.props.addWeek(week.clone().startOf('week').format('YYYY.MM.DD'))}>
        <span>Création de la semaine</span>
        <Refresh />
      </CalendarButton>
    </Item>
    <Item>
      <CalendarLink to={`/home/${week.clone().startOf('week').add(1, 'weeks').format('WY')}`}>
        <span>Semaine suivante</span>
        <Next />
      </CalendarLink>
    </Item>
    <Item>
      <CalendarButton onClick={this.onClickPrint}><span>Imprimer</span><Print /></CalendarButton>
    </Item>
  </WrapperStyle>
	  );
	}
}

HeaderCalendar.defaultProps = {
  week: {},
};

HeaderCalendar.propTypes = {
  week: PropTypes.object,
  addWeek: PropTypes.func.isRequired,
};

export default HeaderCalendar;
