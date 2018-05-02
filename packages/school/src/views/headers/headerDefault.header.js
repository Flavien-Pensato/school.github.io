import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '../../modules/account/account.actions';

import { getSelectedWeek } from '../../modules/calendar/calendar.selectors';

export const HeaderDefault = ({ currentWeek, signOutAction }) => (
  <header className="vh-15">
    <div className="cover bg-left bg-center-l">
      <div className="pb1-m">
        <nav className="dt w-100 mw8 center">
          <div className="dtc v-mid tr pa3 fl">
						Semaine du {currentWeek.format('LL')}
          </div>
          <div className="dtc v-mid tr pa3 pv2 ph3">
            <NavLink to="/" className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
							Accueil
            </NavLink>
            <NavLink to="/eleves" className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
						Élèves
            </NavLink>
            <NavLink to="/calendrier" className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
						Calendrier
            </NavLink>
            <NavLink to="/taches" className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
						Taches
            </NavLink>
            <button className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" onClick={signOutAction}>
						Se déconnecter
            </button>
          </div>
        </nav>
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

