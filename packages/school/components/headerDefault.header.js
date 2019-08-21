import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { withRouter } from 'react-router-dom';

import { signOut } from '../../modules/account/account.actions';
import { getSelectedWeek } from '../../modules/calendar/calendar.selectors';

moment.locale('fr');

import { NavLink } from 'react-router-dom';

const HeaderLink = styled(NavLink)`
  font-size: 1rem;
  text-decoration: underline;
  font-weight: 400;
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  padding: 1rem 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
  @media (max-width: 700px) {
    font-size: 1rem;
  }
`;

const LogoutButton = styled.button`
  font-size: 0.875rem;
  font-weight: 700;
  @media (max-width: 700px) {
    position: inherit;
    span {
      display: none;
    }
  }
`;

const LogoutSvg = () => (
  <StyledLogoutSvg>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </StyledLogoutSvg>
);

const MenuSvg = () => (
  <StyledLogoutSvg>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </StyledLogoutSvg>

);

const MenuClose = () => (
  <StyledLogoutSvg>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
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

  @media (max-width: 700px) {
    position: absolute;
    top: 0;
    left: ${props => (props.menu ? '0' : '-70vw')};
    width: 70vw;
    height: 80vh;
    flex-direction: column;
    justify-content: flex-start;
    border: none;
    background-color: white;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: ${props => (props.menu ? '4px 8px 13px #9a9a9a' : 'none')};
    align-items: baseline;
    transition: ${props => (props.menu ? 'box-shadow 0.2s ease-in-out' : 'box-shadow 0.2s ease-in-out 0.8s')}, left 1s;

    a {
      height: 30px;
    }
  }

`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 700px) {
    justify-content: flex-end;
  }
`;

const MenuButton = styled.button`
  display: none;

  @media (max-width: 700px) {
    display: inherit;
  }
`;

const MenuButtonClose = styled.button`
  display: none;

  @media (max-width: 700px) {
    display: inherit;
    position: absolute;

    right: 20px;
    top: 20px;
  }
`;

class HeaderDefault extends Component {
  constructor(props) {
    super(props);

    this.state = { menu: false };
  }

  handleClickMenu = (event) => {
    event.preventDefault();

    this.setState({ menu: !this.state.menu });
  }

  render() {
    const { selectedWeek, signOutAction } = this.props;

    return (
      <HeaderContent>
        <HeaderWrapper>
          <MenuButton onClick={this.handleClickMenu}><MenuSvg /></MenuButton>
          <HeaderTitle>Planning de la MFR de chatte</HeaderTitle>
          <LogoutButton onClick={signOutAction}><span>Se déconnecter</span><LogoutSvg /></LogoutButton>
        </HeaderWrapper>
        <HeaderNav menu={this.state.menu}>
          <MenuButtonClose onClick={this.handleClickMenu}><MenuClose /></MenuButtonClose>
          <HeaderLink to="/home">
            Accueil
          </HeaderLink>
          <HeaderLink to="/classes">
            Classes
          </HeaderLink>
          <HeaderLink to="/calendrier">
            Calendrier
          </HeaderLink>
          <HeaderLink to="/taches">
            Taches
          </HeaderLink>
          <HeaderLink to="/home" style={{ textDecoration: 'none' }}>
            Semaine du {selectedWeek.format('LL')}
          </HeaderLink>
        </HeaderNav>
      </HeaderContent>
    );
  }
}

HeaderDefault.propTypes = {
  selectedWeek: PropTypes.object.isRequired,
  signOutAction: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  selectedWeek: getSelectedWeek(state),
});

const mapDispatchToProps = dispatch => ({
  signOutAction: () => dispatch(signOut()),
});


export const HeaderDefaultConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderDefault));
export { HeaderDefault };

