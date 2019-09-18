import React, { Component } from 'react';
import moment from 'moment';
import { Nav, Container } from 'react-bootstrap';
import styled from '@emotion/styled';
import Link from 'next/link';

import firebase from '../config/firebase';

import { DisplayContext } from '../modules/display/display.context';

moment.locale('fr');

const NavStyled = styled(Nav)`
  border-top: solid 1px black;
  border-bottom: solid 1px black;
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

const StyledLogoutSvg = styled.svg`
  width: 24px;
  height: 24px;

  display: none;

  @media (max-width: 700px) {
    display: inherit;
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

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { menu: false };
  }

  handleClickMenu = event => {
    event.preventDefault();

    this.setState({ menu: !this.state.menu });
  };

  handleSignout = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <Container>
        <HeaderWrapper>
          <HeaderTitle>Planning de la MFR de chatte</HeaderTitle>
          <LogoutButton onClick={this.handleSignout}>
            <span>Se déconnecter</span>
            <LogoutSvg />
          </LogoutButton>
        </HeaderWrapper>
        <NavStyled>
          <Link href="/">
            <Nav.Link href="/">Accueil</Nav.Link>
          </Link>
          <Link href="/classes">
            <Nav.Link href="/classes">Classes</Nav.Link>
          </Link>
          <Link href="/calendrier">
            <Nav.Link href="/calendrier">Calendrier</Nav.Link>
          </Link>
          <Link href="/taches">
            <Nav.Link href="/taches">Taches</Nav.Link>
          </Link>
          <Link href="/">
            <Nav.Link href="/">
              <DisplayContext.Consumer>
                {({ date }) => (
                  <span>
                    Semaine du&nbsp;
                    {date.format('LL')}
                  </span>
                )}
              </DisplayContext.Consumer>
            </Nav.Link>
          </Link>
        </NavStyled>
      </Container>
    );
  }
}

export default Header;
