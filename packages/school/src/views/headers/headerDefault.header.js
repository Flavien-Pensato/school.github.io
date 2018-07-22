import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { HeaderLink, LogoutButton, HeaderTitle } from '@school/ui';

import { signOut } from '../../modules/account/account.actions';

import { getSelectedWeek } from '../../modules/calendar/calendar.selectors';

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
`;

export const HeaderDefault = ({ currentWeek, signOutAction }) => (
  <HeaderContent>
    <HeaderWrapper>
      <HeaderTitle>Planning de la MFR de chatte</HeaderTitle>
      <LogoutButton onClick={signOutAction} />
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

