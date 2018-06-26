import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { HeaderLink, HeaderButton } from '@school/ui';

import { signOut } from '../../modules/account/account.actions';

import { getSelectedWeek } from '../../modules/calendar/calendar.selectors';

const HeaderNav = styled.nav`
  display: flex;
  justify-content: center;
  text-align: center;

  > * {
    padding: .5rem 1rem;
  }
`;

export const HeaderDefault = ({ currentWeek, signOutAction }) => (
  <header className="vh-15">
    <div className="cover bg-left bg-center-l">
      <div className="pb1-m">
        <HeaderNav>
          <HeaderLink to="/">
            Semaine du {currentWeek.format('LL')}
          </HeaderLink>
          <HeaderLink to="/">
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
          <HeaderButton onClick={signOutAction}>
            Se déconnecter
          </HeaderButton>
        </HeaderNav>
      </div>
    </div>
  </header>
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

