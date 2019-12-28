import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { DisplayContext } from '../../modules/display/display.context';
import { A, H1, Div, Header, Span, Button, Nav, I } from '../../elements';

const LinkNav = styled(A)`
  padding: 20px 15px;
  font-weight: bold;

  color: ${({ isExact }) => (isExact ? '#F58C18' : 'black')};
`;

const Menu = () => {
  const { pathname } = useRouter();
  const [position, setPosition] = useState({ top: 0, left: '-100vw', right: '100vw', bottom: 0 });

  const toggleMenu = useCallback(() => {
    if (position.left === 0) {
      setPosition({ top: 0, left: '-100vw', right: '100vw', bottom: 0 });
    } else {
      setPosition({ top: 0, left: 0, right: '100px', bottom: 0 });
    }
  }, [position]);

  return (
    <Header width={['100%', 'auto']}>
      <H1 fontSize={['27px', '32px']} textAlign={['left', 'center']}>
        MFR Chatte
        <br />
        <DisplayContext.Consumer>
          {({ date }) => (
            <Span fontSize="15px" fontWeight="normal">
              {date.format('DD/MM/YYYY')}&nbsp;au&nbsp;
              {date
                .clone()
                .add('days', 4)
                .format('DD/MM/YYYY')}
            </Span>
          )}
        </DisplayContext.Consumer>
      </H1>
      <Button
        zIndex={10}
        display={['initial', 'none']}
        position="absolute"
        top="20px"
        right="20px"
        onClick={toggleMenu}
        border="none"
        background="none"
      >
        <I className="fas fa-bars" fontSize="40px" />
      </Button>

      <Div
        style={{ transition: 'all 1s' }}
        width={['100%', 'auto']}
        position={['absolute', 'initial']}
        {...position}
        backgroundColor={['near-white', 'inherit']}
      >
        <Nav display="flex" flexDirection={['column', 'row']}>
          <Link href="/home">
            <LinkNav href="/home" isExact={pathname === '/home'}>
              Accueil
            </LinkNav>
          </Link>
          <Link href="/classes">
            <LinkNav href="/classes" isExact={pathname === '/classes'}>
              Classes
            </LinkNav>
          </Link>
          <Link href="/calendrier">
            <LinkNav href="/calendrier" isExact={pathname === '/calendrier'}>
              Calendrier
            </LinkNav>
          </Link>
          <Link href="/taches">
            <LinkNav href="/taches" isExact={pathname === '/taches'}>
              Tâches
            </LinkNav>
          </Link>
          <Link href="/logout">
            <LinkNav>Se déconnecter</LinkNav>
          </Link>
        </Nav>
      </Div>
    </Header>
  );
};

export default Menu;
