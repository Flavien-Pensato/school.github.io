import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { HeaderLink, LogoutButton, HeaderTitle } from '@school/ui';

import { signOut } from '../../modules/account/account.actions';

import { getSelectedWeek } from '../../modules/calendar/calendar.selectors';

const LogoutSvg = () => (
  <StyledLogoutSvg>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </StyledLogoutSvg>
);

const StyledLogoutSvg = styled.svg`
  width: 24px;
  height: 24px;

  display: none;

  @media (max-width: 700px) {
    display: inherit;
  }
`;

const HeaderContent = styled.header`
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const HeaderNav = styled.nav`
  margin: 0 auto;
  width: 100%;
  max-width: 48rem;
  height: 46px;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  align-items: center;
  border-top: solid 1px black;
  border-bottom: solid 1px black;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 700px) {
    justify-content: flex-end;
  }
`;

export const HeaderDefault = ({ currentWeek, signOutAction }) => (
  <HeaderContent>
    <HeaderWrapper>
      <HeaderTitle>Planning de la MFR de chatte</HeaderTitle>
      <LogoutButton onClick={signOutAction}><span>Se déconnecter</span><LogoutSvg /></LogoutButton>
    </HeaderWrapper>
    <HeaderNav>
      <HeaderLink to="/home">
            Accueil
      </HeaderLink>
      <HeaderLink to="/eleves">
            Élèves
      </HeaderLink>
      <HeaderLink to="/calendrier">
            Calendrier
      </HeaderLink>
      <HeaderLink to="/taches">
            Taches
      </HeaderLink>
      <HeaderLink to="/home" style={{ textDecoration: 'none' }}>
            Semaine du {currentWeek.format('LL')}
      </HeaderLink>
    </HeaderNav>
  </HeaderContent>
);


HeaderDefault.defaultProps = {
  currentWeek: new Date(),
};

HeaderDefault.propTypes = {
  currentWeek: PropTypes.object,
  signOutAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentWeek: getSelectedWeek(state),
});

const mapDispatchToProps = dispatch => ({
  signOutAction: () => dispatch(signOut()),
});


export const HeaderDefaultConnected = connect(mapStateToProps, mapDispatchToProps)(HeaderDefault);

